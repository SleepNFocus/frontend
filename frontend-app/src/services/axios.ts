import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getApiClient = async () => {
  const AUTH_TOKEN = await AsyncStorage.getItem('userToken');

  const client = axios.create({
    baseURL: 'https://www.dev.focusz.site/api/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (AUTH_TOKEN) {
    client.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  }

  // 401 에러 인터셉터 추가 (토큰 재발급)
  client.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          if (!refreshToken) throw new Error('refreshToken 없음, 다시 로그인 필요');
          const refreshRes = await axios.post('https://www.dev.focusz.site/api/users/token/refresh/', {
            refresh: refreshToken,
          });
          const newAccessToken = refreshRes.data.access;
          await AsyncStorage.setItem('userToken', newAccessToken);
          // Authorization 헤더 갱신
          client.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return client(originalRequest);
        } catch (refreshError) {
          // refreshToken도 만료되면 에러 반환
          return Promise.reject(new Error('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.'));
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
};
