import React from 'react';
import { WebView } from 'react-native-webview';
import type { WebViewNavigation } from 'react-native-webview';
import { sendKakaoLoginCode } from './sendKakaoLoginCode';




const KakaoLoginWebView = ({ onLoginSuccess }: { onLoginSuccess: (code: string) => void }) => {

    const REDIRECT_URI = "https://www.dev.focusz.site";

const KAKAO_REST_API_KEY = '8629425abad5e70252adc18f2d0098a5'; 

  const injectedJavaScript = `
    window.ReactNativeWebView.postMessage(window.location.href);
    true;
  `;

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    const { url } = navState;
    if (url.includes(`${REDIRECT_URI}?code=`)) {
      const code = new URL(url).searchParams.get('code');
      if (code) {
        onLoginSuccess(code);
      }
    }
  };
  return (
    <WebView
      source={{
        uri: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`,
      }}
      injectedJavaScript={injectedJavaScript}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};

export default KakaoLoginWebView;
