'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Arareru } from '@/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Link from 'next/link';

interface ArareruItemProps {
  arareru: Arareru;
  onReaction: (type: 'wakaru' | 'warau' | 'yakudachi') => void;
}

function ArareruItem({ arareru, onReaction }: ArareruItemProps) {
  const [userReaction, setUserReaction] = useState<string | null>(null);

  const handleReaction = (type: 'wakaru' | 'warau' | 'yakudachi') => {
    setUserReaction(type);
    onReaction(type);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '歯科衛生士あるある',
          text: arareru.content,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Content */}
      <p className="text-gray-900 mb-3 whitespace-pre-wrap">{arareru.content}</p>

      {/* Reactions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleReaction('wakaru')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm transition-all ${
              userReaction === 'wakaru'
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <span>わかる</span>
            <span className="text-xs">{arareru.reactions.wakaru}</span>
          </button>

          <button
            onClick={() => handleReaction('warau')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm transition-all ${
              userReaction === 'warau'
                ? 'bg-yellow-100 text-yellow-700'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <span>😂</span>
            <span className="text-xs">{arareru.reactions.warau}</span>
          </button>

          <button
            onClick={() => handleReaction('yakudachi')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm transition-all ${
              userReaction === 'yakudachi'
                ? 'bg-green-100 text-green-700'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <span>役立つ</span>
            <span className="text-xs">{arareru.reactions.yakudachi}</span>
          </button>
        </div>

        <button
          onClick={handleShare}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Share2 className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Related Practical Card Preview */}
      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs font-medium text-blue-900 mb-1">
          💡 1分で役立つ関連カード
        </p>
        <p className="text-sm text-blue-700">
          「患者さん対応の基本フレーズ集」
        </p>
        <Link
          href="/cards/related"
          className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 mt-1"
        >
          1分で学ぶ →
        </Link>
      </div>
    </div>
  );
}

export function ArareruFeed() {
  const { data: arareruList, isLoading } = useQuery({
    queryKey: ['arareruFeed'],
    queryFn: async () => {
      // Demo data
      return [
        {
          id: 'arareru-1',
          content: '終了30分前に急患が来る日ほど、なぜか器具の片付けが完璧に終わってる',
          authorId: 'anonymous',
          isAnonymous: true,
          reactions: {
            wakaru: 156,
            warau: 89,
            yakudachi: 23
          },
          shareCount: 45,
          createdAt: new Date(),
          moderationState: 'approved' as const
        },
        {
          id: 'arareru-2',
          content: '患者さんに「どっちでもいいです」と言われると、実は一番困る。\nどっちか選んでほしい...',
          authorId: 'anonymous',
          isAnonymous: true,
          reactions: {
            wakaru: 234,
            warau: 67,
            yakudachi: 45
          },
          shareCount: 32,
          createdAt: new Date(),
          moderationState: 'approved' as const
        },
        {
          id: 'arareru-3',
          content: 'スケーラーのチップ交換のタイミング、いつも「まだ使える」と「そろそろかな」の間で悩む',
          authorId: 'anonymous',
          isAnonymous: true,
          reactions: {
            wakaru: 198,
            warau: 12,
            yakudachi: 78
          },
          shareCount: 28,
          createdAt: new Date(),
          moderationState: 'approved' as const
        }
      ] as Arareru[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleReaction = (arareruId: string, type: 'wakaru' | 'warau' | 'yakudachi') => {
    // Save reaction to Firestore when backend is ready
    console.log('Reaction:', arareruId, type);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <LoadingSpinner />
      </div>
    );
  }

  if (!arareruList || arareruList.length === 0) return null;

  return (
    <div className="space-y-4 px-4">
      {arareruList.map((arareru) => (
        <ArareruItem
          key={arareru.id}
          arareru={arareru}
          onReaction={(type) => handleReaction(arareru.id, type)}
        />
      ))}

      {/* Post New Arareru */}
      <Link
        href="/arareru/new"
        className="block w-full text-center py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
      >
        あるあるを投稿する
      </Link>
    </div>
  );
}