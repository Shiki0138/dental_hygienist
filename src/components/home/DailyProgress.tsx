'use client';

import { CheckCircle, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProgressItem {
  id: string;
  title: string;
  icon: string;
  completed: boolean;
  locked: boolean;
}

export function DailyProgress() {
  const [progress, setProgress] = useState<ProgressItem[]>([
    { id: 'card', title: '今日の実践Tips', icon: '📚', completed: false, locked: false },
    { id: 'quiz', title: '1分チャレンジ', icon: '🎯', completed: false, locked: false },
    { id: 'mission', title: '1分ミッション', icon: '✨', completed: false, locked: false },
    { id: 'arareru', title: 'あるある投稿', icon: '💬', completed: false, locked: true },
  ]);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('dailyProgress');
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('progressDate');

    if (savedProgress && savedDate === today) {
      setProgress(JSON.parse(savedProgress));
    } else {
      // Reset progress for new day
      localStorage.setItem('progressDate', today);
    }
  }, []);

  const completedCount = progress.filter(item => item.completed).length;
  const totalCount = progress.filter(item => !item.locked).length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 mx-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">
          今日の進捗
        </h3>
        <span className="text-xs text-gray-500">
          {completedCount}/{totalCount} 完了
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Progress Items */}
      <div className="grid grid-cols-4 gap-2">
        {progress.map((item) => (
          <button
            key={item.id}
            disabled={item.locked}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              item.locked
                ? 'opacity-50 cursor-not-allowed'
                : item.completed
                ? 'bg-green-50'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="relative mb-1">
              <span className="text-xl">{item.icon}</span>
              {item.completed && (
                <CheckCircle className="absolute -bottom-1 -right-1 w-4 h-4 text-green-600 bg-white rounded-full" />
              )}
              {item.locked && (
                <Lock className="absolute -bottom-1 -right-1 w-4 h-4 text-gray-400 bg-white rounded-full" />
              )}
            </div>
            <span className="text-xs text-gray-600 text-center leading-tight">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {/* Encouragement Message */}
      {completedCount === 0 && (
        <p className="text-xs text-gray-500 text-center mt-3">
          まずは「今日の実践Tips」から始めてみましょう！
        </p>
      )}
      {completedCount > 0 && completedCount < totalCount && (
        <p className="text-xs text-primary text-center mt-3">
          いい調子です！あと{totalCount - completedCount}つで今日の学習完了です
        </p>
      )}
      {completedCount === totalCount && (
        <p className="text-xs text-green-600 text-center mt-3 font-semibold">
          🎉 今日の学習完了！お疲れさまでした
        </p>
      )}
    </div>
  );
}