import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuthStore } from '@/store/authStore';
import { getAccessTokenFromKakao } from './getAccessTokenFromKakao';
import { sendKakaoLoginCode } from './sendKakaoLoginCode';
import { RootStackParamList } from '@/App';

const OAuthCallback = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'OAuthCallback'>>();

  const setLogin = useAuthStore(state => state.setLogin);
  const setUser = useAuthStore(state => state.setUser);
  const setCompletedOnboarding = useAuthStore(state => state.setCompletedOnboarding);

  useEffect(() => {
    const { code } = route.params ?? {};

    if (!code) {
      console.warn('⚠️ 인가 코드 없음');
      navigation.goBack();
      return;
    }

    const authenticate = async () => {
      try {
        console.log('✅ 인가 코드:', code);

        // 1. 카카오 access token 가져오기
        const access_token = await getAccessTokenFromKakao(code);
        console.log('✅ access_token:', access_token);

        // 2. 백엔드 로그인 요청
        const { access, refresh, user } = await sendKakaoLoginCode(access_token);
        console.log('✅ 유저 정보:', user);

        // 3. 토큰과 유저 정보 저장
        await AsyncStorage.setItem('accessToken', access);
        await AsyncStorage.setItem('refreshToken', refresh);
        await AsyncStorage.setItem('userInfo', JSON.stringify(user));

        setLogin(true);
        setUser(user);

        // 4. 온보딩 여부 확인
        const onboardingStatus = user?.has_completed_onboarding;
        console.log('🚦 has_completed_onboarding 값:', onboardingStatus, ' / 타입:', typeof onboardingStatus);

        if (onboardingStatus === true) {
          setCompletedOnboarding(true);
          console.log('➡️ Dashboard로 이동!');
          setTimeout(() => {
            navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
          }, 100);
        } else {
          setCompletedOnboarding(false);
          console.log('➡️ SurveyPage로 이동!');
          setTimeout(() => {
            navigation.reset({ index: 0, routes: [{ name: 'SurveyPage' }] });
          }, 100);
        }
      } catch (err) {
        console.error('🛑 로그인 실패:', err);
        Alert.alert('로그인 실패', '카카오 로그인 중 오류가 발생했어요.\n다시 시도해 주세요.');
        navigation.goBack();
      }
    };

    authenticate();
  }, [route.params]);

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