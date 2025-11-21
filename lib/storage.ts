import { SessionResult, Statistics, Position } from './types';

const STORAGE_KEYS = {
  STATISTICS: 'poker-trainer-statistics',
  SESSIONS: 'poker-trainer-sessions',
  SETTINGS: 'poker-trainer-settings',
};

// 統計データの初期化
function getInitialStatistics(): Statistics {
  return {
    totalGames: 0,
    totalQuestions: 0,
    overallAccuracy: 0,
    positionStats: {
      UTG: { gamesPlayed: 0, accuracy: 0, masteryLevel: 0 },
      MP: { gamesPlayed: 0, accuracy: 0, masteryLevel: 0 },
      CO: { gamesPlayed: 0, accuracy: 0, masteryLevel: 0 },
      BTN: { gamesPlayed: 0, accuracy: 0, masteryLevel: 0 },
      SB: { gamesPlayed: 0, accuracy: 0, masteryLevel: 0 },
    },
    weakHands: [],
    lastPlayed: Date.now(),
    streak: 0,
  };
}

// 統計データの取得
export function getStatistics(): Statistics {
  if (typeof window === 'undefined') return getInitialStatistics();
  
  const stored = localStorage.getItem(STORAGE_KEYS.STATISTICS);
  if (!stored) return getInitialStatistics();
  
  try {
    return JSON.parse(stored);
  } catch {
    return getInitialStatistics();
  }
}

// 統計データの保存
export function saveStatistics(stats: Statistics): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
}

// セッション結果の保存
export function saveSession(session: SessionResult): void {
  if (typeof window === 'undefined') return;
  
  const sessions = getSessions();
  sessions.unshift(session);
  
  // 最新50セッションのみ保持
  if (sessions.length > 50) {
    sessions.splice(50);
  }
  
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  
  // 統計を更新
  updateStatistics(session);
}

// セッション履歴の取得
export function getSessions(): SessionResult[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// 統計の更新
function updateStatistics(session: SessionResult): void {
  const stats = getStatistics();
  
  // 全体統計の更新
  stats.totalGames += 1;
  stats.totalQuestions += session.total;
  
  const totalCorrect = stats.overallAccuracy * (stats.totalQuestions - session.total) + session.score;
  stats.overallAccuracy = totalCorrect / stats.totalQuestions;
  
  // ポジション別統計の更新
  const posStats = stats.positionStats[session.position];
  posStats.gamesPlayed += 1;
  
  const posCorrect = posStats.accuracy * (posStats.gamesPlayed - 1) * 50 + session.score;
  posStats.accuracy = posCorrect / (posStats.gamesPlayed * 50);
  posStats.masteryLevel = Math.min(100, posStats.accuracy * 100);
  
  // 弱点ハンドの更新
  session.results.forEach(result => {
    if (!result.correct) {
      const weakHand = stats.weakHands.find(h => h.hand === result.hand);
      if (weakHand) {
        weakHand.attempts += 1;
        weakHand.accuracy = weakHand.correctCount / weakHand.attempts;
      } else {
        stats.weakHands.push({
          hand: result.hand,
          attempts: 1,
          correctCount: 0,
          accuracy: 0,
        });
      }
    } else {
      const weakHand = stats.weakHands.find(h => h.hand === result.hand);
      if (weakHand) {
        weakHand.attempts += 1;
        weakHand.correctCount += 1;
        weakHand.accuracy = weakHand.correctCount / weakHand.attempts;
      }
    }
  });
  
  // 弱点ハンドをソート（正解率の低い順）
  stats.weakHands.sort((a, b) => a.accuracy - b.accuracy);
  
  // 上位50件のみ保持
  if (stats.weakHands.length > 50) {
    stats.weakHands = stats.weakHands.slice(0, 50);
  }
  
  // 連続日数の更新
  const lastPlayed = new Date(stats.lastPlayed);
  const today = new Date();
  const daysDiff = Math.floor((today.getTime() - lastPlayed.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 0) {
    // 同日
    // streakは変更なし
  } else if (daysDiff === 1) {
    // 連続
    stats.streak += 1;
  } else {
    // 途切れた
    stats.streak = 1;
  }
  
  stats.lastPlayed = Date.now();
  
  saveStatistics(stats);
}

// 特定ポジションの間違えたハンドを取得
export function getWrongHands(position: Position, limit: number = 20): string[] {
  const sessions = getSessions();
  const wrongHands = new Map<string, number>();
  
  sessions
    .filter(s => s.position === position)
    .forEach(session => {
      session.results
        .filter(r => !r.correct)
        .forEach(result => {
          wrongHands.set(result.hand, (wrongHands.get(result.hand) || 0) + 1);
        });
    });
  
  return Array.from(wrongHands.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([hand]) => hand);
}

// データのクリア
export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(STORAGE_KEYS.STATISTICS);
  localStorage.removeItem(STORAGE_KEYS.SESSIONS);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
}