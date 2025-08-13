'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Smile, 
  Heart, 
  MessageCircle, 
  Share2,
  TrendingUp,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  ThumbsUp
} from 'lucide-react';
import { BottomNav } from '@/components/layout/BottomNav';

const categories = [
  { id: 'all', label: 'すべて' },
  { id: 'patient', label: '患者さん編' },
  { id: 'doctor', label: '先生編' },
  { id: 'daily', label: '日常編' },
  { id: 'mistake', label: '失敗編' },
  { id: 'happy', label: 'ハッピー編' }
];

const arareru = [
  {
    id: '1',
    content: '「痛くないですか？」と聞いたら「大丈夫です」と言うけど、明らかに手を握りしめてる患者さん',
    category: 'patient',
    empathy: 324,
    comments: 12,
    createdAt: '2時間前',
    isHot: true
  },
  {
    id: '2',
    content: '診療終了5分前に「実は他にも痛いところがあって...」と言い出す患者さん',
    category: 'patient',
    empathy: 456,
    comments: 28,
    createdAt: '5時間前',
    isHot: true
  },
  {
    id: '3',
    content: 'マスクを外した瞬間、患者さんに「若いですね！」と驚かれる（もう5年目です）',
    category: 'daily',
    empathy: 189,
    comments: 8,
    createdAt: '1日前',
    isHot: false
  },
  {
    id: '4',
    content: '院長「今日は早く帰っていいよ」→ 新しい患者さんが来院 → 結局定時過ぎ',
    category: 'doctor',
    empathy: 567,
    comments: 34,
    createdAt: '1日前',
    isHot: true
  },
  {
    id: '5',
    content: 'グローブを付けた後に限って鼻がかゆくなる現象',
    category: 'daily',
    empathy: 892,
    comments: 45,
    createdAt: '2日前',
    isHot: true
  },
  {
    id: '6',
    content: 'スケーリング中、石灰化した歯石が飛んでどこかに消える',
    category: 'daily',
    empathy: 234,
    comments: 15,
    createdAt: '3日前',
    isHot: false
  }
];

export default function ArareruPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userEmpathy, setUserEmpathy] = useState<string[]>([]);

  const filteredArareru = selectedCategory === 'all' 
    ? arareru 
    : arareru.filter(item => item.category === selectedCategory);

  const handleEmpathy = (id: string) => {
    setUserEmpathy(prev => 
      prev.includes(id) 
        ? prev.filter(empId => empId !== id)
        : [...prev, id]
    );
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'patient': return 'bg-blue-100 text-blue-700';
      case 'doctor': return 'bg-purple-100 text-purple-700';
      case 'daily': return 'bg-green-100 text-green-700';
      case 'mistake': return 'bg-red-100 text-red-700';
      case 'happy': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.id === category)?.label || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">歯科衛生士あるある</h1>
          <p className="text-sm text-gray-600 mt-1">みんなの"わかる！"を共有しよう</p>
        </div>
      </header>

      {/* Today's Top */}
      <div className="px-4 mt-6 mb-4">
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium opacity-90">今日の1位</span>
            <Award className="w-5 h-5" />
          </div>
          <p className="text-base font-medium mb-3">
            グローブを付けた後に限って鼻がかゆくなる現象
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm">
                <Heart className="w-4 h-4 fill-current" />
                892人が共感
              </span>
            </div>
            <button className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium hover:bg-white/30 transition-colors">
              もっと見る
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <span className="text-xs text-orange-600 font-medium">今週</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">234</p>
            <p className="text-xs text-gray-600 mt-1">新しいあるある</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-pink-600" />
              <span className="text-xs text-pink-600 font-medium">累計</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">15.2k</p>
            <p className="text-xs text-gray-600 mt-1">共感された数</p>
          </div>
        </div>
      </div>

      {/* Arareru List */}
      <div className="px-4 space-y-4">
        {filteredArareru.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            {/* Hot Badge */}
            {item.isHot && (
              <div className="flex items-center gap-1 mb-3">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold text-red-500">HOT</span>
              </div>
            )}

            {/* Content */}
            <p className="text-gray-900 mb-3 leading-relaxed">
              {item.content}
            </p>

            {/* Category and Time */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getCategoryColor(item.category)}`}>
                {getCategoryLabel(item.category)}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.createdAt}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleEmpathy(item.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    userEmpathy.includes(item.id)
                      ? 'text-red-500'
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${userEmpathy.includes(item.id) ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">
                    {userEmpathy.includes(item.id) ? item.empathy + 1 : item.empathy}
                  </span>
                </button>
                <Link href={`/arareru/${item.id}`} className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.comments}</span>
                </Link>
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <Link href={`/arareru/${item.id}`}>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Post Your Arareru Button */}
      <Link 
        href="/arareru/new"
        className="fixed bottom-24 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full px-4 py-3 shadow-xl hover:shadow-2xl transition-all z-40 flex items-center gap-2"
      >
        <Smile className="w-5 h-5" />
        <span className="text-sm font-medium">投稿する</span>
      </Link>

      <BottomNav />
    </div>
  );
}