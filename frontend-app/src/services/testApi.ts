import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/axios';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

// 게임 세션 시작 API
export const startGameSession = async (formatId: number) => {
  const payload = { format_id: formatId };
  return (await apiClient.post('/cognitive_statistics/session/start/', payload))
    .data;
};

export const useStartGameSession = () =>
  useMutation({
    mutationFn: startGameSession,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: '게임 세션 시작 완료!',
      });
    },
    onError: error => {
      const axiosError = error as AxiosError<{ message?: string }>;
      Toast.show({
        type: 'error',
        text1: '게임 세션 시작 실패',
        text2:
          axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      });
    },
  });

// SRT 결과 전송 API
export const postSRTResult = async (data: {
  cognitiveSession: number;
  score: number;
  reactionAvgMs: number;
  reactionList: number[];
}) => {
  const payload = {
    cognitive_session: data.cognitiveSession,
    score: data.score,
    reaction_avg_ms: data.reactionAvgMs,
    reaction_list: data.reactionList.join(','),
  };
  return (await apiClient.post('api/cognitive-statistics/result/srt/', payload))
    .data;
};

export const usePostSRTResult = () =>
  useMutation({
    mutationFn: postSRTResult,
    onSuccess: () => {
      Toast.show({ type: 'success', text1: 'SRT 점수 저장 완료!' });
    },
    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>;
      Toast.show({
        type: 'error',
        text1: 'SRT 점수 전송 실패',
        text2:
          axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      });
    },
  });

// Symbol 결과 전송 API
export const postSymbolResult = async (data: {
  cognitiveSession: number;
  score: number;
  symbolCorrect: number;
  symbolAccuracy: number;
}) => {
  const payload = {
    cognitive_session: data.cognitiveSession,
    score: data.score,
    symbol_correct: data.symbolCorrect,
    symbol_accuracy: data.symbolAccuracy,
  };
  return (
    await apiClient.post('api/cognitive-statistics/result/symbol/', payload)
  ).data;
};

export const usePostSymbolResult = () =>
  useMutation({
    mutationFn: postSymbolResult,
    onSuccess: () => {
      Toast.show({ type: 'success', text1: 'Symbol 점수 저장 완료!' });
    },
    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>;
      Toast.show({
        type: 'error',
        text1: 'Symbol 점수 전송 실패',
        text2:
          axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      });
    },
  });

// Pattern 결과 전송 API
export const postPatternResult = async (data: {
  cognitiveSession: number;
  score: number;
  patternCorrect: number;
  patternTimeSec: number;
}) => {
  const payload = {
    cognitive_session: data.cognitiveSession,
    score: data.score,
    pattern_correct: data.patternCorrect,
    pattern_time_sec: data.patternTimeSec,
  };
  return (
    await apiClient.post('api/cognitive-statistics/result/pattern/', payload)
  ).data;
};

export const usePostPatternResult = () =>
  useMutation({
    mutationFn: postPatternResult,
    onSuccess: () => {
      Toast.show({ type: 'success', text1: 'Pattern 점수 저장 완료!' });
    },
    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>;
      Toast.show({
        type: 'error',
        text1: 'Pattern 점수 전송 실패',
        text2:
          axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      });
    },
  });

// 테스트 결과 전체 병렬 전송 (3개 테스트 결과 전송 + 결과 조회)
export const sendAllResults = async ({ userId, test1, test2, test3 }: any) => {
  const cognitiveSession = Number(userId);

  await postSRTResult({
    cognitiveSession,
    score: test1.avgScore,
    reactionAvgMs: test1.avgReactionTime,
    reactionList: test1.reactionList,
  });

  const total = test2.correctCount + test2.wrongCount || 1;
  const symbolAccuracy = Math.round((test2.correctCount / total) * 100);

  await postSymbolResult({
    cognitiveSession,
    score: test2.totalScore,
    symbolCorrect: test2.correctCount,
    symbolAccuracy,
  });

  await postPatternResult({
    cognitiveSession,
    score: test3.finalScore,
    patternCorrect: test3.totalCorrect,
    patternTimeSec: test3.totalTimeSec,
  });

  const res = await apiClient.get('/api/cognitive-statistics/result/basic/');
  return res.data;
};

export const useSendAllResults = () =>
  useMutation({
    mutationFn: sendAllResults,
    onSuccess: data => {
      Toast.show({
        type: 'success',
        text1: '모든 점수가 저장되고 결과가 조회되었습니다!',
      });
      console.log('기본 통계 결과:', data);
    },
    onError: error => {
      const axiosError = error as AxiosError<{
        message?: string;
        detail?: string;
      }>;
      const errorMsg =
        axiosError.response?.data?.message || axiosError.response?.data?.detail;
      Toast.show({
        type: 'error',
        text1: '점수 저장 실패',
        text2: errorMsg || '서버 오류가 발생했습니다.',
      });
    },
  });

// 일별 누적 결과 데이터 조회
export const getDailySummary = async () => {
  const res = await apiClient.get(
    'api/cognitive-statistics/result/daily-summary/',
  );
  return res.data;
};

export const useGetDailySummary = () =>
  useMutation({
    mutationFn: getDailySummary,
    onSuccess: () => {
      Toast.show({ type: 'success', text1: '결과 요약 불러오기 성공!' });
    },
    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>;
      Toast.show({
        type: 'error',
        text1: '결과 요약 불러오기 실패',
        text2:
          axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      });
    },
  });
