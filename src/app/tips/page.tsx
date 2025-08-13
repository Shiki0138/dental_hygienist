'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  DollarSign, 
  Users, 
  Heart, 
  ChevronRight,
  Clock,
  Star,
  TrendingUp,
  Award,
  Briefcase,
  Calculator,
  MessageCircle
} from 'lucide-react';
import { BottomNav } from '@/components/layout/BottomNav';

const categories = [
  { id: 'salary', icon: DollarSign, label: '給与・税金', color: 'green' },
  { id: 'skills', icon: Users, label: '対人スキル', color: 'blue' },
  { id: 'career', icon: TrendingUp, label: 'キャリア', color: 'purple' },
  { id: 'wellness', icon: Heart, label: '健康管理', color: 'pink' }
];

const tips = [
  {
    id: '1',
    title: '給与明細の見方を完全マスター',
    category: 'salary',
    readTime: 3,
    difficulty: 'beginner',
    description: '控除項目を理解して手取りを増やす方法',
    isNew: true,
    isPinned: true
  },
  {
    id: '2',
    title: '患者さんとの会話テクニック10選',
    category: 'skills',
    readTime: 5,
    difficulty: 'intermediate',
    description: '緊張する患者さんをリラックスさせる方法',
    isNew: false,
    isPinned: false
  },
  {
    id: '3',
    title: 'キャリアアップの道筋',
    category: 'career',
    readTime: 4,
    difficulty: 'advanced',
    description: '認定歯科衛生士になるための具体的ステップ',
    isNew: false,
    isPinned: true
  },
  {
    id: '4',
    title: '腰痛予防の正しい姿勢',
    category: 'wellness',
    readTime: 2,
    difficulty: 'beginner',
    description: '診療中の姿勢を改善する簡単エクササイズ',
    isNew: true,
    isPinned: false
  }
];

export default function TipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTips = selectedCategory 
    ? tips.filter(tip => tip.category === selectedCategory)
    : tips;

  const pinnedTips = filteredTips.filter(tip => tip.isPinned);
  const regularTips = filteredTips.filter(tip => !tip.isPinned);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-blue-600 bg-blue-50';
      case 'advanced': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return '初級';
      case 'intermediate': return '中級';
      case 'advanced': return '上級';
      default: return '';
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    if (!cat) return 'gray';
    switch(cat.color) {
      case 'green': return 'from-green-100 to-green-50 text-green-600';
      case 'blue': return 'from-blue-100 to-blue-50 text-blue-600';
      case 'purple': return 'from-purple-100 to-purple-50 text-purple-600';
      case 'pink': return 'from-pink-100 to-pink-50 text-pink-600';
      default: return 'from-gray-100 to-gray-50 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">便利な情報</h1>
          <p className="text-sm text-gray-600 mt-1">毎日1分で学べる実践知識</p>
        </div>
      </header>

      {/* Today's Highlight */}
      <div className="px-4 mt-6 mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium opacity-90">今日のおすすめ</span>
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold mb-2">年末調整の準備を始めよう</h2>
          <p className="text-sm opacity-90 mb-3">必要書類と節税のポイントを解説</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs bg-white/20 px-2 py-1 rounded">3分で読める</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">初級</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              selectedCategory === null 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            すべて
          </button>
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tips List */}
      <div className="px-4 space-y-4">
        {/* Pinned Tips */}
        {pinnedTips.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-2">
              <Star className="w-4 h-4" />
              ピン留め
            </h3>
            {pinnedTips.map(tip => {
              const category = categories.find(c => c.id === tip.category);
              const Icon = category?.icon || BookOpen;
              
              return (
                <Link key={tip.id} href={`/tips/${tip.id}`}>
                  <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`bg-gradient-to-br ${getCategoryColor(tip.category)} rounded-xl p-2.5`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {tip.isNew && (
                              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-medium">
                                NEW
                              </span>
                            )}
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(tip.difficulty)}`}>
                              {getDifficultyLabel(tip.difficulty)}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                          <p className="text-sm text-gray-600">{tip.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {tip.readTime}分
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Regular Tips */}
        {regularTips.length > 0 && (
          <div className="space-y-3">
            {pinnedTips.length > 0 && (
              <h3 className="text-sm font-semibold text-gray-500">すべての記事</h3>
            )}
            {regularTips.map(tip => {
              const category = categories.find(c => c.id === tip.category);
              const Icon = category?.icon || BookOpen;
              
              return (
                <Link key={tip.id} href={`/tips/${tip.id}`}>
                  <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`bg-gradient-to-br ${getCategoryColor(tip.category)} rounded-xl p-2.5`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {tip.isNew && (
                              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-medium">
                                NEW
                              </span>
                            )}
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(tip.difficulty)}`}>
                              {getDifficultyLabel(tip.difficulty)}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                          <p className="text-sm text-gray-600">{tip.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {tip.readTime}分
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}