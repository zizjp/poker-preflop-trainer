'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStatistics, getSessions } from '@/lib/storage';
import { Position } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StatisticsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<ReturnType<typeof getStatistics> | null>(null);
  const [sessions, setSessions] = useState<ReturnType<typeof getSessions>>([]);

  useEffect(() => {
    setStats(getStatistics());
    setSessions(getSessions());
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen poker-felt flex items-center justify-center">
        <div className="text-white text-2xl">読み込み中...</div>
      </div>
    );
  }

  const positions: Position[] = ['UTG', 'MP', 'CO', 'BTN', 'SB'];
  const recentSessions = sessions.slice(0, 10);

  return (
    <main className="min-h-screen poker-felt p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* ヘッダー */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-white hover:text-green-300 transition-colors text-lg"
          >
            ← 戻る
          </button>
          <h1 className="text-4xl font-bold text-white">📊 学習統計</h1>
          <div className="w-20" /> {/* スペーサー */}
        </div>

        {/* 全体統計 */}
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">全体統計</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats.totalGames}
              </div>
              <div className="text-sm text-green-200">総ゲーム数</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats.totalQuestions}
              </div>
              <div className="text-sm text-green-200">総問題数</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {Math.round(stats.overallAccuracy * 100)}%
              </div>
              <div className="text-sm text-green-200">全体正解率</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats.streak}🔥
              </div>
              <div className="text-sm text-green-200">連続学習</div>
            </div>
          </div>
        </motion.div>

        {/* ポジション別マスター度 */}
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">ポジション別マスター度</h2>
          <div className="space-y-4">
            {positions.map((position, index) => {
              const posStats = stats.positionStats[position];
              const masteryLevel = posStats.masteryLevel;
              
              return (
                <div key={position}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-white">
                      <span className="font-bold text-lg">{position}</span>
                      <span className="text-sm text-green-200 ml-2">
                        ({posStats.gamesPlayed}ゲーム)
                      </span>
                    </div>
                    <div className="text-white font-bold">
                      {Math.round(masteryLevel)}%
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        masteryLevel >= 80 ? 'bg-green-400' :
                        masteryLevel >= 60 ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${masteryLevel}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <div className="text-xs text-green-200 mt-1">
                    正解率: {Math.round(posStats.accuracy * 100)}%
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 弱点ハンド Top 10 */}
        {stats.weakHands.length > 0 && (
          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              苦手なハンド Top 10
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {stats.weakHands.slice(0, 10).map((weakHand, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 rounded-xl p-3 text-center"
                >
                  <div className="text-xl font-bold text-white mb-1">
                    {weakHand.hand}
                  </div>
                  <div className="text-xs text-red-300">
                    {Math.round(weakHand.accuracy * 100)}% 正解
                  </div>
                  <div className="text-xs text-green-200">
                    {weakHand.attempts}回
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 最近のセッション */}
        {recentSessions.length > 0 && (
          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              最近のセッション
            </h2>
            <div className="space-y-3">
              {recentSessions.map((session, index) => (
                <Link
                  key={session.sessionId}
                  href={`/result?sessionId=${session.sessionId}`}
                >
                  <div className="bg-white bg-opacity-10 rounded-xl p-4 hover:bg-opacity-20 transition-all cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-bold text-lg">
                          {session.position}
                        </div>
                        <div className="text-xs text-green-200">
                          {new Date(session.startTime).toLocaleString('ja-JP')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          {Math.round(session.accuracy * 100)}%
                        </div>
                        <div className="text-xs text-green-200">
                          {session.score}/{session.total}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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
          <Link href="/">
            <div className="bg-green-600 bg-opacity-80 backdrop-blur-md rounded-2xl p-6 hover:bg-opacity-90 transition-all cursor-pointer text-center">
              <div className="text-2xl font-bold text-white mb-2">
                🎮 トレーニングを続ける
              </div>
              <p className="text-green-100 text-sm">
                ポジションを選んで練習
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}