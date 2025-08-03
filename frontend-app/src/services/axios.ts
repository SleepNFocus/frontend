import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/store/authStore';

// 타입 선언: globalThis.forceLogoutEvent
declare global {
  var forceLogoutEvent: (() => void) | undefined;
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const getApiClient = async () => {
  const AUTH_TOKEN = await AsyncStorage.getItem('accessToken');

  const client = axios.create({
    baseURL: 'https://www.dev.focusz.site/api',
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
      // 401 에러 (토큰 만료 등) 처리
      if (error.response?.status === 401) {
        const originalRequest = error.config;

        // isRetrying 플래그 확인
        if (originalRequest && !(originalRequest as any)._isRetry) {
          (originalRequest as any)._isRetry = true;

          try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            const accessToken = await AsyncStorage.getItem('accessToken');

            if (!refreshToken) {
              const allKeys = await AsyncStorage.getAllKeys();

              throw new Error('리프레시 토큰이 없습니다.');
            }

            const refreshRes = await axios.post(
              'https://www.dev.focusz.site/api/users/token/refresh/',
              { refresh: refreshToken },
            );

            const newAccessToken = refreshRes.data.access;

            await AsyncStorage.setItem('accessToken', newAccessToken);
            client.defaults.headers.common['Authorization'] =
              `Bearer ${newAccessToken}`;
            if (originalRequest.headers)
              originalRequest.headers['Authorization'] =
                `Bearer ${newAccessToken}`;

            return client(originalRequest);
          } catch (refreshError: any) {
            // 리프레시 토큰 만료 (401) 또는 유효하지 않은 토큰 (400)
            if (
              refreshError.response?.status === 401 ||
              refreshError.response?.status === 400
            ) {
              const { resetAuth } = useAuthStore.getState();
              await resetAuth();

              // 전역 이벤트로 앱에서 로그인 페이지로 이동하도록 알림
              if (
                globalThis &&
                typeof globalThis.forceLogoutEvent === 'function'
              ) {
                globalThis.forceLogoutEvent();
              }
              return Promise.reject(
                new Error(
                  '로그인 세션이 만료되었습니다. 다시 로그인 해주세요.',
                ),
              );
            }
            return Promise.reject(refreshError);
          }
        }
      }
      return Promise.reject(error);
    },
  );

  return client;
};
