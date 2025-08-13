'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MessageCircle, 
  Plus, 
  Search,
  Filter,
  Heart,
  MessageSquare,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  User,
  ChevronRight
} from 'lucide-react';
import { BottomNav } from '@/components/layout/BottomNav';

const categories = [
  { id: 'all', label: 'すべて' },
  { id: 'career', label: 'キャリア' },
  { id: 'workplace', label: '職場の悩み' },
  { id: 'patient', label: '患者対応' },
  { id: 'technique', label: '技術相談' },
  { id: 'other', label: 'その他' }
];

const posts = [
  {
    id: '1',
    title: '転職を考えています。給与交渉のコツを教えてください',
    category: 'career',
    author: '匿名DH',
    createdAt: '2時間前',
    replies: 12,
    likes: 24,
    isResolved: false,
    isPinned: true,
    preview: '5年目の歯科衛生士です。今の職場の待遇に不満があり転職を考えていますが...'
  },
  {
    id: '2',
    title: '患者さんが怖がりで困っています',
    category: 'patient',
    author: '2年目DH',
    createdAt: '5時間前',
    replies: 8,
    likes: 15,
    isResolved: true,
    isPinned: false,
    preview: '極度の歯科恐怖症の患者さんへの対応方法を教えてください...'
  },
  {
    id: '3',
    title: 'スケーリング時の姿勢について',
    category: 'technique',
    author: '新人DH',
    createdAt: '1日前',
    replies: 5,
    likes: 10,
    isResolved: false,
    isPinned: false,
    preview: '長時間のスケーリングで腰が痛くなります。正しい姿勢を...'
  },
  {
    id: '4',
    title: '院長との関係に悩んでいます',
    category: 'workplace',
    author: '匿名希望',
    createdAt: '2日前',
    replies: 20,
    likes: 45,
    isResolved: false,
    isPinned: false,
    preview: '院長が高圧的で、毎日職場に行くのが辛いです...'
  }
];

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'career': return 'bg-purple-100 text-purple-700';
      case 'workplace': return 'bg-red-100 text-red-700';
      case 'patient': return 'bg-blue-100 text-blue-700';
      case 'technique': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.id === category)?.label || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">相談フォーラム</h1>
              <p className="text-sm text-gray-600 mt-1">みんなで解決、みんなで成長</p>
            </div>
            <Link 
              href="/forum/new"
              className="bg-blue-600 text-white rounded-full p-2.5 shadow-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="相談を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
            <p className="text-2xl font-bold text-blue-600">156</p>
            <p className="text-xs text-gray-500 mt-1">今月の相談</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
            <p className="text-2xl font-bold text-green-600">89%</p>
            <p className="text-xs text-gray-500 mt-1">解決率</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
            <p className="text-2xl font-bold text-purple-600">1.2k</p>
            <p className="text-xs text-gray-500 mt-1">アクティブ</p>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="px-4 space-y-4">
        {filteredPosts.map(post => (
          <Link key={post.id} href={`/forum/${post.id}`}>
            <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {post.isPinned && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      ピン留め
                    </span>
                  )}
                  {post.isResolved && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      解決済み
                    </span>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.preview}</p>

              {/* Post Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getCategoryColor(post.category)}`}>
                    {getCategoryLabel(post.category)}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {post.replies}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.likes}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Floating Action Button for Mobile */}
      <Link 
        href="/forum/new"
        className="fixed bottom-24 right-4 bg-blue-600 text-white rounded-full p-4 shadow-xl hover:bg-blue-700 transition-colors z-40 md:hidden"
      >
        <Plus className="w-6 h-6" />
      </Link>

      <BottomNav />
    </div>
  );
}