import axios from 'axios';

const KAKAO_REST_API_KEY = '8629425abad5e70252adc18f2d0098a5';
const REDIRECT_URI = 'https://dev.focuz.site/oauth/callback';

interface KakaoTokenResponse {
  access_token: string;
}

export const getAccessTokenFromKakao = async (code: string): Promise<string> => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', KAKAO_REST_API_KEY);
  params.append('redirect_uri', REDIRECT_URI); // 반드시 카카오 개발자 콘솔과 일치해야 함
  params.append('code', code);

  try {
    const response = await axios.post<KakaoTokenResponse>(
      'https://kauth.kakao.com/oauth/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data.access_token;
  } catch (err) {
    console.error('❗ Kakao 토큰 요청 실패:', err);
    throw new Error('카카오 토큰 발급 실패');
  }
};
