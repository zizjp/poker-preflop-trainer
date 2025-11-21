'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Position, GameResult, Action } from '@/lib/types';
import { isInRange, POSITION_DESCRIPTIONS } from '@/lib/ranges';
import { generateCardDisplay, getHandCategory } from '@/lib/cards';
import { getWrongHands, saveSession } from '@/lib/storage';
import SwipeableCard from '@/components/SwipeableCard';
import FeedbackModal from '@/components/FeedbackModal';
import { motion } from 'framer-motion';

function ReviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const position = (searchParams.get('position') || 'UTG') as Position;

  const [hands, setHands] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<GameResult[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentResult, setCurrentResult] = useState<GameResult | null>(null);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  // 間違えたハンドを取得
  useEffect(() => {
    const wrongHands = getWrongHands(position, 30);
    if (wrongHands.length === 0) {
      alert('復習する問題がありません');
      router.push('/');
      return;
    }
    // シャッフル
    const shuffled = [...wrongHands].sort(() => Math.random() - 0.5);
    setHands(shuffled);
    setQuestionStartTime(Date.now());
  }, [position, router]);

  const currentHand = hands[currentIndex];
  const correctAction: Action = currentHand && isInRange(currentHand, position) ? 'raise' : 'fold';

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentHand) return;

    const userAction: Action = direction === 'right' ? 'raise' : 'fold';
    const correct = userAction === correctAction;
    const timeSpent = (Date.now() - questionStartTime) / 1000;

    const result: GameResult = {
      hand: currentHand,
      userAction,
      correctAction,
      correct,
      timeSpent,
      timestamp: Date.now(),
    };

    setCurrentResult(result);
    setResults([...results, result]);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setQuestionStartTime(Date.now());

    if (currentIndex < hands.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 復習完了
      finishReview();
    }
  };

  const finishReview = () => {
    const sessionResult = {
      sessionId: `review-${Date.now()}`,
      position,
      results,
      score: results.filter(r => r.correct).length + (currentResult?.correct ? 1 : 0),
      total: hands.length,
      accuracy: (results.filter(r => r.correct).length + (currentResult?.correct ? 1 : 0)) / hands.length,
      startTime,
      endTime: Date.now(),
    };

    saveSession(sessionResult);
    router.push(`/result?sessionId=${sessionResult.sessionId}`);
  };

  if (!currentHand) {
    return (
      <div className="min-h-screen poker-felt flex items-center justify-center">
        <div className="text-white text-2xl">読み込み中...</div>
      </div>
    );
  }

  const cards = generateCardDisplay(currentHand);
  const correctCount = results.filter(r => r.correct).length;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 100;

  const getExplanation = () => {
    const category = getHandCategory(currentHand);
    const categoryText = category === 'pair' ? 'ペア' : category === 'suited' ? 'スーテッド' : 'オフスート';
    
    if (correctAction === 'raise') {
      return `${currentHand}は${position}のレンジに含まれる${categoryText}ハンドです。このポジションでは積極的にレイズしましょう。以前間違えた問題なので、しっかり覚えておきましょう！`;
    } else {
      return `${currentHand}は${position}のレンジには含まれません。このポジションではフォールドが正解です。境界線を理解することが重要です。`;
    }
  };

  return (
    <main className="min-h-screen poker-felt">
      {/* ヘッダー */}
      <div className="bg-orange-600 bg-opacity-40 backdrop-blur-sm py-4 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-white hover:text-orange-200 transition-colors"
          >
            ← 戻る
          </button>
          <div className="text-white text-center">
            <div className="text-sm opacity-80">🔄 復習モード</div>
            <div className="text-2xl font-bold">{position} - {POSITION_DESCRIPTIONS[position]}</div>
          </div>
          <div className="text-white text-right">
            <div className="text-sm opacity-80">進捗</div>
            <div className="text-xl font-bold">
              {currentIndex + 1}/{hands.length}
            </div>
          </div>
        </div>
      </div>

      {/* プログレスバー */}
      <div className="bg-black bg-opacity-20">
        <motion.div
          className="bg-orange-400 h-2"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / hands.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex items-center justify-center p-4 min-h-[calc(100vh-120px)]">
        <SwipeableCard
          card1={cards.card1}
          card2={cards.card2}
          handString={currentHand}
          onSwipe={handleSwipe}
          position={`${position} (復習)`}
          currentQuestion={currentIndex + 1}
          totalQuestions={hands.length}
          accuracy={accuracy}
        />
      </div>

      {/* フィードバックモーダル */}
      {currentResult && (
        <FeedbackModal
          show={showFeedback}
          correct={currentResult.correct}
          handString={currentResult.hand}
          userAction={currentResult.userAction}
          correctAction={currentResult.correctAction}
          explanation={getExplanation()}
          onNext={handleNext}
        />
      )}
    </main>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen poker-felt flex items-center justify-center">
        <div className="text-white text-2xl">読み込み中...</div>
      </div>
    }>
      <ReviewContent />
    </Suspense>
  );
}