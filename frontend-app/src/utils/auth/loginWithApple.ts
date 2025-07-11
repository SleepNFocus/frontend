import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiClient } from '@/services/axios';
import { useAppleAuthStore } from '@/store/appleAuthStore';

interface UserInfo {
  id: number;
  email: string;
  full_name: string;
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

    const { setLogin, setUser } = useAppleAuthStore.getState();
    setLogin(true);
    setUser(user);

    return { success: true };
  } catch (err) {
    console.error('Apple 로그인 실패:', err);
    return { success: false, message: '로그인에 실패했습니다.' };
  }
};
