'use client';

import { useState, useEffect } from 'react';
import { Position } from '@/lib/types';
import { getStatistics } from '@/lib/storage';
import { POSITION_DESCRIPTIONS, RANGE_PERCENTAGES } from '@/lib/ranges';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [stats, setStats] = useState<ReturnType<typeof getStatistics> | null>(null);

  useEffect(() => {
    setStats(getStatistics());
  }, []);

  const positions: Position[] = ['UTG', 'MP', 'CO', 'BTN', 'SB'];

  return (
    <main className="min-h-screen poker-felt p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* ヘッダー */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            🃏 Poker Preflop Trainer
          </h1>
          <p className="text-xl text-green-200">
            プリフロップレンジを完璧に暗記しよう
          </p>
        </motion.div>

        {/* 統計サマリー */}
        {stats && stats.totalGames > 0 && (
          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-white">
                  {stats.totalGames}
                </div>
                <div className="text-sm text-green-200">ゲーム数</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {Math.round(stats.overallAccuracy * 100)}%
                </div>
                <div className="text-sm text-green-200">全体正解率</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {stats.totalQuestions}
                </div>
                <div className="text-sm text-green-200">総問題数</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {stats.streak}🔥
                </div>
                <div className="text-sm text-green-200">連続学習日数</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ポジション選択 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            ポジションを選択
          </h2>
          
          {positions.map((position, index) => {
            const posStats = stats?.positionStats[position];
            const masteryLevel = posStats?.masteryLevel || 0;
            
            return (
              <motion.div
                key={position}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/game?position=${position}`}>
                  <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 hover:bg-opacity-20 transition-all cursor-pointer transform hover:scale-105 active:scale-95">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {position}
                        </h3>
                        <p className="text-sm text-green-200">
                          {POSITION_DESCRIPTIONS[position]}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">
                          {RANGE_PERCENTAGES[position]}%
                        </div>
                        <div className="text-xs text-green-200">
                          レンジ幅
                        </div>
                      </div>
                    </div>
                    
                    {/* マスターレベル */}
                    {posStats && posStats.gamesPlayed > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-white">
                          <span>習熟度</span>
                          <span>{Math.round(masteryLevel)}%</span>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-yellow-400 to-green-400 h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${masteryLevel}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-green-200">
                          <span>プレイ回数: {posStats.gamesPlayed}</span>
                          <span>正解率: {Math.round(posStats.accuracy * 100)}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* その他のオプション */}
        <motion.div
          className="mt-8 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/statistics">
            <div className="bg-blue-600 bg-opacity-80 backdrop-blur-md rounded-2xl p-6 hover:bg-opacity-90 transition-all cursor-pointer text-center">
              <div className="text-2xl font-bold text-white mb-2">
                📊 詳細統計を見る
              </div>
              <p className="text-blue-100 text-sm">
                学習履歴と弱点分析
              </p>
            </div>
          </Link>

          {stats && stats.weakHands.length > 0 && (
            <Link href="/review">
              <div className="bg-orange-600 bg-opacity-80 backdrop-blur-md rounded-2xl p-6 hover:bg-opacity-90 transition-all cursor-pointer text-center">
                <div className="text-2xl font-bold text-white mb-2">
                  🔄 弱点を復習
                </div>
                <p className="text-orange-100 text-sm">
                  間違えた問題を集中トレーニング
                </p>
              </div>
            </Link>
          )}
        </motion.div>
      </div>
    </main>
  );
}