'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { TodayCard } from '@/components/cards/TodayCard';
import { DailyQuiz } from '@/components/quiz/DailyQuiz';
import { ConsultationSummary } from '@/components/forum/ConsultationSummary';
import { DailyMission } from '@/components/missions/DailyMission';
import { ArareruFeed } from '@/components/arareru/ArareruFeed';
import { StreakBanner } from '@/components/gamification/StreakBanner';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { WelcomeHero } from '@/components/home/WelcomeHero';
import { DailyProgress } from '@/components/home/DailyProgress';

export default function HomePage() {
  const { user, loading, signInAnon } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasVisitedToday, setHasVisitedToday] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      if (!loading && !user) {
        try {
          await signInAnon();
        } catch (error) {
          console.error('Failed to sign in anonymously:', error);
        }
      }
      setIsInitializing(false);
    };

    initializeUser();
  }, [loading, user, signInAnon]);

  useEffect(() => {
    // Check if user has visited today
    const lastVisit = localStorage.getItem('lastVisitDate');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
      setHasVisitedToday(false);
      localStorage.setItem('lastVisitDate', today);
    } else {
      setHasVisitedToday(true);
    }
  }, []);

  if (loading || isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-4xl mx-auto pb-20 pt-4">
        {/* Welcome Section for first visit of the day */}
        {!hasVisitedToday && <WelcomeHero />}

        {/* Streak Banner */}
        {user && <StreakBanner userId={user.uid} />}

        {/* Daily Progress Overview */}
        <DailyProgress />

        {/* Today's Learning Section */}
        <div className="mb-8">
          <div className="px-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              今日の学び
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              毎日1分、あなたの成長をサポートします
            </p>
          </div>

          {/* Today's Card with context */}
          <section className="mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <div>
                <h3 className="text-lg font-semibold">今日の実践Tips</h3>
                <p className="text-xs text-gray-500">すぐに使える知識をお届け</p>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                毎日更新
              </span>
            </div>
            <TodayCard />
          </section>

          {/* Daily Quiz with context */}
          <section className="mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <div>
                <h3 className="text-lg font-semibold">1分チャレンジ</h3>
                <p className="text-xs text-gray-500">楽しく知識をチェック</p>
              </div>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                1日1問
              </span>
            </div>
            <DailyQuiz />
          </section>
        </div>

        {/* Community Section */}
        <div className="mb-8">
          <div className="px-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              みんなの声
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              仲間の悩みや共感から学ぶ
            </p>
          </div>

          {/* Consultation Summary */}
          <section className="mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <div>
                <h3 className="text-lg font-semibold">昨日の相談まとめ</h3>
                <p className="text-xs text-gray-500">人気の相談を要約でお届け</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                毎朝更新
              </span>
            </div>
            <ConsultationSummary />
          </section>

          {/* Arareru Feed */}
          <section className="mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <div>
                <h3 className="text-lg font-semibold">歯科衛生士あるある</h3>
                <p className="text-xs text-gray-500">共感の声を共有しよう</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                リアルタイム
              </span>
            </div>
            <ArareruFeed />
          </section>
        </div>

        {/* Action Section */}
        <div className="mb-8">
          <div className="px-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              今日のアクション
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              小さな一歩が大きな成長へ
            </p>
          </div>

          {/* Daily Mission */}
          <section className="mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <div>
                <h3 className="text-lg font-semibold">1分ミッション</h3>
                <p className="text-xs text-gray-500">今すぐできる実践課題</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                達成でポイント
              </span>
            </div>
            <DailyMission />
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}