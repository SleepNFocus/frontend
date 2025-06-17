import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/config/axios';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

type SendAllResultsPayload = {
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

export function useSendAllResults() {
  return useMutation({
    mutationFn: async ({
      userId,
      test1,
      test2,
      test3,
    }: SendAllResultsPayload) => {
      const cognitiveSession = Number(userId);

      const srtPayload = {
        cognitive_session: cognitiveSession,
        score: test1.avgScore,
        reaction_avg_ms: test1.avgReactionTime,
        reaction_list: test1.reactionList.join(','),
      };
      console.log('SRT', srtPayload);
      await apiClient.post('api/cognitive-statistics/result/srt/', srtPayload);

      const total = test2.correctCount + test2.wrongCount || 1;
      const symbolAccuracy = Math.round((test2.correctCount / total) * 100);
      const symbolPayload = {
        cognitive_session: cognitiveSession,
        score: test2.totalScore,
        symbol_correct: test2.correctCount,
        symbol_accuracy: symbolAccuracy,
      };
      console.log('Symbol', symbolPayload);
      await apiClient.post(
        'api/cognitive-statistics/result/symbol/',
        symbolPayload,
      );

      const patternPayload = {
        cognitive_session: cognitiveSession,
        score: test3.finalScore,
        pattern_correct: test3.totalCorrect,
        pattern_time_sec: test3.totalTimeSec,
      };
      console.log('Pattern', patternPayload);
      await apiClient.post(
        'api/cognitive-statistics/result/pattern/',
        patternPayload,
      );
    },

    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: '모든 점수가 저장되었습니다!',
      });
    },

    onError: error => {
      const axiosError = error as AxiosError<{
        message?: string;
        detail?: string;
      }>;
      const errorMsg =
        axiosError.response?.data?.message || axiosError.response?.data?.detail;

      console.error('[점수 전송 실패]', errorMsg || axiosError.message);
      Toast.show({
        type: 'error',
        text1: '점수 저장 실패',
        text2: errorMsg || '서버 오류가 발생했습니다.',
      });
    },
  });
}
