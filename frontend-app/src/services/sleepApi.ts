import { SleepRecordData, SleepRecordApiResponse } from '@/types/sleep';
import { getApiClient } from '@/services/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useSaveSleepRecord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (recordData: SleepRecordData): Promise<SleepRecordApiResponse> => {
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
      const response = await apiClient.post<SleepRecordApiResponse>('/sleepRecord/', requestPayload);
      
     if (response.status !== 200 && response.status !== 201) {
        throw new Error('저장에 실패했습니다.');
      }
      
      return response.data;
    },
    onSuccess: (data, variables) => {
      console.log('✅ 수면 기록 저장 성공:', data);
      console.log('✅ 저장된 날짜:', variables.selectedDate);
      
      // 전체 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['sleepRecords'] });
      
      // 저장된 날짜의 캐시 무효화하여 GET 요청 다시 실행
      queryClient.invalidateQueries({ queryKey: ['sleepRecord', variables.selectedDate] });
    },
    onError: (error) => {
      console.error('❌ 수면 기록 저장 실패:', error);
    },
  });
};

// 날짜 기반으로 수면 기록 조회
export const useSleepRecord = (date: string) => {
  console.log('🔍 useSleepRecord 훅 호출됨');
  console.log('  - 받은 date 파라미터:', JSON.stringify(date));
  console.log('  - enabled 조건 결과:', !!date && date !== '');
  
  return useQuery({
    queryKey: ['sleepRecord', date],
    queryFn: async (): Promise<SleepRecordApiResponse> => {
      console.log('🚀 queryFn 실행! GET 요청 시작 - date:', date);
      
      try {
        const apiClient = await getApiClient();
        
        // 🔍 토큰 디버깅
        console.log('🔍 Authorization 헤더:', apiClient.defaults.headers.common['Authorization']);
        
        const response = await apiClient.get<SleepRecordApiResponse>(`sleepRecord?date=${date}`);
        
        console.log('✅ GET 요청 성공:', response.status);
        console.log('🔍 응답 데이터:', response.data);
        
        return response.data;
      } catch (error: any) {
        console.log('❌ GET 요청 실패:', error);
        console.log('❌ 에러 상태:', error.response?.status);
        console.log('❌ 에러 데이터:', error.response?.data);
        
        throw error;
      }
    },
    enabled: !!date && date !== '',
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};

export const useUpdateSleepRecord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ date, updateData }: { 
      date: string; 
      updateData: Partial<SleepRecordData> 
    }): Promise<SleepRecordApiResponse> => {
      const requestData: any = {};
      
      if (updateData.selectedDate) requestData.date = updateData.selectedDate;
      if (updateData.sleepDuration) requestData.sleep_duration = parseInt(updateData.sleepDuration);
      if (updateData.sleepQuality) requestData.subjective_quality = parseInt(updateData.sleepQuality);
      if (updateData.fallAsleepTime) requestData.sleep_latency = parseInt(updateData.fallAsleepTime);
      if (updateData.nightWakeCount) requestData.wake_count = parseInt(updateData.nightWakeCount);
      if (updateData.sleepDisruptors) requestData.disturb_factors = updateData.sleepDisruptors;
      
      requestData.memo = "앱에서 수정됨";

      const apiClient = await getApiClient();
      const response = await apiClient.patch<SleepRecordApiResponse>(`/sleepRecord?date=${date}`, requestData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      console.log('✅ 수면 기록 수정 성공:', data);
      queryClient.invalidateQueries({ queryKey: ['sleepRecord', variables.date] });
      queryClient.invalidateQueries({ queryKey: ['sleepRecords'] });
    },
    onError: (error) => {
      console.error('❌ 수면 기록 수정 실패:', error);
    },
  });
};