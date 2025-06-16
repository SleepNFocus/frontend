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
  setLogin: (value: boolean) => void;
  setUser: (user: User) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isLogin: false,
  user: null,
  setLogin: async (value: boolean) => {
    try {
      if (value) {
        await AsyncStorage.setItem('hasLoggedInBefore', 'true');
      }
      set(() => ({ isLogin: value }));
    } catch (error) {
      console.log('로그인 상태 저장 오류:', error);
      set(() => ({ isLogin: value }));
    }
  },
  setUser: async (user: User) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      set(() => ({ user }));
    } catch (error) {
      console.log('사용자 정보 저장 오류:', error);
      set(() => ({ user }));
    }
  },
  resetAuth: async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      set(() => ({ isLogin: false, user: null }));
    } catch (error) {
      console.log('로그아웃 정보 삭제 오류:', error);
      set(() => ({ isLogin: false, user: null }));
    }
  },
}));
