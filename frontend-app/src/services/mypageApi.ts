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
  const response = await apiClient.get<Profile>('/users/mypage/profile/');
  return response.data;
};

// 프로필 수정
export const updateProfile = async (data: ProfileUpdateRequest): Promise<Profile> => {
  const apiClient = await getApiClient();
  
  console.log('=== updateProfile API 디버깅 ===');
  console.log('요청 데이터:', data);
  console.log('요청 데이터 타입:', typeof data);
  console.log('요청 데이터 JSON:', JSON.stringify(data, null, 2));
  
  try {
    const response = await apiClient.patch<Profile>('/users/mypage/profile/', data);
    console.log('프로필 업데이트 성공:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('프로필 업데이트 실패 상세:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

// 마이페이지 메인 정보 조회
export const getMypageMain = async (): Promise<MypageMain> => {
  const apiClient = await getApiClient();
  const response = await apiClient.get<MypageMain>('/users/mypage/main/');
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

// 프로필 이미지 업로드
export const uploadProfileImage = async (imageUri: string): Promise<Profile> => {
  const apiClient = await getApiClient();
  
  // FormData 생성
  const formData = new FormData();
  
  // 파일명 생성 (확장자 추출)
  const uriParts = imageUri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  
  formData.append('profile_image', {
    uri: imageUri,
    type: `image/${fileType}`,
    name: `profile_image.${fileType}`,
  } as any);
  
  console.log('업로드할 이미지 URI:', imageUri);
  console.log('업로드할 파일 타입:', fileType);
  
  // PATCH 메서드로 프로필 수정 API 사용
  const response = await apiClient.patch<Profile>('/users/mypage/profile/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  console.log('이미지 업로드 API 응답:', response.data);
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

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['mypageMain'] });
    },
  });
}; 