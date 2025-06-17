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