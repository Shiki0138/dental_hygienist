'use client';

import { useState } from 'react';
import { Target, Clock, Award, CheckCircle } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Mission } from '@/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';

export function DailyMission() {
  const { user } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const { data: mission, isLoading } = useQuery({
    queryKey: ['dailyMission', new Date().toDateString()],
    queryFn: async () => {
      // Demo mission data
      return {
        id: 'mission-1',
        title: '給与明細の控除項目を確認しよう',
        description: '毎月の給与明細、ちゃんと見ていますか？今日は控除項目を1つずつ確認してみましょう。',
        category: 'salary',
        points: 10,
        durationMinutes: 1,
        steps: [
          '給与明細を手元に用意する',
          '「健康保険料」の金額を確認',
          '「厚生年金」の金額を確認',
          '「所得税」の金額を確認',
          '先月と比較して変化があるかチェック'
        ],
        reward: {
          id: 'reward-1',
          type: 'template',
          name: '給与明細チェックリスト',
          description: '毎月使える給与明細の確認ポイント',
          value: null
        },
        createdAt: new Date(),
        activeUntil: new Date(Date.now() + 24 * 60 * 60 * 1000)
      } as Mission;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const completeMutation = useMutation({
    mutationFn: async () => {
      if (!user || !mission) return;
      
      const logData = {
        userId: user.uid,
        missionId: mission.id,
        completedAt: new Date(),
        pointsEarned: mission.points,
        rewardClaimed: mission.reward?.id
      };

      // Save to Firestore
      await setDoc(
        doc(db, 'mission_logs', `${user.uid}_${mission.id}_${Date.now()}`),
        logData
      );

      return logData;
    },
    onSuccess: () => {
      setIsCompleted(true);
    }
  });

  const handleStepComplete = (stepIndex: number) => {
    if (stepIndex === currentStep) {
      if (stepIndex === (mission?.steps.length || 0) - 1) {
        // Last step completed
        completeMutation.mutate();
      } else {
        setCurrentStep(stepIndex + 1);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <LoadingSpinner />
      </div>
    );
  }

  if (!mission) return null;

  const progress = isCompleted ? 100 : (currentStep / mission.steps.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mx-4">
      {/* Mission Header */}
      <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-green-600 uppercase tracking-wider">
            今日のミッション
          </span>
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {mission.durationMinutes}分
            </span>
            <span className="flex items-center">
              <Award className="w-3 h-3 mr-1" />
              {mission.points}pt
            </span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900">{mission.title}</h3>
      </div>

      {/* Mission Body */}
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4">{mission.description}</p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>進捗</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2 mb-4">
          {mission.steps.map((step, index) => {
            const isCurrentStep = index === currentStep;
            const isCompletedStep = isCompleted || index < currentStep;

            return (
              <button
                key={index}
                onClick={() => handleStepComplete(index)}
                disabled={!isCurrentStep || isCompleted}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  isCompletedStep
                    ? 'bg-green-50 border-green-200'
                    : isCurrentStep
                    ? 'bg-blue-50 border-blue-300 hover:bg-blue-100'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-5 h-5 mr-3 mt-0.5">
                    {isCompletedStep ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <span className={`w-5 h-5 rounded-full border-2 ${
                        isCurrentStep ? 'border-blue-500' : 'border-gray-300'
                      }`} />
                    )}
                  </span>
                  <div className="flex-1">
                    <span className={`text-sm ${
                      isCompletedStep ? 'text-green-700' : 'text-gray-700'
                    }`}>
                      {step}
                    </span>
                    {isCurrentStep && !isCompleted && (
                      <p className="text-xs text-blue-600 mt-1">
                        タップして完了
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Reward */}
        {isCompleted && mission.reward && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  🎉 ミッション完了！
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  {mission.reward.name}を獲得しました
                </p>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}