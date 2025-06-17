// src/types/api.ts
export type SRTPayload = {
  cognitiveSession: number;
  score: number;
  reactionAvgMs: number;
  reactionList: number[];
};

export type SymbolPayload = {
  cognitiveSession: number;
  score: number;
  symbolCorrect: number;
  symbolAccuracy: number;
};

export type PatternPayload = {
  cognitiveSession: number;
  score: number;
  patternCorrect: number;
  patternTimeSec: number;
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