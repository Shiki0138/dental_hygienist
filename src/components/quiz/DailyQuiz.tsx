'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Share2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Quiz } from '@/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function DailyQuiz() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['dailyQuiz', new Date().toDateString()],
    queryFn: async () => {
      // Demo quiz data
      return {
        id: 'quiz-1',
        question: '歯科診療報酬における歯科衛生実地指導料（15分以上）の点数は？',
        options: [
          { id: 0, text: '60点' },
          { id: 1, text: '80点' },
          { id: 2, text: '100点' }
        ],
        correctAnswer: 1,
        explanation: '歯科衛生実地指導料は15分以上の実地指導で80点です。これは月1回算定可能で、患者さんへの口腔衛生指導の重要な収入源となります。',
        category: '診療報酬',
        difficulty: 'medium',
        createdAt: new Date()
      } as Quiz;
    }
  });

  const handleAnswerSelect = (answerId: number) => {
    if (showResult) return;
    setSelectedAnswer(answerId);
    setShowResult(true);
    // TODO: Save answer to Firestore
  };

  const handleShare = async () => {
    if (navigator.share && quiz) {
      const resultText = selectedAnswer === quiz.correctAnswer 
        ? '正解しました！🎉' 
        : '惜しい！もう一度チャレンジ';
      
      try {
        await navigator.share({
          title: '歯科衛生士クイズ',
          text: `${quiz.question}\n${resultText}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Share failed:', error);
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

  if (!quiz) return null;

  const isCorrect = selectedAnswer === quiz.correctAnswer;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mx-4">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-purple-600 uppercase tracking-wider">
            1日1問チャレンジ
          </span>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
            {quiz.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900">{quiz.question}</h3>
      </div>

      {/* Options */}
      <div className="p-4 space-y-3">
        {quiz.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrectOption = option.id === quiz.correctAnswer;
          
          return (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                showResult
                  ? isCorrectOption
                    ? 'border-green-500 bg-green-50'
                    : isSelected
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-gray-50'
                  : isSelected
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{option.text}</span>
                {showResult && (
                  <>
                    {isCorrectOption && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Result & Explanation */}
      {showResult && (
        <div className="border-t p-4">
          <div className={`mb-3 p-3 rounded-lg ${
            isCorrect ? 'bg-green-100' : 'bg-orange-100'
          }`}>
            <p className={`font-semibold ${
              isCorrect ? 'text-green-800' : 'text-orange-800'
            }`}>
              {isCorrect ? '正解です！🎉' : '惜しい！もう一度チャレンジ'}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">解説</p>
            <p className="text-sm text-gray-600">{quiz.explanation}</p>
          </div>

          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">結果を共有</span>
          </button>
        </div>
      )}
    </div>
  );
}