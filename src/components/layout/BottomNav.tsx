'use client';

import { Home, MessageSquare, BookOpen, User, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'ホーム' },
  { href: '/forum', icon: MessageSquare, label: '相談' },
  { href: '/arareru/new', icon: PlusCircle, label: '投稿' },
  { href: '/saved', icon: BookOpen, label: '保存' },
  { href: '/profile', icon: User, label: 'マイ' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center flex-1 h-full transition-colors',
                  isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                )}
              >
                <Icon className={cn('w-5 h-5 mb-1', item.href === '/arareru/new' && 'w-6 h-6')} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}