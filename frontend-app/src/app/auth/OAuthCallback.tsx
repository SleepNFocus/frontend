import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuthStore } from '@/store/authStore';
import { getAccessTokenFromKakao } from '@/utils/auth/getAccessTokenFromKakao';
import { sendKakaoLoginToken } from '@/utils/auth/sendKakaoLoginCode';
import { RootStackParamList } from '@/App';
import { loginWithAppleCode } from '@/utils/auth/loginWithApple';

type OAuthCallbackRoute = RouteProp<RootStackParamList, 'OAuthCallback'>;

const OAuthCallback = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<OAuthCallbackRoute>();
  const { code, provider } = route.params ?? {};

  const setLogin = useAuthStore(state => state.setLogin);
  const setUser = useAuthStore(state => state.setUser);
  const setCompletedOnboarding = useAuthStore(
    state => state.setCompletedOnboarding,
  );

  useEffect(() => {
    if (!code || !provider) {
      Alert.alert('로그인 실패', '유효하지 않은 접근입니다.');
      navigation.goBack();
      return;
    }

    const authenticate = async () => {
      try {
        let user;
        if (provider === 'kakao') {
          const access_token = await getAccessTokenFromKakao(code);
          const {
            access,
            refresh,
            user: kakaoUser,
          } = await sendKakaoLoginToken(access_token);

          await AsyncStorage.setItem('accessToken', access);
          await AsyncStorage.setItem('refreshToken', refresh);
          await AsyncStorage.setItem('userInfo', JSON.stringify(kakaoUser));

          setLogin(true);
          setUser(kakaoUser);
          user = kakaoUser;
        } else if (provider === 'apple') {
          const result = await loginWithAppleCode(code);
          if (!result.success || !result.user) {
            throw new Error('애플 로그인 실패');
          }

          const { user: appleUser } = result;

          await AsyncStorage.setItem('userInfo', JSON.stringify(appleUser));
          setLogin(true);
          setUser(appleUser);

          user = appleUser;
        } else {
          throw new Error('지원하지 않는 로그인 방식입니다.');
        }

        const onboardingStatus = user?.has_completed_onboarding;

        if (onboardingStatus === true) {
          setCompletedOnboarding(true);
          navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
        } else {
          setCompletedOnboarding(false);
          navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
        }
      } catch (err) {
        console.error(`${provider} 로그인 실패:`, err);
        Alert.alert(
          '로그인 실패',
          '애플 로그인 중 오류가 발생했어요.\n다시 시도해 주세요.',
        );
        navigation.goBack();
      }
    };

    authenticate();
  }, [code, provider]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>로그인 중입니다...</Text>
      <ActivityIndicator size="large" color="#6C7BFF" />
    </View>
  );
};

export default OAuthCallback;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    color: '#333',
    fontSize: 16,
    marginBottom: 16,
  },
});
