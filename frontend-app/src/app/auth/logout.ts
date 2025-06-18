import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://www.dev.focusz.site';

export const logoutUser = async (): Promise<void> => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('리프레시 토큰이 없습니다.');
    }

    const response = await axios.post(
      `${BASE_URL}/api/users/logout/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('로그아웃 성공:', response.status);


    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userInfo']);
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};
