'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { 
  Sparkles, 
  BookOpen, 
  MessageCircle, 
  Smile, 
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { BottomNav } from '@/components/layout/BottomNav';

export default function HomePage() {
  const { user, loading } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [streakDays] = useState(7);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('おはようございます');
    else if (hour < 18) setGreeting('こんにちは');
    else setGreeting('お疲れ様です');
  }, []);

  const handleTaskToggle = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="animate-spin rounded-full border-b-2 border-blue-600 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 pb-20">
      {/* Header */}
      <header className="px-4 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-gray-900">{greeting}</h1>
        <p className="text-gray-600 mt-1">今日も1分、学んでいきましょう</p>
      </header>

      {/* Streak Card */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 font-medium">連続ログイン</p>
              <div className="flex items-center mt-2">
                <span className="text-4xl font-bold">{streakDays}</span>
                <span className="ml-2 text-lg">日目</span>
              </div>
              <p className="text-xs mt-2 opacity-80">素晴らしい継続です！</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
          <div className="mt-4 flex gap-1">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  i < streakDays ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Cards */}
      <div className="px-4 space-y-4">
        {/* Today's Learning */}
        <Link href="/tips" className="block">
          <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-3">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="font-semibold text-gray-900">今日の学び</h2>
                  <p className="text-sm text-gray-500 mt-0.5">給与明細の見方を学ぶ</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </Link>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Daily Quiz */}
          <Link href="/quiz" className="block">
            <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 h-full">
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-3 w-fit">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mt-3">1分クイズ</h3>
              <p className="text-xs text-gray-500 mt-1">知識をチェック</p>
              <div className="mt-3 flex items-center text-xs text-purple-600">
                <Clock className="w-3 h-3 mr-1" />
                <span>約1分</span>
              </div>
            </div>
          </Link>

          {/* Forum */}
          <Link href="/forum" className="block">
            <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 h-full">
              <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-3 w-fit">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mt-3">相談する</h3>
              <p className="text-xs text-gray-500 mt-1">みんなに聞く</p>
              <div className="mt-3">
                <span className="text-xs text-green-600 font-medium">3件の新着</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Arareru Section */}
        <Link href="/arareru" className="block">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 border border-orange-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-3">
                  <Smile className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h2 className="font-semibold text-gray-900">今日のあるある</h2>
                  <p className="text-sm text-gray-600 mt-0.5">「急患は必ず閉院30分前」</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-orange-600 font-bold">156</div>
                <div className="text-xs text-gray-500">共感</div>
              </div>
            </div>
          </div>
        </Link>

        {/* Today's Mission */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">今日のミッション</h2>
            <Award className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-3">
            {[
              { id: '1', text: '今日の学びを読む', points: 10 },
              { id: '2', text: '1分クイズに挑戦', points: 15 },
              { id: '3', text: 'あるあるに共感する', points: 5 }
            ].map(task => (
              <label 
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={completedTasks.includes(task.id)}
                    onChange={() => handleTaskToggle(task.id)}
                    className="mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
                  />
                  <span className={`text-sm ${completedTasks.includes(task.id) ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {task.text}
                  </span>
                </div>
                <span className="text-xs text-gray-500">+{task.points}pt</span>
              </label>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">達成度</span>
              <span className="text-sm font-semibold text-blue-600">
                {completedTasks.length}/3 完了
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedTasks.length / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-xs text-gray-500 mt-1">学習日数</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
            <p className="text-2xl font-bold text-green-600">28</p>
            <p className="text-xs text-gray-500 mt-1">クイズ正解</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
            <p className="text-2xl font-bold text-orange-600">45</p>
            <p className="text-xs text-gray-500 mt-1">共感した数</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}