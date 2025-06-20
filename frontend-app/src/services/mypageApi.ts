import { getApiClient } from '@/services/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Profile,
  ProfileUpdateRequest,
  MypageMain,
  RecordsResponse,
  RecordDetail,
} from '@/types/mypage';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// 프로필 조회
export const getProfile = async (): Promise<Profile> => {
  const apiClient = await getApiClient();
  console.log('=== getProfile API 호출 ===');
  const response = await apiClient.get<Profile>('/users/mypage/profile/');
  console.log('=== getProfile API 응답 ===');
  console.log('응답 데이터:', response.data);
  console.log('응답 데이터 JSON:', JSON.stringify(response.data, null, 2));
  console.log('cognitive_type_out:', response.data.cognitive_type_out);
  console.log('cognitive_type_label:', response.data.cognitive_type_label);
  console.log('work_time_pattern_out:', response.data.work_time_pattern_out);
  console.log('work_time_pattern_label:', response.data.work_time_pattern_label);
  return response.data;
};

// 프로필 수정 (이미지 포함)
export const updateProfile = async (data: ProfileUpdateRequest & { profile_image_uri?: string }): Promise<Profile> => {
  const apiClient = await getApiClient();

  console.log('=== updateProfile API 호출 데이터 ===', JSON.stringify(data, null, 2));

  // 이미지 URI가 있는지 확인
  if (data.profile_image_uri) {
    const formData = new FormData();
    
    // 1. 텍스트 데이터를 FormData에 추가
    Object.keys(data).forEach(key => {
      // profile_image_uri는 파일로 추가할 것이므로 건너뜁니다.
      if (key === 'profile_image_uri' || data[key as keyof typeof data] === null || data[key as keyof typeof data] === undefined) {
        return;
      }
      // 모든 값을 문자열로 변환하여 추가
      formData.append(key, String(data[key as keyof typeof data]));
    });

    // 2. 이미지 파일을 FormData에 추가
    const imageUri = data.profile_image_uri;
    const uriParts = imageUri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    
    const fileObject = {
      uri: imageUri,
      type: `image/${fileType}`,
      name: `profile_image.${fileType}`,
    };

    formData.append('profile_img', fileObject as any);
    
    console.log('FormData로 프로필 업데이트 시도:', formData);

    try {
      const response = await apiClient.patch<Profile>('/users/mypage/profile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('프로필(이미지 포함) 업데이트 성공:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('프로필(이미지 포함) 업데이트 실패 상세:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }

  } else {
    // 이미지가 없는 경우, 기존처럼 JSON으로 전송
    console.log('JSON으로 프로필 업데이트 시도:', data);
    const { profile_image_uri, ...jsonData } = data; // 이미지 URI 정보는 제외

    try {
      const response = await apiClient.patch<Profile>('/users/mypage/profile/', jsonData);
      console.log('프로필(텍스트) 업데이트 성공:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('프로필(텍스트) 업데이트 실패 상세:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  }
};

// 마이페이지 메인 정보 조회
export const getMypageMain = async (): Promise<MypageMain> => {
  const apiClient = await getApiClient();
  const response = await apiClient.get<MypageMain>('/users/mypage/main/');

  console.log('메인 페이지 정보조회 API 응답:', response.data);
  return response.data;
};

// 일/주/월별 기록 조회
export const getRecords = async (period: 'day' | 'week' | 'month'): Promise<RecordsResponse> => {
  const apiClient = await getApiClient();
  const response = await apiClient.get<RecordsResponse>(`/users/mypage/records/list/?period=${period}`);
  return response.data;
};

// 선택 날짜 상세 조회
export const getRecordDetail = async (date: string): Promise<RecordDetail> => {
  const apiClient = await getApiClient();
  const response = await apiClient.get<RecordDetail>(`/users/mypage/records/${date}/detail/`);
  return response.data;
};

// React Query Hooks
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['mypageMain'] });
    },
  });
};

export const useMypageMain = () => {
  return useQuery({
    queryKey: ['mypageMain'],
    queryFn: getMypageMain,
  });
};

export const useRecords = (period: 'day' | 'week' | 'month') => {
  return useQuery({
    queryKey: ['records', period],
    queryFn: () => getRecords(period),
  });
};

export const useRecordDetail = (date: string) => {
  return useQuery({
    queryKey: ['recordDetail', date],
    queryFn: () => getRecordDetail(date),
    enabled: !!date,
  });
}; 