'use client';

import { useState } from 'react';
import { Bookmark, Share2, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { ContentCard } from '@/types';
import { formatDate } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function TodayCard() {
  const [isSaved, setIsSaved] = useState(false);
  const today = formatDate(new Date(), 'short').replace(/\//g, '-');

  const { data: card, isLoading } = useQuery({
    queryKey: ['todayCard', today],
    queryFn: async () => {
      // Demo mode: return static content
      // When Firebase is ready, use:
      // const docRef = doc(db, 'daily_content', today);
      // const docSnap = await getDoc(docRef);
      
      // Fallback card for demo
      return {
        id: 'demo-card',
        type: 'interpersonal',
        title: '先輩が忙しい時の上手な声かけ',
        body: '忙しそうな先輩に質問したい時、タイミングと言葉選びが大切です。',
        keyPoints: [
          '「今よろしいですか？」ではなく「30秒だけ相談したいです」',
          '要点を整理してから声をかける',
          '後で時間をもらう提案も用意しておく'
        ],
        actionItem: '今日、質問を30秒で伝える練習をしてみましょう',
        links: [
          {
            title: 'コミュニケーション研修資料',
            url: '#',
            source: '日本歯科衛生士会'
          }
        ],
        imageUrl: '/api/og?title=' + encodeURIComponent('30秒だけ相談したいです'),
        segment: ['new', 'junior'],
        saveCount: 245,
        shareCount: 89,
        createdAt: new Date(),
        publishedAt: new Date()
      } as ContentCard;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Save to Firestore when backend is ready
  };

  const handleShare = async () => {
    if (navigator.share && card) {
      try {
        await navigator.share({
          title: card.title,
          text: card.keyPoints[0],
          url: window.location.href,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <LoadingSpinner />
      </div>
    );
  }

  if (!card) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mx-4">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {card.type === 'salary' && '給与'}
            {card.type === 'tax' && '税金'}
            {card.type === 'interpersonal' && '対人'}
            {card.type === 'career' && 'キャリア'}
          </span>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Bookmark className="w-3 h-3" />
            <span>{card.saveCount}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4">{card.body}</p>

        {/* Key Points */}
        <div className="space-y-2 mb-4">
          {card.keyPoints.map((point, index) => (
            <div key={index} className="flex items-start">
              <span className="text-primary mr-2 mt-0.5">✓</span>
              <span className="text-sm text-gray-700">{point}</span>
            </div>
          ))}
        </div>

        {/* Action Item */}
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <p className="text-sm font-medium text-blue-900">今日の実践</p>
          <p className="text-sm text-blue-700 mt-1">{card.actionItem}</p>
        </div>

        {/* External Links */}
        {card.links.length > 0 && (
          <div className="border-t pt-3">
            <p className="text-xs text-gray-500 mb-2">参考資料</p>
            {card.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-800 py-1"
              >
                <span>{link.title}</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="border-t px-4 py-3 flex items-center justify-between">
        <button
          onClick={handleSave}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isSaved
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
          <span className="text-sm font-medium">
            {isSaved ? '保存済み' : '保存する'}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">共有</span>
        </button>
      </div>
    </div>
  );
}