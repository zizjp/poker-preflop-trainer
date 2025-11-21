// ポジション定義
export type Position = 'UTG' | 'MP' | 'CO' | 'BTN' | 'SB';

// アクション定義
export type Action = 'raise' | 'fold';

// カードのランクとスート
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A';
export type Suit = 's' | 'h' | 'd' | 'c'; // spade, heart, diamond, club

// ハンド定義
export interface Hand {
  rank1: Rank;
  rank2: Rank;
  suited: boolean;
}

// ハンド文字列（例: "AKs", "QJo"）
export type HandString = string;

// レンジデータ
export interface RangeData {
  position: Position;
  raiseHands: HandString[];
  foldHands: HandString[];
}

// ゲーム結果
export interface GameResult {
  hand: HandString;
  userAction: Action;
  correctAction: Action;
  correct: boolean;
  timeSpent: number;
  timestamp: number;
}

// セッション結果
export interface SessionResult {
  sessionId: string;
  position: Position;
  results: GameResult[];
  score: number;
  total: number;
  accuracy: number;
  startTime: number;
  endTime: number;
}

// 統計データ
export interface Statistics {
  totalGames: number;
  totalQuestions: number;
  overallAccuracy: number;
  positionStats: {
    [key in Position]: {
      gamesPlayed: number;
      accuracy: number;
      masteryLevel: number; // 0-100
    };
  };
  weakHands: Array<{
    hand: HandString;
    attempts: number;
    correctCount: number;
    accuracy: number;
  }>;
  lastPlayed: number;
  streak: number; // 連続学習日数
}