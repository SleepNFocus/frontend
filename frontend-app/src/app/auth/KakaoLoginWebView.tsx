import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore, User } from '@/store/authStore';
import { RootStackParamList } from '@/App';
import { BackButton } from '@/components/common/BackButton';
import { colors } from '@/constants/colors';
import { KAKAO_REST_API_KEY, LIVE_API_URL, REDIRECT_URI } from '@env';
import type { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes';
import { sendKakaoLoginToken } from '@/utils/auth/sendKakaoLoginCode';
import { getAccessTokenFromKakao } from '@/utils/auth/getAccessTokenFromKakao';

export interface UserData {
  access: string;
  refresh: string;
  user: {
    email: string;
    nickname: string;
    profile_img: string | null;
    social_id: string;
    social_type: 'KAKAO' | 'GOOGLE' | 'NAVER';
    status: string;
    user_id: number;
    has_completed_onboarding: boolean;
  };
}

const KakaoLoginWebView: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setLogin, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [kakaoLoginUrl, setKakaoLoginUrl] = useState<string | null>(null);
  const webViewRef = useRef<WebView>(null);
  const [connectionError, setConnectionError] = useState(false);
  const [processedCodes, setProcessedCodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      if (!KAKAO_REST_API_KEY) throw new Error('KAKAO_REST_API_KEY 누락');
      if (!LIVE_API_URL) throw new Error('LIVE_API_URL 누락');
      if (!REDIRECT_URI) throw new Error('REDIRECT_URI 누락');

      const redirectUri = REDIRECT_URI;
      const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(
        redirectUri,
      )}&response_type=code`;

      setKakaoLoginUrl(url);
    } catch (err) {
      console.error(
        '환경 변수 오류:',
        err instanceof Error ? err.message : '알 수 없는 오류',
      );
      // 에러를 화면에 표시하지 않고 콘솔로만 출력
    }
  }, []);

  const handleShouldStartLoadWithRequest = (request: any) => {
    const { url } = request;

    // 리다이렉트 URI로 시작하는 경우에만 처리
    if (!url.startsWith(REDIRECT_URI)) {
      return true; // 다른 URL은 정상적으로 로드
    }

    // 이미 처리 중이면 무시
    if (isProcessing) {
      return false;
    }

    try {
      const urlObj = new URL(url);
      const code = urlObj.searchParams.get('code');
      const error = urlObj.searchParams.get('error');
      const error_description = urlObj.searchParams.get('error_description');

      if (error) {
        console.error('카카오 로그인 오류:', error, error_description);
        return false;
      }

      if (code) {
        // 이미 처리된 코드인지 확인
        if (processedCodes.has(code)) {
          console.log('이미 처리된 인증 코드입니다:', code);
          return false;
        }

        // 처리된 코드 목록에 추가
        setProcessedCodes(prev => new Set([...prev, code]));

        // 비동기로 토큰 교환 처리
        setIsProcessing(true);
        exchangeCodeForToken(code)
          .then(userData => handleLoginSuccess(userData))
          .catch(error => {
            console.error('토큰 교환 실패:', error);
          })
          .finally(() => {
            setIsProcessing(false);
          });

        return false; // 리다이렉트 URI 로딩 방지
      }
    } catch (error) {
      console.error('URL 파싱 오류 발생:', error);
    }

    return false; // 리다이렉트 URI는 로딩하지 않음
  };

  const exchangeCodeForToken = async (code: string): Promise<UserData> => {
    try {
      // 1. 인증 코드로 카카오 액세스 토큰 받기
      const accessToken = await getAccessTokenFromKakao(code);

      // 2. 받은 액세스 토큰으로 우리 서버에 로그인 요청
      const loginResponse = await sendKakaoLoginToken(accessToken);

      // UserData 형식으로 변환
      const userData: UserData = {
        access: loginResponse.access,
        refresh: loginResponse.refresh,
        user: {
          email: loginResponse.user.email,
          nickname: loginResponse.user.nickname,
          profile_img: loginResponse.user.profile_img,
          social_id: loginResponse.user.social_id,
          social_type: loginResponse.user.social_type,
          status: loginResponse.user.status,
          user_id: loginResponse.user.id,
          has_completed_onboarding: loginResponse.user.has_completed_onboarding,
        },
      };

      return userData;
    } catch (error) {
      console.error('토큰 교환 실패:', error);
      throw error;
    }
  };

  const handleLoginSuccess = async (userData: UserData) => {
    if (!userData.access || !userData.user?.user_id)
      throw new Error('유효하지 않은 로그인 정보');

    try {
      setLogin(true);
      const user: User = {
        id: userData.user.user_id,
        email: userData.user.email,
        nickname: userData.user.nickname,
        image_url: userData.user.profile_img || '',
      };
      setUser(user);

      // 토큰은 이미 sendKakaoLoginToken에서 저장됨

      // WebView 정리
      webViewRef.current?.stopLoading();

      // 네비게이션
      if (userData.user.has_completed_onboarding) {
        navigation.navigate('Dashboard');
      } else {
        navigation.navigate('Onboarding');
      }
    } catch (error) {
      console.error('로그인 성공 처리 중 오류:', error);
      setIsProcessing(false);
    }
  };

  const handleWebViewError = (event: WebViewErrorEvent) => {
    const { nativeEvent } = event;
    console.error(
      'WebView 오류:',
      nativeEvent.description || '알 수 없는 오류',
    );
    // 연결 오류 시 사용자에게 알림
    if (nativeEvent.description?.includes('ERR_CONNECTION_REFUSED')) {
      setConnectionError(true);
    }
  };

  const handleRetry = () => {
    setConnectionError(false);
    setIsLoading(true);
    // WebView를 다시 로드
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  useEffect(() => {
    return () => {
      webViewRef.current?.stopLoading();
    };
  }, []);

  // 연결 오류 시 재시도 화면
  if (connectionError) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.content}>
          <Text style={styles.errorIcon}>📡</Text>
          <Text style={styles.errorTitle}>연결할 수 없습니다</Text>
          <Text style={styles.errorDescription}>
            네트워크 연결을 확인하고 다시 시도해주세요.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.webViewContainer}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.deepNavy} />
            <Text style={styles.loadingText}>
              카카오 로그인 페이지 로딩 중...
            </Text>
          </View>
        )}
        {kakaoLoginUrl && (
          <WebView
            ref={webViewRef}
            source={{ uri: kakaoLoginUrl }}
            style={styles.webView}
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            onError={handleWebViewError}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            scalesPageToFit
            userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
            onLoadEnd={() => setIsLoading(false)}
          />
        )}
      </View>
    </View>
  );
};

export default KakaoLoginWebView;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumLightGray,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.deepNavy,
    marginLeft: 16,
  },
  webViewContainer: { flex: 1, position: 'relative' },
  webView: { flex: 1 },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: { fontSize: 16, color: colors.deepNavy, marginTop: 12 },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.deepNavy,
    marginBottom: 8,
  },
  errorDescription: {
    fontSize: 14,
    color: colors.mediumGray,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorIcon: { fontSize: 48, marginBottom: 12 },
  errorTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.deepNavy,
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: colors.deepNavy,
    padding: 16,
    borderRadius: 8,
  },
  retryButtonText: { fontSize: 18, fontWeight: '600', color: colors.white },
});
