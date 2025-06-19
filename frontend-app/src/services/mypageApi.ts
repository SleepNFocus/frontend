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