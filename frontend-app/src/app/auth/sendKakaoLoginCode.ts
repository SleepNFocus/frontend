import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://www.dev.focusz.site';

interface UserInfo {
  user_id: number;
  social_type: 'KAKAO' | 'GOOGLE';
  social_id: string;
  nickname: string;
  email: string;
  profile_img: string | null;
  status: string;
}

export interface User {
  id: number;
  social_type: 'KAKAO' | 'GOOGLE';
  social_id: string;
  nickname: string;
  email: string;
  profile_img: string | null;
  status: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

// 변환 함수
const adaptUserInfoToUser = (userInfo: UserInfo): User => ({
  id: userInfo.user_id,
  social_type: userInfo.social_type,
  social_id: userInfo.social_id,
  nickname: userInfo.nickname,
  email: userInfo.email,
  profile_img: userInfo.profile_img,
  status: userInfo.status,
});

export const sendKakaoLoginCode = async (
  code: string,
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<{
      access: string;
      refresh: string;
      user: UserInfo;
    }>(
      `${BASE_URL}/api/users/social-login/`,
      {
        provider: 'kakao',
        code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const { access, refresh, user: userInfo } = response.data;
    const user = adaptUserInfoToUser(userInfo);

    await AsyncStorage.multiSet([
      ['accessToken', access],
      ['refreshToken', refresh],
      ['userInfo', JSON.stringify(user)],
    ]);

    console.log('✅ 로그인 성공:', user);
    return { access, refresh, user };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('❌ 로그인 실패:', err.response?.data || err.message);
    } else {
      console.error('❌ 알 수 없는 에러:', err);
    }
    throw err;
  }
};
