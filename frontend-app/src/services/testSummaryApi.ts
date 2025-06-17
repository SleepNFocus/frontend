import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/axios';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

type RawScores = {
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

type DailySummaryItem = {
  date: string;
  userId: number;
  average_score: number;
  raw_scores: RawScores;
};

type DailySummaryResponse = DailySummaryItem[];

export function useGetDailySummary() {
  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.get<DailySummaryResponse>(
        'api/cognitive-statistics/result/daily-summary/',
      );
      return res.data;
    },

    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: '결과 요약 불러오기 성공!',
      });
    },

    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error(
        '결과 요약 불러오기 실패:',
        axiosError.response?.data || axiosError.message,
      );

      Toast.show({
        type: 'error',
        text1: '결과 요약 불러오기 실패',
        text2:
          axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      });
    },
  });
}
