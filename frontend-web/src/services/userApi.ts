import { getApiClient } from '@/services/axios';
import { useMutation } from '@tanstack/react-query';
import { SocialLoginRequest, SocialLoginResponse } from '@/types/auth';
import axios from 'axios';

// 카카오 인증 코드를 액세스 토큰으로 교환
const exchangeKakaoCodeForToken = async (code: string): Promise<string> => {
  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  
  if (!KAKAO_CLIENT_ID) {
    throw new Error('카카오 클라이언트 ID가 설정되지 않았습니다.');
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', KAKAO_CLIENT_ID);
  params.append('redirect_uri', KAKAO_REDIRECT_URI || 'http://localhost:5173/oauth/kakao');
  params.append('code', code);

  try {
    console.log('🔄 카카오 토큰 교환 시작');
    const response = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ 카카오 토큰 교환 실패:', errorData);
      throw new Error(`카카오 토큰 교환 실패: ${errorData.error_description || errorData.error}`);
    }

    const data = await response.json();
    console.log('✅ 카카오 토큰 교환 성공');
    return data.access_token;
  } catch (error) {
    console.error('❌ 카카오 토큰 교환 중 오류:', error);
    throw error;
  }
};

// 소셜 로그인 API 호출 - 디버깅 강화
export const socialLogin = async ({ provider, code }: SocialLoginRequest): Promise<SocialLoginResponse> => {
  const apiClient = getApiClient();
  
  try {
    console.log('🚀 백엔드 소셜 로그인 API 호출');
    
    let accessToken: string;
    
    if (provider === 'kakao') {
      // 카카오의 경우 인증 코드를 액세스 토큰으로 교환
      accessToken = await exchangeKakaoCodeForToken(code);
      console.log('📤 요청 데이터:', { 
        provider, 
        access_token: accessToken.substring(0, 20) + '...',  // 토큰 일부만 로그
        url: '/users/social-login/' 
      });
    } else {
      // 구글의 경우 code를 그대로 사용 (구현 예정)
      throw new Error('구글 로그인은 아직 구현되지 않았습니다.');
    }
    
    const response = await apiClient.post<SocialLoginResponse>('/users/social-login/', {
      provider,
      access_token: accessToken
    });
    
    console.log('📡 API 응답 상태:', response.status);
    console.log('📄 API 응답 헤더:', response.headers);
    console.log('📦 API 응답 데이터:', response.data);
    
    // 응답 데이터 구조 검증
    const { access, refresh, user } = response.data;
    
    if (!access || !refresh || !user) {
      console.error('❌ 응답 데이터 구조 오류:', {
        access: access ? '✅' : '❌',
        refresh: refresh ? '✅' : '❌', 
        user: user ? '✅' : '❌'
      });
      throw new Error('서버 응답 형식이 올바르지 않습니다.');
    }
    
    console.log('✅ 응답 데이터 검증 성공');
    console.log('👤 사용자 정보:', {
      user_id: user.user_id,
      nickname: user.nickname,
      email: user.email,
      social_type: user.social_type,
      has_completed_onboarding: user.has_completed_onboarding
    });
    
    return response.data;
    
  } catch (error: any) {
    console.error('❌ 소셜 로그인 API 에러:', error);
    
    // 에러 응답 상세 로깅
    if (error.response) {
      console.error('📡 에러 응답 상태:', error.response.status);
      console.error('📦 에러 응답 데이터:', error.response.data);
      console.error('📄 에러 응답 헤더:', error.response.headers);
    }
    
    // 사용자 친화적 에러 메시지
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.status === 401) {
      throw new Error('인증에 실패했습니다. 다시 시도해주세요.');
    } else if (error.response?.status === 400) {
      throw new Error('잘못된 요청입니다. 소셜 로그인 정보를 확인해주세요.');
    } else if (error.response?.status === 500) {
      throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } else {
      throw new Error('로그인 중 오류가 발생했습니다.');
    }
  }
};

// React Query Hook - 개선된 버전
export const useSocialLogin = () => {
  return useMutation({
    mutationFn: socialLogin,
    onSuccess: (data: SocialLoginResponse) => {
      console.log('🎉 React Query onSuccess 호출');
      console.log('💾 localStorage 저장 시작...');
      
      // 토큰 저장
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      
      // 사용자 정보 저장
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // 로그인 시간 저장
      localStorage.setItem('loginTime', new Date().toISOString());
      
      console.log('💾 localStorage 저장 완료');
      console.log('📊 저장된 데이터:', {
        accessToken: localStorage.getItem('accessToken') ? '✅' : '❌',
        refreshToken: localStorage.getItem('refreshToken') ? '✅' : '❌',
        user: localStorage.getItem('user') ? '✅' : '❌',
        loginTime: localStorage.getItem('loginTime')
      });
      
      // 온보딩 완료 여부 로깅
      if (!data.user.has_completed_onboarding) {
        console.log('🚨 온보딩 미완료 사용자');
      } else {
        console.log('✅ 온보딩 완료 사용자');
      }
    },
    onError: (error: Error) => {
      console.error('❌ React Query onError 호출:', error.message);
      
      // 실패시 기존 토큰 정리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('loginTime');
      
      console.log('🧹 localStorage 정리 완료');
    }
  });
};

export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.post('/api/users/token/refresh/', { 
      refresh: refreshToken 
    });
    
    const { access } = response.data;
    localStorage.setItem('accessToken', access);
    
    console.log('✅ 토큰 갱신 성공');
    return { access };
  } catch (error: any) {
    console.error('❌ 토큰 갱신 실패:', error);
    
    // 리프레시 토큰도 만료된 경우 자동 로그아웃
    if (error.response?.status === 401) {
      console.log('🚨 리프레시 토큰 만료 - 자동 로그아웃');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('loginTime');
      
      // 홈페이지로 리다이렉트
      window.location.href = '/';
    }
    
    throw error;
  }
}

// 토큰 유효성 검사 함수 추가
export const checkTokenValidity = async (): Promise<boolean> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!accessToken || !refreshToken) {
    return false;
  }
  
  try {
    const apiClient = getApiClient();
    await apiClient.get('/users/me/'); // 또는 다른 간단한 인증 확인 엔드포인트
    return true;
  } catch (error: any) {
    if (error.response?.status === 401) {
      // 액세스 토큰이 만료된 경우 리프레시 토큰으로 갱신 시도
      try {
        await refreshAccessToken(refreshToken);
        return true;
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우
        return false;
      }
    }
    return false;
  }
};