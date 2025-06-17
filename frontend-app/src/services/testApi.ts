import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/config/axios';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

type SRTPayload = {
  cognitiveSession: number;
  score: number;
  reactionAvgMs: number;
  reactionList: number[];
};

export function usePostSRTResult() {
  return useMutation({
    mutationFn: async ({
      cognitiveSession,
      score,
      reactionAvgMs,
      reactionList,
    }: SRTPayload) => {
      const payload = {
        cognitive_session: cognitiveSession,
        score,
        reaction_avg_ms: reactionAvgMs,
        reaction_list: reactionList.join(','),
      };

      console.log('SRT 데이터', payload);
      const res = await apiClient.post(
        'api/cognitive-statistics/result/srt/',
        payload,
      );
      return res.data;
    },

    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'SRT 점수 저장 완료!',
      });
    },

    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error(
        'SRT 전송 실패:',
        axiosError.response?.data || axiosError.message,
      );

      Toast.show({
        type: 'error',
        text1: 'SRT 점수 전송 실패',
        text2:
          axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      });
    },
  });
}

type SymbolPayload = {
  cognitiveSession: number;
  score: number;
  symbolCorrect: number;
  symbolAccuracy: number;
};

export function usePostSymbolResult() {
  return useMutation({
    mutationFn: async ({
      cognitiveSession,
      score,
      symbolCorrect,
      symbolAccuracy,
    }: SymbolPayload) => {
      const payload = {
        cognitive_session: cognitiveSession,
        score,
        symbol_correct: symbolCorrect,
        symbol_accuracy: symbolAccuracy,
      };

      console.log('Symbol 데이터', payload);
      const res = await apiClient.post(
        'api/cognitive-statistics/result/symbol/',
        payload,
      );
      return res.data;
    },

    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Symbol 점수 저장 완료!',
      });
    },

    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error(
        'Symbol 전송 실패:',
        axiosError.response?.data || axiosError.message,
      );

      Toast.show({
        type: 'error',
        text1: 'Symbol 점수 전송 실패',
        text2:
          axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      });
    },
  });
}

type PatternPayload = {
  cognitiveSession: number;
  score: number;
  patternCorrect: number;
  patternTimeSec: number;
};

export function usePostPatternResult() {
  return useMutation({
    mutationFn: async ({
      cognitiveSession,
      score,
      patternCorrect,
      patternTimeSec,
    }: PatternPayload) => {
      const payload = {
        cognitive_session: cognitiveSession,
        score,
        pattern_correct: patternCorrect,
        pattern_time_sec: patternTimeSec,
      };

      console.log('Pattern 데이터', payload);
      const res = await apiClient.post(
        'api/cognitive-statistics/result/pattern/',
        payload,
      );
      return res.data;
    },

    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Pattern 점수 저장 완료!',
      });
    },

    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error(
        'Pattern 전송 실패:',
        axiosError.response?.data || axiosError.message,
      );

      Toast.show({
        type: 'error',
        text1: 'Pattern 점수 전송 실패',
        text2:
          axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      });
    },
  });
}
