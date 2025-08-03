import { PatternPayload, SRTPayload, SymbolPayload } from '@/types/test';
import { create } from 'zustand';

interface SleepTest1Result {
  sessionId: number;
  avgReactionTime: number;
  avgScore: number;
  reactionList: number[];
}

interface SleepTest2Result {
  sessionId: number;
  reactionTimes: number[];
  correctCount: number;
  wrongCount: number;
  avgReactionTime: number;
  totalScore: number;
}

interface SleepTest3Result {
  sessionId: number;
  totalCorrect: number;
  totalTimeSec: number;
  finalScore: number;
  accuracy: number;
}

interface SleepTestStore {
  sessionId: number | null;
  setSessionId: (id: number) => void;

  test1: SRTPayload | null;
  test2: SymbolPayload | null;
  test3: PatternPayload | null;

  setTest1: (data: SRTPayload) => void;
  setTest2: (data: SymbolPayload) => void;
  setTest3: (data: PatternPayload) => void;

  resetAll: () => void;
}
export const useSleepTestStore = create<SleepTestStore>(set => ({
  sessionId: null,
  setSessionId: (id: number) => set({ sessionId: id }),
  test1: null,
  test2: null,
  test3: null,
  setTest1: data => set({ test1: data }),
  setTest2: data => set({ test2: data }),
  setTest3: data => set({ test3: data }),
  resetAll: () =>
    set({
      sessionId: null,
      test1: null,
      test2: null,
      test3: null,
    }),
}));
