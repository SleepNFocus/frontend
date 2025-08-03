import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/store/authStore';

const BASE_URL = 'https://www.dev.focusz.site/api';

export const logoutUser = async (): Promise<void> => {
  const resetAuth = useAuthStore.getState().resetAuth;

  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshTokenRaw = await AsyncStorage.getItem('refreshToken');

    if (!refreshTokenRaw) {
      throw new Error('No refresh token found');
    }

    const refreshToken = refreshTokenRaw.trim();

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(
      `${BASE_URL}/users/logout/`,
      {refresh: refreshToken,},
      {
        headers,
        withCredentials: true, 
      }
    );

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