// src/services/useSendAllResults.ts
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';
import { SendAllResultsPayload } from '@/types/test';
import { usePostSRTResult } from '@/services/testApi';
import { usePostSymbolResult } from '@/services/testApi';
import { usePostPatternResult } from '@/services/testApi';
import { apiClient } from '@/services/axios';

export function useSendAllResults() {
  const { mutateAsync: postSRT } = usePostSRTResult();
  const { mutateAsync: postSymbol } = usePostSymbolResult();
  const { mutateAsync: postPattern } = usePostPatternResult();

  return useMutation({
    mutationFn: async ({
      userId,
      test1,
      test2,
      test3,
    }: SendAllResultsPayload) => {
      const cognitiveSession = Number(userId);

      await postSRT({
        cognitiveSession,
        score: test1.avgScore,
        reactionAvgMs: test1.avgReactionTime,
        reactionList: test1.reactionList,
      });

      const total = test2.correctCount + test2.wrongCount || 1;
      const symbolAccuracy = Math.round((test2.correctCount / total) * 100);

      await postSymbol({
        cognitiveSession,
        score: test2.totalScore,
        symbolCorrect: test2.correctCount,
        symbolAccuracy,
      });

      await postPattern({
        cognitiveSession,
        score: test3.finalScore,
        patternCorrect: test3.totalCorrect,
        patternTimeSec: test3.totalTimeSec,
      });

      const { data: basicResult } = await apiClient.get(
        '/api/cognitive-statistics/result/basic/',
      );
      return basicResult; // 이 데이터를 onSuccess로 전달
    },

    onSuccess: data => {
      Toast.show({
        type: 'success',
        text1: '모든 점수가 저장되고 결과가 조회되었습니다!',
      });
      // [정리 필요] console.log 등 디버깅 코드는 배포 전 반드시 제거해야 함
      // 이유: 불필요한 콘솔 출력은 성능 저하, 보안 이슈, 로그 오염의 원인이 됨
    },

    onError: error => {
      const axiosError = error as AxiosError<{
        message?: string;
        detail?: string;
      }>;
      const errorMsg =
        axiosError.response?.data?.message || axiosError.response?.data?.detail;

      console.error('[전체 전송 실패]', errorMsg || axiosError.message);
      Toast.show({
        type: 'error',
        text1: '점수 저장 실패',
        text2: errorMsg || '서버 오류가 발생했습니다.',
      });
    },
  });
}
