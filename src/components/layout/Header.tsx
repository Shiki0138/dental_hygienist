'use client';

import { Bell, Menu, Search, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              DH
            </div>
            <span className="font-semibold text-gray-900">歯科衛生士コミュニティ</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {user && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {user ? (
                <User className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 border-t border-gray-100 py-1 px-4">
        <p className="text-xs text-gray-500 text-center">
          本サイトは給与公開の場ではありません。制度・税・キャリア等の実用情報を提供します
        </p>
      </div>
    </header>
  );
}