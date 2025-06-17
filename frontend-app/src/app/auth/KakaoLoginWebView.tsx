import React from 'react';
import { WebView } from 'react-native-webview';
import type { WebViewNavigation } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/App';

const KakaoLoginWebView: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const REDIRECT_URI = 'https://www.dev.focusz.site';
  const KAKAO_REST_API_KEY = '8629425abad5e70252adc18f2d0098a5';

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    const { url } = navState;
    console.log('📍 현재 URL:', url); // ← 현재 URL 출력

    // 더 유연한 조건으로 변경
    if (url.includes('code=')) {
      try {
        const code = new URL(url).searchParams.get('code');
        if (code) {
          console.log('✅ 인가 코드 감지됨:', code);
          navigation.navigate('OAuthCallback', { code });
        }
      } catch (e) {
        console.error('❗ URL 파싱 실패:', e);
      }
    }
  };

  return (
    <WebView
      source={{
        uri: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`,
      }}
      onNavigationStateChange={onNavigationStateChange}
      javaScriptEnabled={true}
      originWhitelist={['*']}
    />
  );
};

export default KakaoLoginWebView;
