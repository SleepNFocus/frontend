// src/types/api.ts
export type SRTPayload = {
  sessionId: number;
  avgScore: number;
  avgReactionTime: number;
  reactionList: number[];
};

export type SymbolPayload = {
  sessionId: number;
  totalScore: number;
  correctCount: number;
  wrongCount: number;
  reactionTimes: number[];
};

export type PatternPayload = {
  sessionId: number;
  finalScore: number;
  totalCorrect: number;
  totalTimeSec: number;
};

export type SendAllResultsPayload = {
  userId: string;
  test1: SRTPayload;
  test2: SymbolPayload;
  test3: PatternPayload;
};

export interface CognitiveDailySummary {
  date: string;
  userId: number;
  average_score: number;
  raw_scores: {
    srt: {
      average_score: number;
      avg_ms: number;
    };
    symbol: {
      average_score: number;
      correct: number;
      avg_ms: number;
      symbol_accuracy: number;
    };
    pattern: {
      average_score: number;
      correct: number;
    };
  };
}