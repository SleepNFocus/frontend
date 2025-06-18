import axios from 'axios';

// 임시 토큰 (실제로는 authStore에서 가져와야 함)
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // 실제 토큰으로 변경

export const apiClient = axios.create({
  baseURL: 'https://www.dev.focusz.site/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AUTH_TOKEN}`,
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 토큰이 만료되었거나 없을 때 처리
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 에러 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      // 로그인 페이지로 리다이렉트 로직
      console.log('Unauthorized access');
    }
    return Promise.reject(error);
  }
); 