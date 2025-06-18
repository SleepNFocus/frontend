// src/store/testStore.ts
import { create } from 'zustand';

interface SleepTest1Result {
  avgReactionTime: number;
  avgScore: number;
  reactionList: number[];
}

interface SleepTest2Result {
  reactionTimes: number[];
  correctCount: number;
  wrongCount: number;
  avgReactionTime: number;
  totalScore: number;
}

interface SleepTest3Result {
  totalCorrect: number;
  totalTimeSec: number;
  finalScore: number;
  accuracy: number;
}

interface SleepTestStore {
  test1: SleepTest1Result | null;
  test2: SleepTest2Result | null;
  test3: SleepTest3Result | null;

  setTest1: (data: SleepTest1Result) => void;
  setTest2: (data: SleepTest2Result) => void;
  setTest3: (data: SleepTest3Result) => void;

  resetAll: () => void;
}

export const useSleepTestStore = create<SleepTestStore>()(set => ({
  test1: null,
  test2: null,
  test3: null,

  setTest1: data => set({ test1: data }),
  setTest2: data => set({ test2: data }),
  setTest3: data => set({ test3: data }),

  resetAll: () => set({ test1: null, test2: null, test3: null }),
}));
