'use client';

import { Flame, Trophy } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface StreakBannerProps {
  userId: string;
}

export function StreakBanner({ userId }: StreakBannerProps) {
  const { data: streakData } = useQuery({
    queryKey: ['userStreak', userId],
    queryFn: async () => {
      // Demo mode: return static data
      // When Firebase is ready:
      // const profileDoc = await getDoc(doc(db, 'profiles', userId));
      // const profile = profileDoc.data();
      
      const profile = { streak: 7, maxStreak: 14, unlockedRewards: [] };
      
      return {
        currentStreak: profile?.streak || 0,
        maxStreak: profile?.maxStreak || 0,
        nextMilestone: getNextMilestone(profile?.streak || 0),
        unlockedRewards: profile?.unlockedRewards || []
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!streakData || streakData.currentStreak === 0) return null;

  const progress = (streakData.currentStreak / streakData.nextMilestone.days) * 100;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Flame className="w-8 h-8" />
            <span className="absolute -bottom-1 -right-1 bg-white text-orange-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {streakData.currentStreak}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold">
              {streakData.currentStreak}日連続ログイン中！
            </p>
            <p className="text-xs opacity-90">
              最高記録: {streakData.maxStreak}日
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs opacity-90">次の報酬まで</p>
          <p className="text-sm font-semibold">
            あと{streakData.nextMilestone.days - streakData.currentStreak}日
          </p>
        </div>
      </div>

      {/* Progress to next milestone */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="flex items-center">
            <Trophy className="w-3 h-3 mr-1" />
            {streakData.nextMilestone.name}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Upcoming Rewards */}
      <div className="mt-3 flex items-center space-x-2">
        {[3, 7, 14, 30].map((days) => {
          const isUnlocked = streakData.currentStreak >= days;
          const isCurrent = streakData.nextMilestone.days === days;
          
          return (
            <div
              key={days}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold ${
                isUnlocked
                  ? 'bg-white text-orange-500'
                  : isCurrent
                  ? 'bg-white/30 text-white border-2 border-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              {isUnlocked ? '✓' : days}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getNextMilestone(currentStreak: number) {
  const milestones = [
    { days: 3, name: '給与明細チェックリスト' },
    { days: 7, name: '対人スキルテンプレート' },
    { days: 14, name: 'キャリアプランシート' },
    { days: 30, name: '特別バッジ「継続の達人」' }
  ];

  return milestones.find(m => m.days > currentStreak) || milestones[milestones.length - 1];
}