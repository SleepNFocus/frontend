import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: number;
  email: string;
  nickname: string;
  image_url?: string;
}

interface AuthState {
  isLogin: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setLogin: (value: boolean) => void;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  resetAuth: () => void;
  loadTokensFromStorage: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  isLogin: false,
  user: null,
  accessToken: null,
  refreshToken: null,

  setLogin: async (value: boolean) => {
    try {
      if (value) {
        await AsyncStorage.setItem('hasLoggedInBefore', 'true');
      }
      set(() => ({ isLogin: value }));
    } catch (error) {
      set(() => ({ isLogin: value }));
    }
  },

  setUser: async (user: User) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      set(() => ({ user }));
    } catch (error) {
      set(() => ({ user }));
    }
  },

  setAccessToken: async (token: string) => {
    try {
      await AsyncStorage.setItem('accessToken', token);
      set(() => ({ accessToken: token }));
    } catch (error) {
      set(() => ({ accessToken: token }));
    }
  },

  setRefreshToken: async (token: string) => {
    try {
      await AsyncStorage.setItem('refreshToken', token);
      set(() => ({ refreshToken: token }));
    } catch (error) {
      set(() => ({ refreshToken: token }));
    }
  },

  resetAuth: async () => {
    try {
      await AsyncStorage.multiRemove([
        'userInfo',
        'accessToken',
        'refreshToken',
        'hasLoggedInBefore',
      ]);
      set(() => ({
        isLogin: false,
        user: null,
        accessToken: null,
        refreshToken: null,
      }));
    } catch (error) {
      set(() => ({
        isLogin: false,
        user: null,
        accessToken: null,
        refreshToken: null,
      }));
    }
  },

  loadTokensFromStorage: async () => {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        AsyncStorage.getItem('accessToken'),
        AsyncStorage.getItem('refreshToken'),
      ]);

      set(() => ({
        accessToken: accessToken ?? null,
        refreshToken: refreshToken ?? null,
      }));

      console.log('🪄 Zustand에 토큰 복원 완료');
    } catch (error) {
      console.error('🛑 토큰 복원 실패:', error);
    }
  },
}));