import { SleepRecordData } from '@/app/types/sleep';
import { apiClient } from '@/config/axios';

export const saveSleepRecord = async (recordData: SleepRecordData) => {
  try {
    const response = await apiClient.post('/sleepRecord/', {
      date: recordData.selectedDate,
      sleep_duration: parseInt(recordData.sleepDuration),
      subjective_quality: parseInt(recordData.sleepQuality),
      sleep_latency: parseInt(recordData.fallAsleepTime),
      wake_count: parseInt(recordData.nightWakeCount),
      disturb_factors: recordData.sleepDisruptors,
      memo: "앱에서 기록됨"
    });

    return { success: true, data: response.data };

  } catch (error: any) {
    console.error('수면 기록 저장 실패:', error);
    
    if (error.response) {
      return {
        success: false,
        error: error.response.data?.message || error.response.data?.detail || '서버 오류가 발생했습니다.'
      };
    } else if (error.request) {
      return {
        success: false,
        error: '네트워크 연결을 확인해주세요.'
      };
    } else {
      return {
        success: false,
        error: '알 수 없는 오류가 발생했습니다.'
      };
    }
  }
};

export const getSleepRecord = async (recordId: number) => {
  try {
    const response = await apiClient.get(`/sleepRecord/${recordId}/`);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('수면 기록 조회 실패:', error);
    return {
      success: false,
      error: error.response?.data?.detail || '기록을 불러오는데 실패했습니다.'
    };
  }
};

export const updateSleepRecord = async (recordId: number, updateData: Partial<SleepRecordData>) => {
  try {
    const requestData: any = {};
    
    if (updateData.selectedDate) requestData.date = updateData.selectedDate;
    if (updateData.sleepDuration) requestData.sleep_duration = parseInt(updateData.sleepDuration);
    if (updateData.sleepQuality) requestData.subjective_quality = parseInt(updateData.sleepQuality);
    if (updateData.fallAsleepTime) requestData.sleep_latency = parseInt(updateData.fallAsleepTime);
    if (updateData.nightWakeCount) requestData.wake_count = parseInt(updateData.nightWakeCount);
    if (updateData.sleepDisruptors) requestData.disturb_factors = updateData.sleepDisruptors;
    
    requestData.memo = "앱에서 수정됨";

    const response = await apiClient.patch(`/sleepRecord/${recordId}/`, requestData);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('수면 기록 수정 실패:', error);
    return {
      success: false,
      error: error.response?.data?.detail || '기록 수정에 실패했습니다.'
    };
  }
};