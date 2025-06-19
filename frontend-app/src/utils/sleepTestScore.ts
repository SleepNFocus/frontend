import { SRTPayload } from '@/types/test';

export function calculateSleepTest1Score(clickTimes: number[]): SRTPayload {
  const total = clickTimes.reduce((sum, time) => sum + time, 0);
  const count = clickTimes.length;

  const avgReactionTime = count === 0 ? 0 : Math.round(total / count);
  const avgScore = count === 0 ? 0 : Math.round(100 - avgReactionTime / 10);

  return {
    avgScore,
    avgReactionTime,
    reactionList: clickTimes,
    sessionId: 0, // 외부에서 override
  };
}

export function calculateSleepTest2Score(
  clickTimes: number[],
  correctCount: number,
  wrongCount: number,
) {
  const total = correctCount + wrongCount;
  const accuracy = total === 0 ? 0 : correctCount / total;
  const countScore = correctCount >= 20 ? 60 : correctCount * 3;
  const accuracyScore = Math.round(accuracy * 40);
  const totalScore = countScore + accuracyScore;
  const avgReactionTime = clickTimes.length
    ? Math.round(clickTimes.reduce((a, b) => a + b, 0) / clickTimes.length)
    : 0;

  return {
    reactionTimes: clickTimes,
    correctCount,
    wrongCount,
    avgReactionTime,
    totalScore,
  };
}

export function calculateSleepTest3Score(
  totalCorrect: number,
  totalStart: number | null,
) {
  const totalTimeSec =
    totalStart !== null ? (Date.now() - totalStart) / 1000 : 0;
  const baseScore = totalCorrect * 5;
  const bonusScore =
    totalTimeSec <= 10
      ? 10
      : totalTimeSec >= 20
        ? 0
        : Math.round((20 - totalTimeSec) * 1);
  const finalScore = baseScore + bonusScore;
  const accuracy = parseFloat(((totalCorrect / 18) * 100).toFixed(1));

  return {
    totalCorrect,
    totalTimeSec,
    finalScore,
    accuracy,
  };
}
