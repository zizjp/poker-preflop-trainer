'use client';

import { motion } from 'framer-motion';

interface CardProps {
  rank: string;
  suit: string;
  color: string;
}

export default function Card({ rank, suit, color }: CardProps) {
  // 色分けを確実に適用するため、条件分岐で明示的にクラスを設定
  const isRed = color.includes('red');
  const textColorClass = isRed ? 'text-red-600' : 'text-gray-900';
  
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-2xl p-6 w-32 h-44 flex flex-col items-center justify-center border-2 border-gray-300"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* シンプルに中央に大きく表示 */}
      <div className="text-center">
        <div className={`text-6xl font-bold leading-none mb-2 ${textColorClass}`}>
          {rank}
        </div>
        <div className={`text-7xl leading-none ${textColorClass}`}>
          {suit}
        </div>
      </div>
    </motion.div>
  );
}