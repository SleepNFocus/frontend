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
import { KAKAO_JAVASCRIPT_KEY, DEV_API_URL } from '@env'

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

const KakaoLoginWebView: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setLogin, setUser } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const validateEnvironment = () => {
    if (!KAKAO_JAVASCRIPT_KEY) throw new Error('KAKAO_JAVASCRIPT_KEY 누락');
    if (!DEV_API_URL) throw new Error('DEV_API_URL 누락');
  };

  const getRedirectUri = () => 'http://localhost:8081/oauth/callback';

  const getKakaoLoginUrl = () => {
    try {
      validateEnvironment();
      return `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_JAVASCRIPT_KEY}&redirect_uri=${encodeURIComponent(
        getRedirectUri(),
      )}&response_type=code`;
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류');
      return null;
    }
  };

  const handleNavigationStateChange = async (navState: WebViewNavigation) => {
    if (isProcessing || !navState.url.includes('localhost:8081/oauth/callback')) return;

    try {
      setIsProcessing(true);
      const url = new URL(navState.url);
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');
      const error_description = url.searchParams.get('error_description');

      if (error) {
        const errorMsg = `카카오 로그인 오류: ${error}${error_description ? ` - ${error_description}` : ''}`;
        setError(errorMsg);
        return;
      }

      if (code) {
        setIsLoading(true);
        const userData = await exchangeCodeForToken(code);
        await handleLoginSuccess(userData);
        webViewRef.current?.stopLoading();
      }
    } catch (err) {
      setError('URL 파싱 오류 발생');
    } finally {
      setIsProcessing(false);
    }
  };

  const exchangeCodeForToken = async (code: string): Promise<UserData> => {
    const requestUrl = `${DEV_API_URL}/api/users/social-login/`;
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, provider: 'kakao' }),
    });

    const responseText = await response.text();
    const data = JSON.parse(responseText);

    if (response.ok) return data;
    throw new Error(`토큰 교환 실패 (${response.status})`);
  };

  const handleLoginSuccess = async (userData: UserData) => {
    if (!userData.access || !userData.user?.user_id) throw new Error('유효하지 않은 로그인 정보');

    setLogin(true);
    const user: User = {
      id: userData.user.user_id,
      email: userData.user.email,
      nickname: userData.user.nickname,
      image_url: userData.user.profile_img || '',
    };
    setUser(user);

    await AsyncStorage.multiSet([
      ['hasLoggedInBefore', 'true'],
      ['onboardingComplete', 'true'],
      ['userToken', userData.access],
      ['refreshToken', userData.refresh],
    ]);

    navigation.navigate('Dashboard');
  };

  const handleWebViewError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    setError(`WebView 오류: ${nativeEvent.description || '알 수 없는 오류'}`);
  };

  const kakaoLoginUrl = getKakaoLoginUrl();

  useEffect(() => () => webViewRef.current?.stopLoading(), []);

  if (error || !kakaoLoginUrl) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>{error || '환경 변수 오류'}</Text>
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
            <Text style={styles.loadingText}>카카오 로그인 페이지 로딩 중...</Text>
          </View>
        )}
        <WebView
          ref={webViewRef}
          source={{ uri: kakaoLoginUrl }}
          style={styles.webView}
          onNavigationStateChange={handleNavigationStateChange}
          onError={handleWebViewError}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          scalesPageToFit
          userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
        />
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
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { fontSize: 16, color: colors.deepNavy, marginTop: 12 },
  errorText: { fontSize: 18, fontWeight: '600', color: colors.deepNavy, marginBottom: 8 },
  errorDescription: { fontSize: 14, color: colors.mediumGray, textAlign: 'center', lineHeight: 20 },
});







// import React from 'react';
// import { WebView } from 'react-native-webview';
// import type { WebViewNavigation } from 'react-native-webview';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RootStackParamList } from '@/App';

// const KakaoLoginWebView: React.FC = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const REDIRECT_URI = 'https://www.dev.focusz.site/oauth/callback';
//   const KAKAO_REST_API_KEY = '8629425abad5e70252adc18f2d0098a5';

//   const onNavigationStateChange = (navState: WebViewNavigation) => {
//     const { url } = navState;
//     console.log(' 현재 URL:', url); 

   
//     if (url.includes('code=')) {
//       try {
//         const code = new URL(url).searchParams.get('code');
//         if (code) {
//           console.log('인가 코드 감지:', code);
//           navigation.navigate('OAuthCallback', { code });
//         }
//       } catch (e) {
//         console.error(' URL 파싱 실패:', e);
//       }
//     }
//   };

//   return (
//     <WebView
//       source={{
//         uri: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`,
//       }}
//       onNavigationStateChange={onNavigationStateChange}
//       javaScriptEnabled={true}
//       originWhitelist={['*']}
//     />
//   );
// };

// export default KakaoLoginWebView;
