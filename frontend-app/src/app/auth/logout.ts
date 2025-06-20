import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/store/authStore';

const BASE_URL = 'https://www.dev.focusz.site/api';

export const logoutUser = async (): Promise<void> => {
  const resetAuth = useAuthStore.getState().resetAuth;
  console.log('[logoutUser]');

  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshTokenRaw = await AsyncStorage.getItem('refreshToken');

    if (!refreshTokenRaw) {
      console.warn('저장된 refreshToken 없음 → 강제 로그아웃 처리');
      throw new Error('No refresh token found');
    }

    const refreshToken = refreshTokenRaw.trim();

    console.log(' 저장된 AccessToken:', accessToken);
    console.log('저장된 RefreshToken:', refreshToken);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    console.log('요청 헤더:', headers);

    const response = await axios.post(
      `${BASE_URL}/users/logout/`,
      {refresh: refreshToken,},
      {
        headers,
        withCredentials: true, 
      }
    );

    console.log('로그아웃 응답 상태:', response.status);
    console.log('응답 데이터:', response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        `axios 에러 [${error.response?.status}]:`,
        error.response?.data ?? error.message
      );
    } else {
      console.error('기타 에러:', error);
    }
  } finally {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userInfo']);
    resetAuth();
  }
};