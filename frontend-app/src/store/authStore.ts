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
      // [정리 필요] console.log 등 디버깅 코드는 배포 전 반드시 제거해야 함
      // 이유: 불필요한 콘솔 출력은 성능 저하, 보안 이슈, 로그 오염의 원인이 됨
      set(() => ({ isLogin: value }));
    }
  },
  setUser: async (user: User) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      set(() => ({ user }));
    } catch (error) {
      // [정리 필요] console.log 등 디버깅 코드는 배포 전 반드시 제거해야 함
      // 이유: 불필요한 콘솔 출력은 성능 저하, 보안 이슈, 로그 오염의 원인이 됨
      set(() => ({ user }));
    }
  },
  resetAuth: async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      set(() => ({ isLogin: false, user: null }));
    } catch (error) {
      // [정리 필요] console.log 등 디버깅 코드는 배포 전 반드시 제거해야 함
      // 이유: 불필요한 콘솔 출력은 성능 저하, 보안 이슈, 로그 오염의 원인이 됨
      set(() => ({ isLogin: false, user: null }));
    }
  },
}));
