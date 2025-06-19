import { PatternPayload, SRTPayload, SymbolPayload } from '@/types/test';
import { useMutation } from '@tanstack/react-query';
import { getApiClient } from '@/services/axios';
import useUiStore from '@/store/uiStore';
import { AxiosError } from 'axios';

// const openToast = useUiStore(state => state.openToast);

// 게임 세션 시작 API
export const startGameSession = async (formatId: number) => {
  const client = await getApiClient();
  const payload = { format_id: formatId };
  const res = await client.post('cognitive-statistics/session/start/', payload);
  return res.data;
};

export const useStartGameSession = () =>
  useMutation({
    mutationFn: startGameSession,
    onSuccess: () => {
      const openToast = useUiStore.getState().openToast;
      openToast('success', '게임 세션 시작 완료!');
    },
    onError: error => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const openToast = useUiStore.getState().openToast;
      openToast(
        'error',
        '게임 세션 시작 실패',
        axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      );
    },
  });

// SRT 결과 전송
export const postSRTResult = async (data: {
  cognitiveSession: number;
  score: number;
  reactionAvgMs: number;
  reactionList: number[];
}) => {
  const client = await getApiClient();
  const payload = {
    cognitiveSession: data.cognitiveSession,
    score: data.score,
    reactionAvgMs: data.reactionAvgMs,
    reactionList: data.reactionList.join(','),
  };
  const res = await client.post('cognitive-statistics/result/srt/', payload);
  return res.data;
};

export const usePostSRTResult = () =>
  useMutation({
    mutationFn: postSRTResult,
    onSuccess: () => {
      const openToast = useUiStore.getState().openToast;
      openToast('success', 'SRT 점수 저장 완료!');
    },
    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>;
      const openToast = useUiStore.getState().openToast;
      openToast(
        'error',
        'SRT 점수 전송 실패',
        axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      );
    },
  });

// Symbol 결과 전송
export const postSymbolResult = async (data: {
  cognitiveSession: number;
  score: number;
  symbolCorrect: number;
  symbolAccuracy: number;
}) => {
  const client = await getApiClient();
  const payload = {
    cognitiveSession: data.cognitiveSession,
    score: data.score,
    symbolCorrect: data.symbolCorrect,
    symbolAccuracy: data.symbolAccuracy,
  };
  const res = await client.post('cognitive-statistics/result/symbol/', payload);
  return res.data;
};

export const usePostSymbolResult = () =>
  useMutation({
    mutationFn: postSymbolResult,
    onSuccess: () => {
      const openToast = useUiStore.getState().openToast;
      openToast('success', 'Symbol 점수 저장 완료!');
    },
    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>;
      const openToast = useUiStore.getState().openToast;
      openToast(
        'error',
        'Symbol 점수 전송 실패',

        axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      );
    },
  });

// Pattern 결과 전송
export const postPatternResult = async (data: {
  cognitiveSession: number;
  score: number;
  patternCorrect: number;
  patternTimeSec: number;
}) => {
  const client = await getApiClient();
  const payload = {
    cognitiveSession: data.cognitiveSession,
    score: data.score,
    patternCorrect: data.patternCorrect,
    patternTimeSec: data.patternTimeSec,
  };
  const res = await client.post(
    'cognitive-statistics/result/pattern/',
    payload,
  );
  return res.data;
};

export const usePostPatternResult = () =>
  useMutation({
    mutationFn: postPatternResult,
    onSuccess: () => {
      const openToast = useUiStore.getState().openToast;
      openToast('success', 'Pattern 점수 저장 완료!');
    },
    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>;
      const openToast = useUiStore.getState().openToast;
      openToast(
        'error',
        'Pattern 점수 전송 실패',
        axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      );
    },
  });

// 테스트 결과 전체 전송
export const sendAllResults = async ({
  userId,
  test1,
  test2,
  test3,
}: {
  userId: number;
  test1: SRTPayload;
  test2: SymbolPayload;
  test3: PatternPayload;
}) => {
  await postSRTResult({
    cognitiveSession: test1.sessionId,
    score: Math.round(test1.avgScore),
    reactionAvgMs: test1.avgReactionTime,
    reactionList: test1.reactionList,
  });

  const total = test2.correctCount + test2.wrongCount || 1;
  const symbolAccuracy = Math.round((test2.correctCount / total) * 100);

  await postSymbolResult({
    cognitiveSession: test2.sessionId,
    score: test2.totalScore,
    symbolCorrect: test2.correctCount,
    symbolAccuracy,
  });

  await postPatternResult({
    cognitiveSession: test3.sessionId,
    score: test3.finalScore,
    patternCorrect: test3.totalCorrect,
    patternTimeSec: test3.totalTimeSec,
  });

  const client = await getApiClient();
  const res = await client.get('cognitive-statistics/result/basic/');
  return res.data;
};

export const useSendAllResults = () =>
  useMutation({
    mutationFn: sendAllResults,
    onSuccess: data => {
      const openToast = useUiStore.getState().openToast;
      openToast('success', '모든 점수가 저장되고 결과가 조회되었습니다!');
    },
    onError: error => {
      const axiosError = error as AxiosError<{
        message?: string;
        detail?: string;
      }>;
      const errorMsg =
        axiosError.response?.data?.message || axiosError.response?.data?.detail;
      const openToast = useUiStore.getState().openToast;
      openToast(
        'error',
        '점수 저장 실패',
        errorMsg || '서버 오류가 발생했습니다.',
      );
    },
  });

// 일별 요약 조회
export const getDailySummary = async () => {
  const client = await getApiClient();
  const res = await client.get('cognitive-statistics/result/daily-summary/');
  return res.data;
};

export const useGetDailySummary = () =>
  useMutation({
    mutationFn: getDailySummary,
    onSuccess: () => {
      const openToast = useUiStore.getState().openToast;
      openToast('success', '결과 요약 불러오기 성공!');
    },
    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>;
      const openToast = useUiStore.getState().openToast;
      openToast(
        'error',
        '결과 요약 불러오기 실패',
        axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
      );
    },
  });
