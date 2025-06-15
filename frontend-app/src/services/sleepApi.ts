import { SleepRecordData } from '@/app/types/sleep';
import { API_CONFIG, getDefaultHeaders, API_ENDPOINTS } from '@/config/api';

export const saveSleepRecord = async (recordData: SleepRecordData) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SLEEP_RECORD}/`, {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify({
        date: recordData.selectedDate,
        sleep_duration: recordData.sleepDuration,
        subjective_quality: parseInt(recordData.sleepQuality),
        sleep_latency: parseInt(recordData.fallAsleepTime),
        wake_count: parseInt(recordData.nightWakeCount),
        disturb_factors: recordData.sleepDisruptors,
        memo: "앱에서 기록됨"
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API 응답:', data); 

    return { success: true, data };

  } catch (error) {
    console.error('API 호출 오류:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.' 
    };
  }
};

export const getSleepRecord = async (recordId: number) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SLEEP_RECORD}/${recordId}/`, {
      method: 'GET',
      headers: getDefaultHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('GET 응답:', data);
    
    return { success: true, data };

  } catch (error) {
    console.error('GET API 호출 오류:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '데이터를 불러오는데 실패했습니다.' 
    };
  }
};

export const updateSleepRecord = async (recordId: number, updateData: Partial<SleepRecordData>) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SLEEP_RECORD}/${recordId}/`, {
      method: 'PATCH',
      headers: getDefaultHeaders(),
      body: JSON.stringify({
        ...(updateData.selectedDate && { date: updateData.selectedDate }),
        ...(updateData.sleepDuration && { sleep_duration: parseInt(updateData.sleepDuration) }),
        ...(updateData.sleepQuality && { subjective_quality: parseInt(updateData.sleepQuality) }),
        ...(updateData.fallAsleepTime && { sleep_latency: parseInt(updateData.fallAsleepTime) }),
        ...(updateData.nightWakeCount && { wake_count: parseInt(updateData.nightWakeCount) }),
        ...(updateData.sleepDisruptors && { disturb_factors: updateData.sleepDisruptors }),
        memo: "앱에서 수정됨"
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('PATCH 응답:', data);
    
    return { success: true, data };

  } catch (error) {
    console.error('PATCH API 호출 오류:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '수정 중 오류가 발생했습니다.' 
    };
  }
};