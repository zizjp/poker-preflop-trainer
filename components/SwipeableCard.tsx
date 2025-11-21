'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Card from './Card';

interface SwipeableCardProps {
  card1: { rank: string; suit: string; color: string };
  card2: { rank: string; suit: string; color: string };
  handString: string;
  onSwipe: (direction: 'left' | 'right') => void;
  position: string;
  currentQuestion: number;
  totalQuestions: number;
  accuracy: number;
}

export default function SwipeableCard({
  card1,
  card2,
  handString,
  onSwipe,
  position,
  currentQuestion,
  totalQuestions,
  accuracy,
}: SwipeableCardProps) {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // カードが変わったら状態をリセット
  useEffect(() => {
    setExitX(0);
    x.set(0);
  }, [handString, x]);

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      setExitX(info.offset.x > 0 ? 200 : -200);
      onSwipe(direction);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute"
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={exitX !== 0 ? { x: exitX } : {}}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          {/* 背景のヒント表示 */}
          <div className="absolute -left-24 top-1/2 -translate-y-1/2 text-red-500 text-6xl font-bold opacity-0"
               style={{ opacity: x.get() < -50 ? Math.abs(x.get()) / 200 : 0 }}>
            👈 FOLD
          </div>
          <div className="absolute -right-24 top-1/2 -translate-y-1/2 text-green-500 text-6xl font-bold opacity-0"
               style={{ opacity: x.get() > 50 ? x.get() / 200 : 0 }}>
            RAISE 👉
          </div>

          {/* カード表示エリア */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl">
            {/* ヘッダー情報 */}
            <div className="text-center mb-6 space-y-2">
              <h2 className="text-3xl font-bold text-white">{position}</h2>
              <p className="text-gray-400 text-sm">
                問題 {currentQuestion}/{totalQuestions}
              </p>
              <div className="bg-slate-700 rounded-full px-4 py-1 inline-block">
                <span className="text-green-400 font-semibold">
                  正解率: {accuracy}%
                </span>
              </div>
            </div>

            {/* カード */}
            <div className="flex gap-6 justify-center mb-6">
              <Card rank={card1.rank} suit={card1.suit} color={card1.color} />
              <Card rank={card2.rank} suit={card2.suit} color={card2.color} />
            </div>

            {/* ハンド名 */}
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">{handString}</div>
            </div>

            {/* スワイプインジケーター */}
            <div className="flex justify-between items-center mt-6 text-sm">
              <div className="flex items-center gap-2 text-red-400">
                <span className="text-2xl">👈</span>
                <span>Fold</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <span>Raise</span>
                <span className="text-2xl">👉</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
