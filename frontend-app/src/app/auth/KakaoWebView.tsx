import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore, User } from '@/store/authStore';
import { RootStackParamList } from '@/App';
import { BackButton } from '@/components/common/BackButton';
import { colors } from '@/constants/colors';
import { KAKAO_JAVASCRIPT_KEY, KAKAO_REST_API_KEY, DEV_API_URL } from '@env';

export interface UserData {
  access: string;
  refresh: string;
  user: {
    email: string;
    nickname: string;
    profile_img: string | null;
    social_id: string;
    social_type: 'KAKAO' | 'GOOGLE' | 'NAVER';
    status: 'active' | 'inactive';
    user_id: number;
  };
}
// export interface User {
//   id: number;
//   email: string;
//   nickname: string;
//   image_url?: string;
// }
// export interface User {
//   id: number;
//   email: string;
//   nickname: string;
//   image_url: string | null;
//   social_id: string;
//   social_type: string;
//   status: string;
// }
interface KakaoWebViewProps {
  onLoginSuccess?: (userData: UserData) => void;
  onLoginError?: (error: string) => void;
}

export const KakaoWebView: React.FC<KakaoWebViewProps> = ({
  onLoginSuccess,
  onLoginError,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setLogin, setUser } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const webViewRef = useRef<WebView>(null);

  // 환경 변수 검증
  const validateEnvironment = () => {
    if (!KAKAO_JAVASCRIPT_KEY) {
      throw new Error('KAKAO_JAVASCRIPT_KEY가 설정되지 않았습니다.');
    }
    if (!DEV_API_URL) {
      throw new Error('DEV_API_URL이 설정되지 않았습니다.');
    }
  };

  // 리다이렉트 URI 설정 (카카오 개발자 콘솔에 등록된 URL)
  const getRedirectUri = () => {
    // 카카오 개발자 콘솔에 등록된 URL 사용
    return 'http://localhost:8081/oauth/callback';
  };

  const getKakaoLoginUrl = () => {
    try {
      validateEnvironment();
      const redirectUri = getRedirectUri();

      const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_JAVASCRIPT_KEY}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;

      return kakaoLoginUrl;
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류');
      return null;
    }
  };

  const handleNavigationStateChange = async (navState: WebViewNavigation) => {
    if (isProcessing) {
      console.log('이미 처리 중입니다. 중복 요청 무시');
      return;
    }

    if (navState.url.includes('localhost:8081/oauth/callback')) {
      try {
        setIsProcessing(true);

        const url = new URL(navState.url);
        const code = url.searchParams.get('code');
        const error = url.searchParams.get('error');
        const error_description = url.searchParams.get('error_description');

        console.log('URL 파라미터:', {
          code: code ? '존재함' : '없음',
          error,
          error_description,
          fullUrl: navState.url,
        });

        if (error) {
          const errorMsg = `카카오 로그인 오류: ${error}${error_description ? ` - ${error_description}` : ''}`;
          console.error(errorMsg);
          setError(errorMsg);
          onLoginError?.(errorMsg);
          return;
        }

        if (code) {
          console.log('인가 코드 받음:', code);
          setIsLoading(true);
          try {
            const userData = await exchangeCodeForToken(code);
            console.log('userData', userData);
            await handleLoginSuccess(userData);

            if (webViewRef.current) {
              webViewRef.current.stopLoading();
            }
          } catch (tokenError) {
            console.error('토큰 교환 오류:', tokenError);
            setError(
              tokenError instanceof Error
                ? tokenError.message
                : '토큰 교환 실패',
            );
            onLoginError?.(
              tokenError instanceof Error
                ? tokenError.message
                : '토큰 교환 실패',
            );
          }
        }
      } catch (urlError) {
        console.error('URL 파싱 오류:', urlError);
        setError('URL 파싱 오류가 발생했습니다.');
        onLoginError?.('URL 파싱 오류가 발생했습니다.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const exchangeCodeForToken = async (code: string): Promise<UserData> => {
    try {
      const requestUrl = `${DEV_API_URL}/api/users/social-login/`;

      const requestBody = { code: code, provider: 'kakao' };

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();

      let data: UserData;
      try {
        data = JSON.parse(responseText);
        console.log('파싱된 응답 데이터:', JSON.stringify(data, null, 2));
      } catch (parseError) {
        console.error('JSON 파싱 오류:', parseError);
        throw new Error(`서버 응답을 파싱할 수 없습니다: ${responseText}`);
      }

      if (response.ok) {
        console.log('토큰 교환 성공');
        return data;
      } else {
        console.error('토큰 교환 실패:', {
          status: response.status,
          statusText: response.statusText,
          data: data,
        });
        throw new Error(`토큰 교환 실패 (${response.status})`);
      }
    } catch (error) {
      console.error('토큰 교환 오류:', error);
      console.error('오류 상세:', {
        message: error instanceof Error ? error.message : '알 수 없는 오류',
        stack: error instanceof Error ? error.stack : undefined,
        error: error,
      });
      throw error;
    }
  };

  const handleLoginSuccess = async (userData: UserData) => {
    try {
      console.log('=== 로그인 성공 처리 ===');
      console.log('사용자 데이터:', JSON.stringify(userData, null, 2));

      if (!userData.access) {
        throw new Error('액세스 토큰이 없습니다.');
      }
      if (!userData.user?.user_id) {
        throw new Error('사용자 ID가 없습니다.');
      }

      console.log('로그인 상태 설정 중...');
      await setLogin(true);

      console.log('사용자 정보 설정 중...');
      const user: User = {
        id: userData.user.user_id,
        email: userData.user.email,
        nickname: userData.user.nickname,
        image_url: userData.user.profile_img || '',
      };

      await setUser(user);

      console.log('AsyncStorage 저장 중...');
      await AsyncStorage.setItem('hasLoggedInBefore', 'true');
      await AsyncStorage.setItem('onboardingComplete', 'true');
      await AsyncStorage.setItem('userToken', userData.access);
      await AsyncStorage.setItem('refreshToken', userData.refresh);

      console.log('로그인 정보 저장 완료');
      onLoginSuccess?.(userData);

      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('로그인 정보 저장 오류:', error);
      console.error('오류 상세:', {
        message: error instanceof Error ? error.message : '알 수 없는 오류',
        stack: error instanceof Error ? error.stack : undefined,
        error: error,
      });
      setError(
        error instanceof Error ? error.message : '로그인 정보 저장 실패',
      );
      onLoginError?.(
        `로그인 정보 저장 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    }
  };

  const handleWebViewError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.error('WebView 오류:', nativeEvent);
    setError(`WebView 오류: ${nativeEvent.description || '알 수 없는 오류'}`);
    onLoginError?.(
      `WebView 오류: ${nativeEvent.description || '알 수 없는 오류'}`,
    );
  };

  const handleWebViewLoadEnd = () => {
    setIsLoading(false);
  };

  const kakaoLoginUrl = getKakaoLoginUrl();

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 WebView 정리
      if (webViewRef.current) {
        webViewRef.current.stopLoading();
      }
    };
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>오류가 발생했습니다</Text>
          <Text style={styles.errorDescription}>{error}</Text>
        </View>
      </View>
    );
  }

  if (!kakaoLoginUrl) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>환경 변수 설정 오류</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>카카오 로그인</Text>
      </View>
      <View style={styles.webViewContainer}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.deepNavy} />
            <Text style={styles.loadingText}>
              카카오 로그인 페이지 로딩 중...
            </Text>
          </View>
        )}
        <WebView
          ref={webViewRef}
          source={{ uri: kakaoLoginUrl }}
          style={styles.webView}
          onNavigationStateChange={handleNavigationStateChange}
          onError={handleWebViewError}
          onLoadEnd={handleWebViewLoadEnd}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          allowsBackForwardNavigationGestures={true}
          userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
          onShouldStartLoadWithRequest={request => {
            if (request.url.includes('localhost:8081/oauth/callback')) {
              return true;
            }
            return true;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
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
  webViewContainer: {
    flex: 1,
    position: 'relative',
  },
  webView: {
    flex: 1,
  },
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
  loadingText: {
    fontSize: 16,
    color: colors.deepNavy,
    marginTop: 12,
  },
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
});
