import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 타입 선언: globalThis.forceLogoutEvent
declare global {
  var forceLogoutEvent: (() => void) | undefined;
}

export const getApiClient = async () => {
  const AUTH_TOKEN = await AsyncStorage.getItem('accessToken');

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
      console.log('=== axios 인터셉터 트리거됨 ===');
      console.log('에러 상태:', error.response?.status);
      console.log('에러 메시지:', error.message);
      
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          console.log('=== 토큰 재발급 시도 ===');
          console.log('AsyncStorage에서 refreshToken 조회 시작');
          
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          console.log('refreshToken:', refreshToken);
          console.log('refreshToken 타입:', typeof refreshToken);
          console.log('refreshToken이 null인가?', refreshToken === null);
          console.log('refreshToken이 undefined인가?', refreshToken === undefined);
          console.log('refreshToken이 빈 문자열인가?', refreshToken === '');
          
          // AsyncStorage에 저장된 모든 키 확인
          const allKeys = await AsyncStorage.getAllKeys();
          console.log('AsyncStorage에 저장된 모든 키:', allKeys);
          
          // accessToken도 확인
          const accessToken = await AsyncStorage.getItem('accessToken');
          console.log('accessToken:', accessToken);
          
          if (!refreshToken) {
            console.log('refreshToken이 없어서 에러 발생');
            throw new Error('refreshToken 없음, 다시 로그인 필요');
          }
          
          console.log('토큰 재발급 API 호출 시작');
          const refreshRes = await axios.post('https://www.dev.focusz.site/api/users/token/refresh/', {
            refresh: refreshToken,
          });
          console.log('토큰 재발급 API 응답:', refreshRes.data);
          
          const newAccessToken = refreshRes.data.access;
          console.log('새로운 accessToken:', newAccessToken);
          
          await AsyncStorage.setItem('accessToken', newAccessToken);
          client.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          console.log('토큰 재발급 성공, 원본 요청 재시도');
          return client(originalRequest);
        } catch (refreshError: any) {
          console.log('=== 토큰 재발급 실패 ===');
          console.log('refreshError:', refreshError);
          console.log('refreshError.message:', refreshError.message);
          console.log('refreshError.response?.data:', refreshError.response?.data);
          console.log('refreshError.response?.status:', refreshError.response?.status);
          
          // refreshToken도 만료되면 강제 로그아웃 및 이동
          await AsyncStorage.multiRemove([
            'userInfo',
            'accessToken',
            'refreshToken',
            'hasLoggedInBefore',
          ]);
          console.log('리프레시 토큰 만료로 인한 강제 로그아웃');
          // 전역 이벤트로 앱에서 로그인 페이지로 이동하도록 알림
          if (globalThis && typeof globalThis.forceLogoutEvent === 'function') {
            globalThis.forceLogoutEvent();
          }
          return Promise.reject(new Error('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.'));
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
};
