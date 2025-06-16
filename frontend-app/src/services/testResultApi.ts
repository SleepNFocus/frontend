import Toast from 'react-native-toast-message';
import { postPatternResult, postSRTResult, postSymbolResult } from './testApi';

export async function sendAllResults({
  userId,
  test1,
  test2,
  test3,
}: {
  userId: string;
  test1: { avgReactionTime: number; avgScore: number; reactionList: number[] };
  test2: { correctCount: number; wrongCount: number; totalScore: number };
  test3: { totalCorrect: number; finalScore: number; totalTimeSec: number };
}) {
  try {
    await postSRTResult({
      cognitiveSession: Number(userId),
      score: test1.avgScore,
      reactionAvgMs: test1.avgReactionTime,
      reactionList: test1.reactionList,
    });

    const total = test2.correctCount + test2.wrongCount || 1;
    const symbolAccuracy = Math.round((test2.correctCount / total) * 100);

    await postSymbolResult({
      cognitiveSession: Number(userId),
      score: test2.totalScore,
      symbolCorrect: test2.correctCount,
      symbolAccuracy: symbolAccuracy,
    });

    await postPatternResult({
      cognitiveSession: Number(userId),
      score: test3.finalScore,
      patternCorrect: test3.totalCorrect,
      patternTimeSec: test3.totalTimeSec,
    });

    Toast.show({
      type: 'success',
      text1: '모든 점수가 저장되었습니다!',
    });

    return true;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: '점수 저장 실패',
    });
    return false;
  }
}
