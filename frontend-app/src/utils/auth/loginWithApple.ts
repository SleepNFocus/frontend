import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiClient } from '@/services/axios';
import { useAuthStore } from '@/store/authStore';

interface UserInfo {
  id: number;
  email: string;
  given_name?: string;
  family_name?: string;
  image_url: string;
  has_completed_onboarding: boolean;
}

interface AppleLoginResponse {
  access: string;
  refresh: string;
  user: UserInfo;
}

type AppleLoginResult =
  | { success: true; user: UserInfo }
  | { success: false; message: string };

export const loginWithAppleCode = async (
  authorizationCode: string,
  fullName?: { givenName?: string; familyName?: string },
): Promise<AppleLoginResult> => {
  try {
    const client = await getApiClient();

    const response = await client.post<AppleLoginResponse>(
      `/users/social-login/`,
      {
        provider: 'apple',
        code: authorizationCode,
        ...(fullName && {
          name: `${fullName.givenName ?? ''} ${fullName.familyName ?? ''}`.trim() || undefined,
        }),
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

    return { success: true, user };
  } catch (err) {
    console.error('Apple 로그인 실패:', err);
    return { success: false, message: '로그인에 실패했습니다.' };
  }
};
