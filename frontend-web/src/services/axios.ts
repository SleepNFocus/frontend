import axios from 'axios';

export const getApiClient = () => {
  const AUTH_TOKEN = localStorage.getItem('accessToken');
  return axios.create({
    baseURL: 'https://www.dev.focusz.site/api/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...(AUTH_TOKEN ? { 'Authorization': `Bearer ${AUTH_TOKEN}` } : {}),
    },
  });
};