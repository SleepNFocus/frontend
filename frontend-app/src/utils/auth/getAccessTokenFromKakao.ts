import axios from 'axios';
import { KAKAO_REST_API_KEY, REDIRECT_URI, KAKAO_CLIENT_SECRET } from '@env';

interface KakaoTokenResponse {
  access_token: string;
}

export const getAccessTokenFromKakao = async (code: string): Promise<string> => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', KAKAO_REST_API_KEY);
  params.append('redirect_uri', REDIRECT_URI); // 반드시 카카오 개발자 콘솔과 일치해야 함
  params.append('code', code);
  params.append('client_secret', KAKAO_CLIENT_SECRET);

  // 디버깅을 위한 로그 출력
  console.log('🔍 카카오 토큰 요청 파라미터:');
  console.log('- client_id:', KAKAO_REST_API_KEY);
  console.log('- redirect_uri:', REDIRECT_URI);
  console.log('- code:', code);
  console.log('- client_secret:', KAKAO_CLIENT_SECRET ? '***' : 'undefined');

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

    console.log('✅ 카카오 토큰 요청 성공:', response.data);
    return response.data.access_token;
  } catch (err) {
    console.error('❗ Kakao 토큰 요청 실패:', err);
    
    // Axios 오류인 경우 응답 데이터도 출력
    if (axios.isAxiosError(err)) {
      console.error('📋 응답 상태:', err.response?.status);
      console.error('📋 응답 데이터:', err.response?.data);
      console.error('📋 요청 URL:', err.config?.url);
      console.error('📋 요청 데이터:', err.config?.data);
    }
    
    throw new Error('카카오 토큰 발급 실패');
  }
};
