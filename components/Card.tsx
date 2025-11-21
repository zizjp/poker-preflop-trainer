'use client';

import { motion } from 'framer-motion';

interface CardProps {
  rank: string;
  suit: string;
  color: string;
}

export default function Card({ rank, suit, color }: CardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-2xl p-4 w-28 h-40 flex flex-col items-center justify-between border-2 border-gray-300"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 上部のランクとスート */}
      <div className={`text-left w-full ${color}`}>
        <div className="text-2xl font-bold leading-none">{rank}</div>
        <div className="text-3xl leading-none">{suit}</div>
      </div>
      
      {/* 中央の大きなスート */}
      <div className={`text-5xl ${color} flex items-center justify-center flex-1`}>
        {suit}
      </div>
      
      {/* 下部のランクとスート（反転） */}
      <div className={`text-right w-full ${color} transform rotate-180`}>
        <div className="text-2xl font-bold leading-none">{rank}</div>
        <div className="text-3xl leading-none">{suit}</div>
      </div>
    </motion.div>
  );
}
