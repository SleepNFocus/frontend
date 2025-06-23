import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LIVE_API_URL } from '@env';
import { getApiClient } from '@/services/axios';

const BASE_URL = LIVE_API_URL;

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

export const sendKakaoLoginToken = async (
  accessToken: string,
): Promise<LoginResponse> => {
  try {
    const apiClient = await getApiClient();

    const response = await apiClient.post<{
      access: string;
      refresh: string;
      user: UserInfo;
    }>(
      `/users/social-login/`,
      {
        provider: 'kakao',
        access_token: accessToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('🔍 카카오 로그인 토큰 요청 성공후 응답 확인:', {
      access: response.data.access ? '있음' : '없음',
      refresh: response.data.refresh,
      user: response.data.user ? '있음' : '없음',
      userEmail: response.data.user?.email,
      userNickname: response.data.user?.nickname,
    });
    const { access, refresh, user: userInfo } = response.data;
    const user = adaptUserInfoToUser(userInfo);

    // 토큰 저장 키를 accessToken으로 통일
    await AsyncStorage.multiSet([
      ['accessToken', access],
      ['refreshToken', refresh],
      ['userInfo', JSON.stringify(user)],
      ['hasLoggedInBefore', 'true'],
    ]);

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
