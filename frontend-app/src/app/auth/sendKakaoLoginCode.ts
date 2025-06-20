import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://www.dev.focusz.site/api';

interface UserInfo {
  user_id: number;
  social_type: 'KAKAO' | 'GOOGLE';
  social_id: string;
  nickname: string;
  email: string;
  profile_img: string | null;
  status: string;
  has_completed_onboarding: boolean;
}


export interface User {
  id: number;
  social_type: 'KAKAO' | 'GOOGLE';
  social_id: string;
  nickname: string;
  email: string;
  profile_img: string | null;
  status: string;
  has_completed_onboarding: boolean;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}


const adaptUserInfoToUser = (userInfo: UserInfo): User => ({
  id: userInfo.user_id,
  social_type: userInfo.social_type,
  social_id: userInfo.social_id,
  nickname: userInfo.nickname,
  email: userInfo.email,
  profile_img: userInfo.profile_img,
  status: userInfo.status,
  has_completed_onboarding: userInfo.has_completed_onboarding ?? false,
});

export const sendKakaoLoginCode = async (code: string): Promise<LoginResponse> => {
  try {
    console.log('=== 카카오 로그인 시작 ===');
    console.log('인가 코드:', code);
    
    const response = await axios.post<{
      access: string;
      refresh: string;
      user: UserInfo;
    }>(
      `${BASE_URL}/users/social-login/`,
      {
        provider: 'kakao',
        code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { access, refresh, user: userInfo } = response.data;
    const user = adaptUserInfoToUser(userInfo);

    console.log('=== 서버 응답 ===');
    console.log('access token:', access);
    console.log('refresh token:', refresh);
    console.log('user info:', userInfo);
    console.log('has_completed_onboarding:', user.has_completed_onboarding);

    // 토큰 저장 키를 accessToken으로 통일
    await AsyncStorage.multiSet([
      ['accessToken', access],
      ['refreshToken', refresh],
      ['userInfo', JSON.stringify(user)],
      ['hasLoggedInBefore', 'true'],
    ]);

    console.log('=== 토큰 저장 완료 ===');
    console.log('로그인 성공:', user);
    return { access, refresh, user };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('로그인 실패:', err.response?.data || err.message);
    } else {
      console.error('알 수 없는 에러:', err);
    }
    throw err;
  }
};
