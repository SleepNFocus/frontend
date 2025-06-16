import { apiClient } from '@/config/axios';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

export async function postSRTResult({
  cognitiveSession,
  score,
  reactionAvgMs,
  reactionList,
}: {
  cognitiveSession: number;
  score: number;
  reactionAvgMs: number;
  reactionList: number[];
}) {
  try {
    const payload = {
      cognitive_session: cognitiveSession,
      score,
      reaction_avg_ms: reactionAvgMs,
      reaction_list: reactionList.join(','), // 서버가 문자열을 요구
    };

    console.log('데이터 전송', payload);

    const response = await apiClient.post(
      'api/cognitive-statistics/result/srt/',
      payload,
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error('에러:', axiosError.response?.data || axiosError.message);

    Toast.show({
      type: 'error',
      text1: '점수 전송 실패',
      text2: axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
    });
    return null;
  }
}

export async function postSymbolResult({
  cognitiveSession,
  score,
  symbolCorrect,
  symbolAccuracy,
}: {
  cognitiveSession: number;
  score: number;
  symbolCorrect: number;
  symbolAccuracy: number;
}) {
  try {
    const payload = {
      cognitive_session: cognitiveSession,
      score,
      symbol_correct: symbolCorrect,
      symbol_accuracy: symbolAccuracy,
    };

    console.log('데이터 전송', payload);

    const response = await apiClient.post(
      'api/cognitive-statistics/result/symbol/',
      payload,
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error('에러:', axiosError.response?.data || axiosError.message);

    Toast.show({
      type: 'error',
      text1: '점수 전송 실패',
      text2: axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
    });
    return null;
  }
}

export async function postPatternResult({
  cognitiveSession,
  score,
  patternCorrect,
  patternTimeSec,
}: {
  cognitiveSession: number;
  score: number;
  patternCorrect: number;
  patternTimeSec: number;
}) {
  try {
    const payload = {
      cognitive_session: cognitiveSession,
      score,
      pattern_correct: patternCorrect,
      pattern_time_sec: patternTimeSec,
    };

    console.log('데이터 전송', payload);

    const response = await apiClient.post(
      'api/cognitive-statistics/result/pattern/',
      payload,
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error('에러:', axiosError.response?.data || axiosError.message);

    Toast.show({
      type: 'error',
      text1: '점수 전송 실패',
      text2: axiosError.response?.data?.message || '서버 오류가 발생했습니다.',
    });
    return null;
  }
}
