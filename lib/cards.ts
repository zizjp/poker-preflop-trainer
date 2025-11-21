import { Rank, Suit } from './types';

// カードのUnicode文字
export const CARD_SYMBOLS: Record<Suit, string> = {
  s: '♠', // スペード
  h: '♥', // ハート
  d: '♦', // ダイヤ
  c: '♣', // クラブ
};

// ランクの表示名
export const RANK_DISPLAY: Record<Rank, string> = {
  'A': 'A',
  'K': 'K',
  'Q': 'Q',
  'J': 'J',
  'T': '10',
  '9': '9',
  '8': '8',
  '7': '7',
  '6': '6',
  '5': '5',
  '4': '4',
  '3': '3',
  '2': '2',
};

// ハンド文字列をパース（例: "AKs" → {rank1: 'A', rank2: 'K', suited: true}）
export function parseHand(handString: string): {
  rank1: Rank;
  rank2: Rank;
  suited: boolean;
} {
  const isPair = handString.length === 2;
  
  if (isPair) {
    return {
      rank1: handString[0] as Rank,
      rank2: handString[1] as Rank,
      suited: false,
    };
  }
  
  const rank1 = handString[0] as Rank;
  const rank2 = handString[1] as Rank;
  const suited = handString[2] === 's';
  
  return { rank1, rank2, suited };
}

// ランダムなスートを生成
export function getRandomSuit(): Suit {
  const suits: Suit[] = ['s', 'h', 'd', 'c'];
  return suits[Math.floor(Math.random() * suits.length)];
}

// ハンド文字列から表示用のカード情報を生成
export function generateCardDisplay(handString: string): {
  card1: { rank: string; suit: string; color: string };
  card2: { rank: string; suit: string; color: string };
} {
  const { rank1, rank2, suited } = parseHand(handString);
  
  // スーテッドの場合は同じスート、オフスートの場合は異なるスート
  let suit1: Suit, suit2: Suit;
  
  const isPair = rank1 === rank2;
  
  if (isPair) {
    // ペアの場合は異なるスート
    suit1 = 's';
    suit2 = 'h';
  } else if (suited) {
    // スーテッドの場合は同じスート
    const randomSuit = getRandomSuit();
    suit1 = randomSuit;
    suit2 = randomSuit;
  } else {
    // オフスートの場合は異なるスート（赤と黒を混ぜる）
    const redSuits: Suit[] = ['h', 'd'];
    const blackSuits: Suit[] = ['s', 'c'];
    
    if (Math.random() > 0.5) {
      suit1 = redSuits[Math.floor(Math.random() * 2)];
      suit2 = blackSuits[Math.floor(Math.random() * 2)];
    } else {
      suit1 = blackSuits[Math.floor(Math.random() * 2)];
      suit2 = redSuits[Math.floor(Math.random() * 2)];
    }
  }
  
  const getColor = (suit: Suit) => {
    return suit === 'h' || suit === 'd' ? 'text-red-600' : 'text-black';
  };
  
  return {
    card1: {
      rank: RANK_DISPLAY[rank1],
      suit: CARD_SYMBOLS[suit1],
      color: getColor(suit1),
    },
    card2: {
      rank: RANK_DISPLAY[rank2],
      suit: CARD_SYMBOLS[suit2],
      color: getColor(suit2),
    },
  };
}

// ハンドのカテゴリを判定
export function getHandCategory(handString: string): 'pair' | 'suited' | 'offsuit' {
  if (handString.length === 2) return 'pair';
  return handString[2] === 's' ? 'suited' : 'offsuit';
}

// ハンドの強さを5段階で評価
export function getHandStrength(handString: string, position: string): number {
  const { rank1, rank2 } = parseHand(handString);
  const isPair = rank1 === rank2;
  
  // プレミアムハンド
  if (['AA', 'KK', 'QQ', 'AKs', 'AKo'].includes(handString)) return 5;
  
  // 強いハンド
  if (['JJ', 'TT', 'AQs', 'AJs', 'KQs'].includes(handString)) return 4;
  
  // 中程度
  if (isPair || handString.includes('A') || handString.includes('K')) return 3;
  
  // 弱め
  if (handString.includes('s')) return 2;
  
  return 1;
}