import { SleepRecordData, SleepRecordApiResponse } from '@/types/sleep';
import { getApiClient } from '@/services/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useSaveSleepRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      recordData: SleepRecordData,
    ): Promise<SleepRecordApiResponse> => {
      const qualityMapping: Record<string, number> = {
        excellent: 5,
        good: 4,
        fair: 3,
        poor: 2,
        very_poor: 1,
      };

      const fallAsleepMapping: Record<string, number> = {
        under_15: 1,
        '15_30': 2,
        over_30: 3,
      };

      const wakeCountMapping: Record<string, number> = {
        '0': 0,
        '1_2': 1,
        '3_more': 3,
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

      const requestPayload = {
        date: recordData.selectedDate,
        sleep_duration: convertSleepDuration(recordData.sleepDuration),
        subjective_quality: qualityMapping[recordData.sleepQuality] || 2,
        sleep_latency: fallAsleepMapping[recordData.fallAsleepTime] || 3,
        wake_count: wakeCountMapping[recordData.nightWakeCount] || 0,
        disturb_factors: recordData.sleepDisruptors,
        memo: null,
      };

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

export const useSleepRecord = (date: string | null | undefined) => {
  return useQuery({
    queryKey: ['sleepRecord', date],
    enabled: !!date, // ✅ date 없으면 아예 실행 안 함
    queryFn: async () => {
      if (!date) return null;

      const apiClient = await getApiClient();

      try {
        const response = await apiClient.get<{
          message?: string;
          data: any; // 실제 타입 있으면 적용
        }>('/sleepRecord/', {
          params: { date },
        });

        // ✅ 백엔드에서 data: null 로 오면 그대로 넘기기
        return response.data?.data ?? null;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 204 || // 백엔드가 record 없을 때 이렇게 줄 수 있음
            error.response?.status === 404
          ) {
            return null;
          }
        }
        throw error; // 진짜 에러는 그대로 던져서 isError로 처리
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
