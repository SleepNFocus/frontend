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
    queryKey: ['/sleepRecordList', period],
    queryFn: () => fetchSleepRecordList(period),
    enabled: !!period,
    staleTime: 0, // 캐시를 즉시 삭제
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

  if (!res.data || !res.data.detail) {
    throw new Error('서버에서 수면 기록 데이터를 찾을 수 없습니다.');
  }

  return res.data.detail;
};

export const useSleepRecordDetail = (date: string) => {
  return useQuery({
    queryKey: ['sleepRecordDetail', date],
    staleTime: 0,
    queryFn: async (): Promise<SleepRecordDetail> => {
      const client = await getApiClient();
      const res = await client.get(`/users/mypage/records/${date}/detail/`);
      if (!res.data || !res.data.detail) {
        throw new Error('수면 기록이 없습니다.');
      }
      return res.data.detail;
    },
    enabled: !!date,
  });
};
