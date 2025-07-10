import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/store/authStore';
import { getApiClient } from '@/services/axios';

interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  image_url: string;
}

interface AppleLoginResponse {
  access: string;
  refresh: string;
  user: UserInfo;
}

export const loginWithAppleCode = async (authorizationCode: string) => {
  try {
    const client = await getApiClient();

    const response = await client.post<AppleLoginResponse>(
      `/users/social-login/`,
      {
        provider: 'apple',
        code: authorizationCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const { access, refresh, user } = response.data;

    await AsyncStorage.setItem('accessToken', access);
    await AsyncStorage.setItem('refreshToken', refresh);

    const { setLogin, setUser } = useAuthStore.getState();
    setLogin(true);
    setUser(user);

    return { success: true };
  } catch (err) {
    console.error('Apple 로그인 실패:', err);
    return { success: false, message: '로그인에 실패했습니다.' };
  }
};
