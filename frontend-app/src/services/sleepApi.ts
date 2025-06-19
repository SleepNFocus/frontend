import { SleepRecordData } from '@/types/sleep';
import { getApiClient } from '@/services/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useSaveSleepRecord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (recordData: SleepRecordData) => {
      console.log('🚀 API 호출 시작:', new Date().toISOString());
      
      const qualityMapping: Record<string, number> = {
        'excellent': 5,
        'good': 4, 
        'fair': 3,
        'poor': 2,
        'very_poor': 1
      };
      
      const fallAsleepMapping: Record<string, number> = {
        'under_15': 1,
        '15_30': 2,
        'over_30': 3
      };
      
      const wakeCountMapping: Record<string, number> = {
        '0': 0,
        '1_2': 1,
        '3_more': 3
      };
      
      const convertSleepDuration = (duration: string) => {
        if (duration.includes(':')) {
          const [hours, minutes] = duration.split(':').map(part => parseInt(part.replace(/[^\d]/g, '')));
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
        memo: null
      };
      
      console.log('📤 서버로 전송할 데이터:', requestPayload);
      
      const apiClient = await getApiClient();
      const response = await apiClient.post('/sleepRecord/', requestPayload);
      
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data?.message || '저장에 실패했습니다.');
      }
      
      return response.data;
    },
    onSuccess: (data) => {
      console.log('✅ 수면 기록 저장 성공:', data);
      queryClient.invalidateQueries({ queryKey: ['sleepRecords'] });
    },
    onError: (error) => {
      console.error('❌ 수면 기록 저장 실패:', error);
    },
  });
};

export const useSleepRecord = (recordId: number) => {
  return useQuery({
    queryKey: ['sleepRecord', recordId],
    queryFn: async () => {
      const apiClient = await getApiClient();
      const response = await apiClient.get(`/sleepRecord/2/`);
      return response.data;
    },
    enabled: !!recordId, 
    staleTime: 10 * 60 * 1000, 
  });
};

export const useUpdateSleepRecord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ recordId, updateData }: { 
      recordId: number; 
      updateData: Partial<SleepRecordData> 
    }) => {
      const requestData: any = {};
      
      if (updateData.selectedDate) requestData.date = updateData.selectedDate;
      if (updateData.sleepDuration) requestData.sleep_duration = parseInt(updateData.sleepDuration);
      if (updateData.sleepQuality) requestData.subjective_quality = parseInt(updateData.sleepQuality);
      if (updateData.fallAsleepTime) requestData.sleep_latency = parseInt(updateData.fallAsleepTime);
      if (updateData.nightWakeCount) requestData.wake_count = parseInt(updateData.nightWakeCount);
      if (updateData.sleepDisruptors) requestData.disturb_factors = updateData.sleepDisruptors;
      
      requestData.memo = "앱에서 수정됨";

      const apiClient = await getApiClient();
      const response = await apiClient.patch(`/sleepRecord/${recordId}/`, requestData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      console.log('✅ 수면 기록 수정 성공:', data);
      queryClient.invalidateQueries({ queryKey: ['sleepRecord', variables.recordId] });
      queryClient.invalidateQueries({ queryKey: ['sleepRecords'] });
    },
    onError: (error) => {
      console.error('❌ 수면 기록 수정 실패:', error);
    },
  });
};