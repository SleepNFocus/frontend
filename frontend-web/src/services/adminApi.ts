// 관리자 및 시스템 로그 관련 API 서비스
import { getApiClient } from '@/services/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  User,
  UserUpdateRequest,
  AdminMain,
  LogsResponse,
  LogCreateRequest,
} from '@/types/admin';

// 관리자 메인 정보 조회
export const getAdminMain = async (): Promise<AdminMain> => {
  const apiClient = getApiClient();
  const response = await apiClient.get<AdminMain>('/admin/');
  return response.data;
};

// 모든 사용자 조회
export const getAllUsers = async (): Promise<User[]> => {
  console.log('📡 getAllUsers API 호출 시작');
  const apiClient = getApiClient();
  try {
    const response = await apiClient.get<User[]>('/admin/users/');
    console.log('✅ getAllUsers API 성공:', response.data.length, '명의 사용자');
    return response.data;
  } catch (error) {
    console.error('❌ getAllUsers API 실패:', error);
    throw error;
  }
};

// 특정 사용자 조회
export const getUser = async (userId: number): Promise<User> => {
  console.log('📡 getUser API 호출 시작 - userId:', userId);
  const apiClient = getApiClient();
  try {
    const response = await apiClient.get<User>(`/admin/users/${userId}/`);
    console.log('✅ getUser API 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ getUser API 실패:', error);
    throw error;
  }
};

// 사용자 정보 수정
export const updateUser = async (updateData: UserUpdateRequest): Promise<User> => {
  console.log('📡 updateUser API 호출 시작:', updateData);
  const apiClient = getApiClient();
  try {
    const response = await apiClient.put<User>(`/admin/users/${updateData.user_id}/`, updateData);
    console.log('✅ updateUser API 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ updateUser API 실패:', error);
    throw error;
  }
};

// 사용자 삭제
export const deleteUser = async (userId: number): Promise<void> => {
  console.log('📡 deleteUser API 호출 시작 - userId:', userId);
  const apiClient = getApiClient();
  try {
    await apiClient.delete(`/admin/users/${userId}/`);
    console.log('✅ deleteUser API 성공');
  } catch (error) {
    console.error('❌ deleteUser API 실패:', error);
    throw error;
  }
};

// 관리자 로그 조회
export const getAdminLogs = async (): Promise<LogsResponse> => {
  console.log('📡 getAdminLogs API 호출 시작');
  const apiClient = getApiClient();
  try {
    const response = await apiClient.get<LogsResponse>('/admin/logs/');
    console.log('✅ getAdminLogs API 성공:', response.data.logs?.length || 0, '개의 로그');
    return response.data;
  } catch (error) {
    console.error('❌ getAdminLogs API 실패:', error);
    throw error;
  }
};

// 시스템 로그 기록
export const createLog = async (logData: LogCreateRequest): Promise<void> => {
  console.log('📡 createLog API 호출 시작:', logData);
  const apiClient = getApiClient();
  try {
    await apiClient.post('/logs/', logData);
    console.log('✅ createLog API 성공');
  } catch (error) {
    console.error('❌ createLog API 실패:', error);
    throw error;
  }
};

// React Query Hooks

/**
 * 관리자 메인 정보 조회 훅
 * @returns 관리자 대시보드의 주요 통계 정보 (총 사용자 수, 활성 사용자 수, 오늘 가입자 수, 총 로그 수)
 */
export const useAdminMain = () => {
  return useQuery({
    queryKey: ['adminMain'],
    queryFn: getAdminMain,
  });
};

/**
 * 모든 사용자 목록 조회 훅
 * @returns 전체 사용자 목록과 페이지네이션 정보
 */
export const useAllUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
};

/**
 * 특정 사용자 정보 조회 훅
 * @param userId 조회할 사용자 ID
 * @returns 해당 사용자의 상세 정보
 */
export const useUser = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};

/**
 * 사용자 정보 수정 훅
 * @returns 사용자 정보를 수정하는 mutation 함수
 * @description 성공 시 관련 캐시들을 자동으로 업데이트합니다
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data, variables) => {
      // 개별 사용자 캐시 업데이트
      queryClient.setQueryData(['user', variables.user_id], data);
      // 사용자 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // 관리자 메인 정보 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['adminMain'] });
    },
  });
};

/**
 * 사용자 삭제 훅
 * @returns 사용자를 삭제하는 mutation 함수
 * @description 성공 시 삭제된 사용자 캐시를 제거하고 관련 캐시들을 무효화합니다
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, userId) => {
      // 삭제된 사용자 캐시 제거
      queryClient.removeQueries({ queryKey: ['user', userId] });
      // 사용자 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // 관리자 메인 정보 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['adminMain'] });
    },
  });
};

/**
 * 관리자 로그 조회 훅
 * @returns 시스템 관리 로그 목록과 페이지네이션 정보
 */
export const useAdminLogs = () => {
  return useQuery({
    queryKey: ['adminLogs'],
    queryFn: getAdminLogs,
  });
};

/**
 * 시스템 로그 생성 훅
 * @returns 로그를 생성하는 mutation 함수
 */
export const useCreateLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLog,
    onSuccess: () => {
      // 로그 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['adminLogs'] });
    },
  });
}; 