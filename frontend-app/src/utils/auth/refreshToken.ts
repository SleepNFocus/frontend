import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://www.dev.focusz.site';

interface RefreshResponse {
  access: string;
}

export const refreshAccessToken = async (): Promise<string> => {
  try {
    const refresh = await AsyncStorage.getItem('refreshToken');

    if (!refresh) {
      throw new Error('리프레시 토큰이 없습니다.');
    }

    const response = await axios.post<RefreshResponse>(
      `${BASE_URL}/api/users/token/refresh/`,
      { refresh },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const newAccessToken = response.data.access;
    await AsyncStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (err) {
    console.error('access 토큰 재발급 실패:', err);
    throw err;
  }
};
