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
  setLogin: (value: boolean) => {
    set({ isLogin: value });
    if (value) {
      AsyncStorage.setItem('hasLoggedInBefore', 'true').catch(() => {});
    }
  },
  setUser: (user: User) => {
    set({ user });
    AsyncStorage.setItem('userInfo', JSON.stringify(user)).catch(() => {});
  },
  resetAuth: () => {
    set({ isLogin: false, user: null });
    AsyncStorage.removeItem('userInfo').catch(() => {});
  },
}));
