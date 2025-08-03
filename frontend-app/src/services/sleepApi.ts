import { SleepRecordData, SleepRecordApiResponse } from '@/types/sleep';
import { getApiClient } from '@/services/axios';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import axios from 'axios';

//임시로 생성 - (혜원)
export type SleepRecord = {
  created_at: string; // ISO date string
  updated_at: string;
  date: string; // YYYY-MM-DD
  disturb_factors: string[]; // 예: ['electronics', 'noise']
  memo: string | null;
  score: number;
  sleep_duration: number; // 분 단위?
  sleep_latency: number; // 잠드는 데 걸린 시간?
  subjective_quality: number; // 1~5 등급?
  wake_count: number;
};

export const useSaveSleepRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      recordData: SleepRecordData,
    ): Promise<SleepRecordApiResponse> => {
      const qualityMapping: Record<string, number> = {
        excellent: 4,
        good: 3,
        fair: 2,
        poor: 1,
        very_poor: 0,
      };

      const fallAsleepMapping: Record<string, number> = {
        under_15: 0,
        '15_30': 1,
        over_30: 2,
      };

      const wakeCountMapping: Record<string, number> = {
        '0': 0,
        '1_2': 1,
        '3_more': 2,
      };

      const convertSleepDuration = (duration: string) => {
        if (duration.includes(':')) {
          const [hours, minutes] = duration
            .split(':')
            .map(part => parseInt(part.replace(/[^\d]/g, '')));
          return (hours || 0) * 60 + (minutes || 0);
        }
        return parseInt(duration) || 0;
      };
      console.log(
        'fall asleep time',
        recordData.fallAsleepTime,
        fallAsleepMapping[recordData.fallAsleepTime],
      );
      const requestPayload = {
        date: recordData.selectedDate,
        sleep_duration: convertSleepDuration(recordData.sleepDuration),
        subjective_quality: qualityMapping[recordData.sleepQuality] ?? 2,
        sleep_latency: fallAsleepMapping[recordData.fallAsleepTime] ?? 0,
        wake_count: wakeCountMapping[recordData.nightWakeCount] ?? 0,
        disturb_factors: recordData.sleepDisruptors,
        memo: null,
        //score: recordData.totalScore,
      };
      console.log('출력', requestPayload);

      const apiClient = await getApiClient();
      const response = await apiClient.post<SleepRecordApiResponse>(
        '/sleepRecord/',
        requestPayload,
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('저장에 실패했습니다.');
      }

      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sleepRecords'] });
      queryClient.invalidateQueries({
        queryKey: ['sleepRecord', variables.selectedDate],
      });
    },
    onError: error => {},
  });
};

// 날짜 기반으로 수면 기록 조회

export const useSleepRecord = (
  date: string | null | undefined,
): UseQueryResult<SleepRecordApiResponse | null> => {
  return useQuery({
    queryKey: ['sleepRecord', date],
    enabled: !!date,
    queryFn: async (): Promise<SleepRecordApiResponse | null> => {
      if (!date) return null;

      const apiClient = await getApiClient();

      const url = `/sleepRecord/?date=${date}`;

      try {
        const response = await apiClient.get(url);

        //return response.data?.data ?? null;
        return response.data ?? null;
      } catch (error: unknown) {
        console.log(error);
        throw error;
      }
    },
  });
};

export const useUpdateSleepRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      date,
      updateData,
    }: {
      date: string;
      updateData: Partial<SleepRecordData>;
    }): Promise<SleepRecordApiResponse> => {
      const requestData: any = {};

      if (updateData.selectedDate) requestData.date = updateData.selectedDate;
      if (updateData.sleepDuration)
        requestData.sleep_duration = parseInt(updateData.sleepDuration);
      if (updateData.sleepQuality)
        requestData.subjective_quality = parseInt(updateData.sleepQuality);
      if (updateData.fallAsleepTime)
        requestData.sleep_latency = parseInt(updateData.fallAsleepTime);
      if (updateData.nightWakeCount)
        requestData.wake_count = parseInt(updateData.nightWakeCount);
      if (updateData.sleepDisruptors)
        requestData.disturb_factors = updateData.sleepDisruptors;

      requestData.memo = '앱에서 수정됨';

      const apiClient = await getApiClient();
      const response = await apiClient.patch<SleepRecordApiResponse>(
        `/sleepRecord?date=${date}`,
        requestData,
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['sleepRecord', variables.date],
      });
      queryClient.invalidateQueries({ queryKey: ['sleepRecords'] });
    },
    onError: error => {},
  });
};
