import { useSocialLogin } from '@/services/userApi';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const Home = () => {
  const socialLogin = useSocialLogin();
  const navigate = useNavigate();

  // 구글 로그인
  const handleGoogleLogin = () => {
    const url =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}` +
      `&response_type=token&scope=profile email`;
    window.location.href = url;
  };

  // 카카오 로그인
  const handleKakaoLogin = () => {
    const url =
      `https://kauth.kakao.com/oauth/authorize?` +
      `client_id=${KAKAO_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
      `&response_type=token`;
    window.location.href = url;
  };

  // 콜백에서 access_token 추출 및 서버로 전달
  React.useEffect(() => {
    if (window.location.hash.includes('access_token')) {
      const params = new URLSearchParams(window.location.hash.replace('#', ''));
      const access_token = params.get('access_token');
      const isGoogle = window.location.pathname.includes('/oauth/google');
      const isKakao = window.location.pathname.includes('/oauth/kakao');
      if (access_token && (isGoogle || isKakao)) {
        const provider = isGoogle ? 'google' : 'kakao';
        socialLogin.mutate(
          { provider, access_token },
          {
            onSuccess: (data) => {
              localStorage.setItem('accessToken', data.access_token);
              navigate('/admin');
            },
            onError: () => {
              alert('소셜 로그인 실패');
            },
          }
        );
      }
    }
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md border border-mediumLightGray p-6 w-full max-w-md mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-textColor">관리자 소셜 로그인</h1>
        <p className="mb-8 text-softBlue text-center">소셜 계정으로 간편하게 로그인하세요.</p>
        <button
          onClick={handleGoogleLogin}
          className="w-full mb-4 py-2 rounded bg-white border border-mediumLightGray text-textColor font-semibold shadow hover:bg-mediumLightGray transition"
        >
          <span className="mr-2"></span> Google로 로그인
        </button>
        <button
          onClick={handleKakaoLogin}
          className="w-full mb-4 py-2 rounded bg-white border border-mediumLightGray text-textColor font-semibold shadow hover:bg-mediumLightGray transition"
        >
          <span className="mr-2"></span> Kakao로 로그인
        </button>
      </div>
    </div>
  );
};

export default Home;
