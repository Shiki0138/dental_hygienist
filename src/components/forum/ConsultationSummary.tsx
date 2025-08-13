'use client';

import { MessageSquare } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Link from 'next/link';

interface ThreadSummary {
  id: string;
  title: string;
  keyPoints: string[];
  advice: string[];
  answerCount: number;
  tags: string[];
}

export function ConsultationSummary() {
  const { data: summaries, isLoading } = useQuery({
    queryKey: ['consultationSummary', new Date().toDateString()],
    queryFn: async () => {
      // Demo data for now
      return [
        {
          id: 'thread-1',
          title: '新人なのに先輩から指導を任されて困っています',
          keyPoints: [
            '経験1年目で後輩指導を任された',
            '自分もまだ不安な中での指導',
            '先輩との関係性も考慮が必要'
          ],
          advice: [
            '先輩に相談しながら一緒に指導する提案',
            '基本的なことから少しずつ教える'
          ],
          answerCount: 12,
          tags: ['新人', '指導', '人間関係']
        },
        {
          id: 'thread-2',
          title: '残業代が正しく計算されているか不安です',
          keyPoints: [
            '毎月の残業時間と給与明細が合わない',
            '15分単位で切り捨てられている可能性',
            '他のスタッフも同じ状況'
          ],
          advice: [
            '労働基準法では1分単位の計算が原則',
            'まず事務担当者に確認を'
          ],
          answerCount: 8,
          tags: ['給与', '残業', '労働条件']
        },
        {
          id: 'thread-3',
          title: '患者さんからのクレーム対応で心が折れそう',
          keyPoints: [
            '理不尽なクレームが増えている',
            '院長のフォローが不十分',
            'ストレスで体調にも影響'
          ],
          advice: [
            'クレーム対応の記録を残す',
            '一人で抱え込まず院長に相談'
          ],
          answerCount: 15,
          tags: ['クレーム対応', 'ストレス', 'メンタル']
        }
      ] as ThreadSummary[];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <LoadingSpinner />
      </div>
    );
  }

  if (!summaries || summaries.length === 0) return null;

  return (
    <div className="space-y-4">
      {summaries.map((summary, index) => (
        <div key={summary.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Summary Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-bold">
                  {index + 1}
                </span>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
                  {summary.title}
                </h3>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <MessageSquare className="w-3 h-3 mr-1" />
                {summary.answerCount}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-2">
              {summary.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key Points */}
          <div className="p-4">
            <p className="text-xs font-medium text-gray-500 mb-2">要点</p>
            <ul className="space-y-1 mb-3">
              {summary.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                  <span className="text-primary mr-2 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Advice */}
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs font-medium text-blue-900 mb-1">アドバイス</p>
              <ul className="space-y-1">
                {summary.advice.map((advice, idx) => (
                  <li key={idx} className="flex items-start text-sm text-blue-700">
                    <span className="mr-2 mt-0.5">→</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Link to full thread */}
            <Link
              href={`/forum/thread/${summary.id}`}
              className="mt-3 inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium"
            >
              元の相談を読む
              <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      ))}

      {/* View All Link */}
      <Link
        href="/forum"
        className="block w-full text-center py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
      >
        すべての相談を見る
      </Link>
    </div>
  );
}