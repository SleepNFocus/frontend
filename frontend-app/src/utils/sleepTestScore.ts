export function calculateSleepTest1Score(times: number[]) {
  const REACTION_TIME_MIN = 150;
  const REACTION_TIME_MAX = 800;

  const scores = times.map(t => {
    if (t <= REACTION_TIME_MIN) return 100;
    if (t >= REACTION_TIME_MAX) return 0;
    return (
      ((REACTION_TIME_MAX - t) / (REACTION_TIME_MAX - REACTION_TIME_MIN)) * 100
    );
  });

  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const avgReactionTime = times.reduce((a, b) => a + b, 0) / times.length;

  return {
    avgScore: Math.round(avgScore * 10) / 10,
    avgReactionTime: Math.round(avgReactionTime),
    reactionTimes: times,
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
