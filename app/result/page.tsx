'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getSessions } from '@/lib/storage';
import { SessionResult } from '@/lib/types';
import { getHandCategory } from '@/lib/cards';
import { motion } from 'framer-motion';
import Link from 'next/link';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('sessionId');
  const [session, setSession] = useState<SessionResult | null>(null);

  useEffect(() => {
    if (sessionId) {
      const sessions = getSessions();
      const found = sessions.find(s => s.sessionId === sessionId);
      if (found) {
        setSession(found);
      }
    }
  }, [sessionId]);

  if (!session) {
    return (
      <div className="min-h-screen poker-felt flex items-center justify-center">
        <div className="text-white text-2xl">読み込み中...</div>
      </div>
    );
  }

  const wrongAnswers = session.results.filter(r => !r.correct);
  const categoryStats = {
    pair: { total: 0, correct: 0 },
    suited: { total: 0, correct: 0 },
    offsuit: { total: 0, correct: 0 },
  };

  session.results.forEach(result => {
    const category = getHandCategory(result.hand);
    categoryStats[category].total++;
    if (result.correct) {
      categoryStats[category].correct++;
    }
  });

  const getStars = (accuracy: number) => {
    if (accuracy >= 0.9) return '⭐⭐⭐';
    if (accuracy >= 0.8) return '⭐⭐';
    if (accuracy >= 0.7) return '⭐';
    return '';
  };

  const getCategoryAccuracy = (category: keyof typeof categoryStats) => {
    const stats = categoryStats[category];
    return stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  };

  return (
    <main className="min-h-screen poker-felt p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* 結果ヘッダー */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">{getStars(session.accuracy)}</div>
          <h1 className="text-5xl font-bold text-white mb-2">
            ゲーム結果
          </h1>
          <p className="text-xl text-green-200">{session.position} - プリフロップトレーニング</p>
        </motion.div>

        {/* スコア */}
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-center">
            <div className="text-6xl font-bold text-white mb-2">
              {session.score}/{session.total}
            </div>
            <div className="text-3xl font-bold text-green-300 mb-4">
              {Math.round(session.accuracy * 100)}%
            </div>
            <div className="text-green-200">
              {session.accuracy >= 0.9 ? '素晴らしい！' : 
               session.accuracy >= 0.8 ? 'とても良いです！' :
               session.accuracy >= 0.7 ? '良い結果です' :
               'もう少し練習しましょう'}
            </div>
          </div>
        </motion.div>

        {/* カテゴリ別正解率 */}
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">カテゴリ別正解率</h2>
          
          <div className="space-y-4">
            {/* ペア */}
            <div>
              <div className="flex justify-between text-white mb-2">
                <span>ペア (Pairs)</span>
                <span className="font-bold">{getCategoryAccuracy('pair')}%</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-green-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getCategoryAccuracy('pair')}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>

            {/* スーテッド */}
            <div>
              <div className="flex justify-between text-white mb-2">
                <span>スーテッド (Suited)</span>
                <span className="font-bold">{getCategoryAccuracy('suited')}%</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-blue-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getCategoryAccuracy('suited')}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
            </div>

            {/* オフスート */}
            <div>
              <div className="flex justify-between text-white mb-2">
                <span>オフスート (Offsuit)</span>
                <span className="font-bold">{getCategoryAccuracy('offsuit')}%</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-yellow-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getCategoryAccuracy('offsuit')}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 間違えた問題 */}
        {wrongAnswers.length > 0 && (
          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              間違えた問題 ({wrongAnswers.length}問)
            </h2>
            <div className="flex flex-wrap gap-2">
              {wrongAnswers.map((result, index) => (
                <div
                  key={index}
                  className="bg-red-500 bg-opacity-30 px-4 py-2 rounded-lg text-white font-semibold"
                >
                  {result.hand}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* アクションボタン */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {wrongAnswers.length > 0 && (
            <Link href={`/review?position=${session.position}`}>
              <div className="bg-orange-600 bg-opacity-80 backdrop-blur-md rounded-2xl p-6 hover:bg-opacity-90 transition-all cursor-pointer text-center">
                <div className="text-2xl font-bold text-white mb-2">
                  🔄 間違えた問題を復習
                </div>
                <p className="text-orange-100 text-sm">
                  弱点を克服しよう
                </p>
              </div>
            </Link>
          )}

          <Link href={`/game?position=${session.position}`}>
            <div className="bg-green-600 bg-opacity-80 backdrop-blur-md rounded-2xl p-6 hover:bg-opacity-90 transition-all cursor-pointer text-center">
              <div className="text-2xl font-bold text-white mb-2">
                🔁 もう一度プレイ
              </div>
              <p className="text-green-100 text-sm">
                同じポジションで再挑戦
              </p>
            </div>
          </Link>

          <Link href="/">
            <div className="bg-blue-600 bg-opacity-80 backdrop-blur-md rounded-2xl p-6 hover:bg-opacity-90 transition-all cursor-pointer text-center">
              <div className="text-2xl font-bold text-white mb-2">
                🏠 ホームに戻る
              </div>
              <p className="text-blue-100 text-sm">
                別のポジションを選択
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen poker-felt flex items-center justify-center">
        <div className="text-white text-2xl">読み込み中...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}