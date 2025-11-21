'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Action } from '@/lib/types';

interface FeedbackModalProps {
  show: boolean;
  correct: boolean;
  handString: string;
  userAction: Action;
  correctAction: Action;
  explanation: string;
  onNext: () => void;
}

export default function FeedbackModal({
  show,
  correct,
  handString,
  userAction,
  correctAction,
  explanation,
  onNext,
}: FeedbackModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onNext}
        >
          <motion.div
            className={`rounded-3xl p-8 max-w-md w-full shadow-2xl ${
              correct
                ? 'bg-gradient-to-br from-green-500 to-green-600'
                : 'bg-gradient-to-br from-red-500 to-red-600'
            }`}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* アイコン */}
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">
                {correct ? '✅' : '❌'}
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">
                {correct ? '正解！' : '不正解'}
              </h2>
            </div>

            {/* ハンド情報 */}
            <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-3">
                  {handString}
                </div>
                <div className="space-y-2 text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">あなたの選択:</span>
                    <span className="font-bold text-lg uppercase">
                      {userAction === 'raise' ? 'RAISE' : 'FOLD'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">正しい選択:</span>
                    <span className="font-bold text-lg uppercase">
                      {correctAction === 'raise' ? 'RAISE' : 'FOLD'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 解説 */}
            <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-6">
              <h3 className="text-white font-semibold mb-2 text-sm opacity-80">
                💡 解説
              </h3>
              <p className="text-white text-sm leading-relaxed">
                {explanation}
              </p>
            </div>

            {/* 次へボタン */}
            <button
              onClick={onNext}
              className="w-full bg-white text-gray-900 font-bold py-4 rounded-xl hover:bg-opacity-90 transition-all transform hover:scale-105 active:scale-95"
            >
              次の問題へ →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}