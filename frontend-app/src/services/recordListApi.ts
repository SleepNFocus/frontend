import { getApiClient } from '@/services/axios';
import { useQuery } from '@tanstack/react-query';
import { RecordListResponse } from '@/types/history';

export const fetchSleepRecordList = async (
  period: 'day' | 'week' | 'month',
): Promise<RecordListResponse> => {
  const client = await getApiClient();
  const res = await client.get(`/users/mypage/records/list/?period=${period}`);
  return res.data;
};

export const useSleepRecordList = (period: 'day' | 'week' | 'month') => {
  return useQuery<RecordListResponse>({
    queryKey: ['sleepRecordList', period],
    queryFn: () => fetchSleepRecordList(period),
    enabled: !!period,
  });
};

export interface CognitiveTestDetail {
  srt_score: number;
  srt_time_ms: number;
  symbol_score: number;
  symbol_count: number;
  symbol_accuracy: number;
  pattern_score: number;
  pattern_count: number;
  pattern_accuracy: number;
  pattern_time_ms: number;
}

export interface SleepRecordDetail {
  date: string;
  total_sleep_hours: number;
  sleep_score: number;
  cognitive_test: CognitiveTestDetail;
}

export const fetchSleepRecordDetail = async (
  date: string,
): Promise<SleepRecordDetail> => {
  const client = await getApiClient();
  const res = await client.get(`/users/mypage/records/${date}/detail/`);
  return res.data.detail; // 스웨거 응답 구조에 맞춰 `.detail` 반환
};
