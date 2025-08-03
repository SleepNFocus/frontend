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

interface RawUser {
  user_id: number;
  email: string;
  social_type: string;
  social_id: string;
  nickname: string;
  profile_img: string | null;
  status: string;
  has_completed_onboarding: boolean;
}

interface AppleLoginResponse {
  access: string;
  refresh: string;
  user: RawUser;
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

    // 이름 처리: Apple에서 fullName이 없는 경우 빈 문자열로 처리
    const name = fullName
      ? `${fullName.givenName ?? ''} ${fullName.familyName ?? ''}`.trim()
      : '정보 처리 오류';

    const response = await client.post<AppleLoginResponse>(
      `/users/social-login/`,
      {
        provider: 'apple',
        code: authorizationCode,
        name: name,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const { access, refresh, user: rawUser } = response.data;

    const user: UserInfo = {
      id: rawUser.user_id,
      email: rawUser.email,
      given_name: fullName?.givenName ?? '',
      family_name: fullName?.familyName ?? '',
      image_url: rawUser.profile_img ?? '', // <-- 여기 수정
      has_completed_onboarding: rawUser.has_completed_onboarding,
    };

    await AsyncStorage.setItem('accessToken', access);
    await AsyncStorage.setItem('refreshToken', refresh);
    await AsyncStorage.setItem('userInfo', JSON.stringify(user));

    const { setLogin, setUser } = useAuthStore.getState();
    setLogin(true);
    setUser(user);

    return { success: true, user };
  } catch (err) {
    console.error('Apple 로그인 실패:', err);
    return { success: false, message: '로그인에 실패했습니다.' };
  }
};
