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
};

export type PatternPayload = {
  sessionId: number;
  finalScore: number;
  totalCorrect: number;
  totalTimeSec: number;
};

export type SendAllResultsPayload = {
  userId: string;
  test1: {
    avgReactionTime: number;
    avgScore: number;
    reactionList: number[];
  };
  test2: {
    correctCount: number;
    wrongCount: number;
    totalScore: number;
  };
  test3: {
    totalCorrect: number;
    finalScore: number;
    totalTimeSec: number;
  };
};
