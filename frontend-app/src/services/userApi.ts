import { getApiClient } from '@/services/axios';
import { useMutation } from '@tanstack/react-query';

// 소셜 로그인 및 회원가입
export const socialLogin = async (provider: 'kakao' | 'google', access_token: string) => {
  const apiClient = await getApiClient();
  const response = await apiClient.post('/users/social-login/', {
    provider,
    access_token,
  });
  return response.data;
};

// JWT 리프레시 토큰 재발급
export const refreshToken = async (refresh: string) => {
  const apiClient = await getApiClient();
  const response = await apiClient.post('/users/token/refresh/', { refresh });
  return response.data;
};

// 로그아웃 (리프레시 토큰 무효화)
export const logout = async () => {
  const apiClient = await getApiClient();
  const response = await apiClient.post('/users/logout/');
  return response.data;
};

// 회원탈퇴 및 개인정보 삭제
export const withdrawal = async () => {
  const apiClient = await getApiClient();
  const response = await apiClient.delete('/users/withdrawal/');
  return response.data;
};

// 온보딩 - 기본 정보 저장
export const saveBasicInfo = async (data: { gender: string; birth_year: number; mbti: string }) => {
  const apiClient = await getApiClient();
  const response = await apiClient.post('/users/onboarding/basic/', data);
  return response.data;
};

// 온보딩 - 직업(직무, 근무 특성) 저장
export const saveJobInfo = async (data: { cognitive_type: string; work_time_pattern: string }) => {
  const apiClient = await getApiClient();
  const response = await apiClient.post('/users/onboarding/job/', data);
  return response.data;
};

// --- React Query Hooks ---
export const useSocialLogin = () => {
  return useMutation({ mutationFn: (data: { provider: 'kakao' | 'google'; access_token: string }) => socialLogin(data.provider, data.access_token) });
};

export const useRefreshToken = () => {
  return useMutation({ mutationFn: (refresh: string) => refreshToken(refresh) });
};

export const useLogout = () => {
  return useMutation({ mutationFn: logout });
};

export const useWithdrawal = () => {
  return useMutation({ mutationFn: withdrawal });
};

export const useSaveBasicInfo = () => {
  return useMutation({ mutationFn: saveBasicInfo });
};

export const useSaveJobInfo = () => {
  return useMutation({ mutationFn: saveJobInfo });
}; 