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
  const response = await apiClient.patch<Profile>('/users/mypage/profile/', data);
  return response.data;
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
export const uploadProfileImage = async (imageUri: string): Promise<{ profile_image: string }> => {
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
  
  // Content-Type을 multipart/form-data로 설정
  const response = await apiClient.post('/users/mypage/profile/image/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
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