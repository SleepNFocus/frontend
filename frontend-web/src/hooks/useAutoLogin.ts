import { useEffect } from 'react';
import { refreshAccessToken } from '@/services/userApi';

export function useAutoLogin() {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken && refreshToken) {
      refreshAccessToken(refreshToken)
        .then(data => {
          localStorage.setItem('accessToken', data.access);
        })
        .catch(() => {
          localStorage.clear();
          window.location.href = '/';
        });
    }
  }, []);
} 