import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuthStore } from '@/store/authStore';

const BASE_URL = 'https://www.dev.focusz.site';

export const withdrawUser = async (): Promise<void> => {
  console.log('[withdrawUser] 함수 시작');

 
  const token = await AsyncStorage.getItem('accessToken');
  console.log('accessToken (from AsyncStorage):', token);

  if (!token) {
    console.error('토큰 없음 → 로그아웃 처리 필요');
    throw new Error('AccessToken이 없습니다.');
  }

  try {
    const response = await axios.delete(`${BASE_URL}/api/users/withdrawal/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('응답 상태코드:', response.status);

    if (response.status === 200 || response.status === 204) {
      console.log('회원탈퇴 성공!');
    } else {
      throw new Error(`회원탈퇴 실패: 예상하지 못한 응답 코드(${response.status})`);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('axios 에러:', error.response?.status, error.response?.data);
    } else {
      console.error('기타 에러:', error.message);
    }
    throw new Error('회원탈퇴 요청 중 문제가 발생했습니다.');
  }
};