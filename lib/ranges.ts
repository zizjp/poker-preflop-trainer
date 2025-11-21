import { Position, HandString } from './types';

// 各ポジションのレンジ定義
export const RANGES: Record<Position, HandString[]> = {
  UTG: [
    // ペア
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88',
    // スーテッドブロードウェイ
    'AKs', 'AQs', 'AJs', 'ATs',
    'KQs', 'KJs', 'KTs',
    'QJs', 'QTs',
    'JTs',
    // スーテッドコネクター
    'T9s', '98s', '87s', '76s', '65s', '54s',
    // オフスート
    'AKo', 'AQo',
  ],
  
  MP: [
    // UTGのすべて
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s',
    'KQs', 'KJs', 'KTs',
    'QJs', 'QTs',
    'JTs',
    'T9s', '98s', '87s', '76s', '65s', '54s',
    'AKo', 'AQo', 'AJo', 'KQo',
  ],
  
  CO: [
    // MPのすべて + 追加
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s',
    'KQs', 'KJs', 'KTs', 'K9s',
    'QJs', 'QTs', 'Q9s',
    'JTs', 'J9s',
    'T9s', 'T8s',
    '98s', '87s', '76s', '65s', '54s',
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o',
    'KQo', 'KJo', 'KTo',
    'QJo',
  ],
  
  BTN: [
    // すべてのペア
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    // Aスーツ全部
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    // Kスーツ
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s',
    // Qスーツ
    'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s',
    // Jスーツ
    'JTs', 'J9s', 'J8s',
    // その他スーツ
    'T9s', 'T8s', 'T7s',
    '98s', '97s',
    '87s', '86s',
    '76s', '75s',
    '65s', '64s',
    '54s', '53s',
    '43s',
    '32s',
    // オフスート
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o',
    'KQo', 'KJo', 'KTo', 'K9o',
    'QJo', 'QTo', 'Q9o',
    'JTo', 'J9o',
    'T9o', 'T8o',
    '98o',
  ],
  
  SB: [
    // SBはBTNより若干タイト（BBに対してのみ）
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s',
    'QJs', 'QTs', 'Q9s', 'Q8s',
    'JTs', 'J9s', 'J8s',
    'T9s', 'T8s', 'T7s',
    '98s', '97s',
    '87s', '86s',
    '76s', '75s',
    '65s', '64s',
    '54s',
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o',
    'KQo', 'KJo', 'KTo', 'K9o',
    'QJo', 'QTo',
    'JTo',
  ],
};

// 全169ハンドのリスト生成
export function generateAllHands(): HandString[] {
  const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  const hands: HandString[] = [];
  
  // ペア
  for (const rank of ranks) {
    hands.push(`${rank}${rank}`);
  }
  
  // スーテッドとオフスート
  for (let i = 0; i < ranks.length; i++) {
    for (let j = i + 1; j < ranks.length; j++) {
      hands.push(`${ranks[i]}${ranks[j]}s`); // スーテッド
      hands.push(`${ranks[i]}${ranks[j]}o`); // オフスート
    }
  }
  
  return hands;
}

// ハンドがレンジに含まれるか判定
export function isInRange(hand: HandString, position: Position): boolean {
  return RANGES[position].includes(hand);
}

// ポジションの説明
export const POSITION_DESCRIPTIONS: Record<Position, string> = {
  UTG: 'アンダー・ザ・ガン（最も早いポジション）',
  MP: 'ミドルポジション',
  CO: 'カットオフ（BTNの前）',
  BTN: 'ボタン（最も有利なポジション）',
  SB: 'スモールブラインド（vs BB）',
};

// レンジの広さ（パーセンテージ）
export const RANGE_PERCENTAGES: Record<Position, number> = {
  UTG: 15,
  MP: 18,
  CO: 25,
  BTN: 45,
  SB: 40,
};