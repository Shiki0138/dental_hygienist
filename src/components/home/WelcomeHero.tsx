'use client';

import { Calendar, TrendingUp, Users, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function WelcomeHero() {
  const today = new Date();
  const greeting = getGreeting();

  return (
    <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 mb-6 mx-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">
            {formatDate(today, 'long')}
          </p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {greeting}
          </h1>
          <p className="text-gray-700">
            今日も1分、自分のために学びましょう
          </p>
        </div>
        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-white/80 backdrop-blur rounded-lg p-3 text-center">
          <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-xs text-gray-600">今日の学習</p>
          <p className="text-sm font-bold text-gray-900">3分予定</p>
        </div>
        <div className="bg-white/80 backdrop-blur rounded-lg p-3 text-center">
          <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">成長ポイント</p>
          <p className="text-sm font-bold text-gray-900">+10pt</p>
        </div>
        <div className="bg-white/80 backdrop-blur rounded-lg p-3 text-center">
          <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">仲間</p>
          <p className="text-sm font-bold text-gray-900">2,345人</p>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-4 p-3 bg-white/60 backdrop-blur rounded-lg">
        <p className="text-sm text-gray-700 italic">
          💡 今日のヒント：小さな積み重ねが、大きな自信につながります
        </p>
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  
  if (hour < 5) return 'おはようございます';
  if (hour < 10) return 'おはようございます';
  if (hour < 17) return 'こんにちは';
  if (hour < 21) return 'お疲れさまです';
  return 'こんばんは';
}