import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getApiClient = async () => {
  const AUTH_TOKEN = await AsyncStorage.getItem('accessToken');
  const apiClient = axios.create({
    baseURL: 'https://www.dev.focusz.site/api/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...(AUTH_TOKEN ? { 'Authorization': `Bearer ${AUTH_TOKEN}` } : {}),
    },
  });

  // 요청 인터셉터: 항상 최신 토큰을 헤더에 추가
  apiClient.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 응답 인터셉터: 401/403 에러 시 토큰 삭제 등 후처리
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        await AsyncStorage.removeItem('accessToken');
        // TODO: 필요시 알림, 네비게이션 등 추가
        // 예: Alert.alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};