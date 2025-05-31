import { create } from 'zustand';

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
  setLogin: value => set(() => ({ isLogin: value })),
  setUser: user => set(() => ({ user })),
  resetAuth: () => set(() => ({ isLogin: false, user: null })),
}));
