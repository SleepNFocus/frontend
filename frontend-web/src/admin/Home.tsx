import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSocialLogin, checkTokenValidity } from '@/services/userApi';
import { getUser, useCreateLog } from '@/services/adminApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

const isDev = import.meta.env.NODE_ENV === 'development';
const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI || 'http://localhost:5173/oauth/kakao';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI || 'http://localhost:5173/oauth/google';

const Home = () => {
  const { mutate, isPending } = useSocialLogin();
  const { mutate: createLog } = useCreateLog();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInProvider, setLoggedInProvider] = useState<string | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoginResultModalOpen, setIsLoginResultModalOpen] = useState(false);
  const [loginResultType, setLoginResultType] = useState<'success' | 'fail' | null>(null);
  const [loginFailReason, setLoginFailReason] = useState<string | null>(null);
  const [loginUser, setLoginUser] = useState<any>(null);
  const callbackProcessed = useRef(false);
  const [shouldCheckAdmin, setShouldCheckAdmin] = useState(false);

  // 관리자 권한 확인 함수
  const checkAdminPermission = async (userId: number) => {
    try {
      console.log('🔍 관리자 권한 확인 시작 - 사용자 ID:', userId);
      const userDetail = await getUser(userId);
      console.log('👤 사용자 상세 정보:', userDetail);
      console.log('🔑 is_admin 값:', userDetail.is_admin);
      
      return userDetail.is_admin;
    } catch (error) {
      console.error('❌ 관리자 권한 확인 실패:', error);
      return false;
    }
  };

  // 관리자 권한 확인 useEffect
  useEffect(() => {
    const verifyAdminPermission = async () => {
      if (shouldCheckAdmin && loginUser) {
        console.log('🔍 관리자 권한 확인 useEffect 실행');
        const isAdmin = await checkAdminPermission(loginUser.user_id);
        
        if (isAdmin) {
          console.log('✅ 관리자 권한 확인됨 - 성공 모달 표시');
          setLoginResultType('success');
          setIsLoginResultModalOpen(true);
          setLoginFailReason(null);
          
          // 관리자 로그인 성공 로그 기록
          createLog({
            action_type: 'ADMIN_LOGIN',
            description: `관리자 로그인 성공: ${loginUser.nickname} (${loginUser.email})`,
          });
        } else {
          console.log('❌ 관리자 권한 없음 - 실패 모달 표시');
          console.log('🔍 실패 원인:', {
            userExists: !!loginUser,
            userId: loginUser?.user_id,
            isAdminValue: isAdmin
          });
          setLoginResultType('fail');
          setIsLoginResultModalOpen(true);
          setLoginFailReason('관리자 권한이 없습니다. 일반 사용자 계정으로 로그인하셨습니다.');
        }
        setShouldCheckAdmin(false);
      }
    };
    
    verifyAdminPermission();
  }, [shouldCheckAdmin, loginUser, createLog]);

  // OAuth 콜백 처리 로직
  useEffect(() => {
    const processCallback = () => {
      if (callbackProcessed.current || !window.location.pathname.includes('/oauth')) {
        return;
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        callbackProcessed.current = true;
        const provider = window.location.pathname.includes('/oauth/google') ? 'google' : 'kakao';
        
        mutate(
          { provider, code },
          {
            onError: (error: any) => {
              console.error('❌ 로그인 실패:', error.message);
              setLoginResultType('fail');
              setIsLoginResultModalOpen(true);
              setLoginFailReason(null);
              callbackProcessed.current = false; 
            },
          }
        );
      }
    };
    processCallback();
  }, [mutate, navigate]);

  // 페이지 로드 시 로그인 상태 초기화
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        console.log('🔄 페이지 로드 시 로그인 상태 복원:', userData);
        setLoginUser(userData);
        setIsLoggedIn(true);
        setLoggedInProvider(userData.social_type);
      } catch (e) {
        console.error("localStorage에서 사용자 정보 파싱 실패", e);
        localStorage.clear();
        setIsLoggedIn(false);
        setLoggedInProvider(null);
        setLoginUser(null);
      }
    } else {
      console.log('🔄 페이지 로드 시 로그아웃 상태 확인');
      setIsLoggedIn(false);
      setLoggedInProvider(null);
      setLoginUser(null);
    }
  }, []);

  // 로그인 성공 감지 및 관리자 권한 확인
  useEffect(() => {
    const checkLoginSuccess = () => {
      const token = localStorage.getItem('accessToken');
      const user = localStorage.getItem('user');
      
      // localStorage에 토큰과 사용자 정보가 있는데 로그인 상태가 아닌 경우
      if (token && user && !isLoggedIn) {
        console.log('🔍 로그인 성공 감지됨');
        try {
          const userData = JSON.parse(user);
          console.log('👤 사용자 정보:', userData);
          
          setLoginUser(userData);
          setIsLoggedIn(true);
          setLoggedInProvider(userData.social_type);
          
          // 관리자 권한 확인 시작
          setShouldCheckAdmin(true);
        } catch (e) {
          console.error("localStorage에서 사용자 정보 파싱 실패", e);
        }
      }
      
      // localStorage에 토큰과 사용자 정보가 없는데 로그인 상태인 경우
      if ((!token || !user) && isLoggedIn) {
        console.log('🔍 로그아웃 감지됨');
        setIsLoggedIn(false);
        setLoggedInProvider(null);
        setLoginUser(null);
        setShouldCheckAdmin(false);
      }
    };
    
    // 주기적으로 로그인 상태 확인
    const interval = setInterval(checkLoginSuccess, 100);
    
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    console.log('🚪 로그아웃 실행');
    localStorage.clear();
    setIsLoggedIn(false);
    setLoggedInProvider(null);
    setLoginUser(null);
    setShouldCheckAdmin(false);
    setLoginResultType(null);
    setIsLoginResultModalOpen(false);
    setIsLogoutModalOpen(false);
    callbackProcessed.current = false;
    console.log('✅ 로그아웃 완료 - 모든 상태 초기화');
    window.location.href = '/'; // 홈으로 이동
  };

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = new URL('https://kauth.kakao.com/oauth/authorize');
    kakaoAuthUrl.searchParams.append('client_id', KAKAO_CLIENT_ID!);
    kakaoAuthUrl.searchParams.append('redirect_uri', KAKAO_REDIRECT_URI);
    kakaoAuthUrl.searchParams.append('response_type', 'code');
    window.location.href = kakaoAuthUrl.toString();
  };

  const handleGoogleLogin = () => {
    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID!);
    googleAuthUrl.searchParams.append('redirect_uri', GOOGLE_REDIRECT_URI);
    googleAuthUrl.searchParams.append('response_type', 'code');
    googleAuthUrl.searchParams.append('scope', 'profile email');
    window.location.href = googleAuthUrl.toString();
  };
  
  const isLoading = isPending;

  // 로그인 결과 모달 닫기 핸들러
  const handleLoginResultModalClose = () => {
    setIsLoginResultModalOpen(false);
    if (loginResultType === 'success') {
      navigate('/admin', { replace: true });
    } else {
      // 관리자 권한이 없는 경우 자동 로그아웃
      console.log('🚪 관리자 권한 없음 - 자동 로그아웃');
      localStorage.clear();
      setIsLoggedIn(false);
      setLoggedInProvider(null);
      setLoginUser(null);
      setShouldCheckAdmin(false);
      callbackProcessed.current = false;
    }
    setLoginResultType(null);
  };

  return (
    <div className="p-6">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-textColor">관리자 소셜 로그인</CardTitle>
          {!isLoggedIn && (
            <CardDescription className="text-softBlue">소셜 계정으로 간편하게 로그인하세요.</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {isLoggedIn ? (
            <div className="w-full text-center">
              <p className="mb-4 text-softBlue">{loggedInProvider} 계정으로 로그인되어 있습니다.</p>
              
              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 rounded-lg bg-gray-500 text-white font-semibold shadow hover:bg-gray-600 transition flex items-center justify-center"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full mb-4 py-3 px-4 rounded-lg bg-white border border-mediumLightGray text-textColor font-semibold shadow hover:bg-mediumLightGray transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isLoading ? '확인 중...' : 'Google로 로그인'}
              </button>
              
              <button
                onClick={handleKakaoLogin}
                disabled={isLoading}
                className="w-full mb-4 py-3 px-4 rounded-lg bg-[#FEE500] text-[#191919] font-semibold shadow hover:bg-[#FDD835] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/>
                </svg>
                {isLoading ? '확인 중...' : 'Kakao로 로그인'}
              </button>
            </>
          )}

          {/* 개발 모드 정보 */}
          {isDev && (
            <Card className="w-full mt-4">
              <CardContent className="text-xs text-gray-500 p-2 bg-gray-100 rounded">
                <p><strong>🔧 개발 모드:</strong></p>
                <p>Kakao Client ID: {KAKAO_CLIENT_ID ? '✅' : '❌'}</p>
                <p>Google Client ID: {GOOGLE_CLIENT_ID ? '✅' : '❌'}</p>
                <p>현재 경로: {window.location.pathname}</p>
                <p>로그인 상태: {isLoggedIn ? '✅ 로그인됨' : '❌ 로그아웃'}</p>
                <p>localStorage accessToken: {localStorage.getItem('accessToken') ? '✅ 있음' : '❌ 없음'}</p>
                <p>localStorage user: {localStorage.getItem('user') ? '✅ 있음' : '❌ 없음'}</p>
                <p>loggedInProvider: {loggedInProvider || '없음'}</p>
                <p>loginUser: {loginUser ? `ID: ${loginUser.user_id}` : '없음'}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent>
          <DialogHeader>
          <DialogTitle className="text-textColor">로그아웃 하시겠습니까?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-center">
            <Button 
              className="bg-softBlue text-white hover:bg-deepNavy border-none"
              onClick={confirmLogout}
            >
              확인
            </Button>
            <Button 
              variant="outline" 
              className="border-softBlue text-softBlue hover:bg-softBlue hover:text-white"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              취소
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isLoginResultModalOpen} onOpenChange={setIsLoginResultModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-textColor">
              {loginResultType === 'success' ? '로그인이 완료되었습니다.' : '접근 권한이 없습니다'}
            </DialogTitle>
            {loginResultType === 'fail' && (
              <DialogDescription className="mt-2">
                {loginFailReason || '다시 시도해주세요.'}
              </DialogDescription>
            )}
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-center">
            <Button 
              className="bg-softBlue text-white hover:bg-deepNavy border-none"
              onClick={handleLoginResultModalClose}
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;