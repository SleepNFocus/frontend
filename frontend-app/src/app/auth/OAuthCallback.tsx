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
      navigation.goBack();
      return;
    }

    const authenticate = async () => {
      try {
        // 카카오 액세스 토큰 획득
        const access_token = await getAccessTokenFromKakao(code);

        // 서버에 로그인 요청
        const { access, refresh, user } = await sendKakaoLoginCode(access_token);

        // 토큰 저장 키를 accessToken으로 통일
        await AsyncStorage.setItem('accessToken', access);
        await AsyncStorage.setItem('refreshToken', refresh);
        await AsyncStorage.setItem('userInfo', JSON.stringify(user));

        setLogin(true);
        setUser(user);

        // 온보딩 상태 확인
        const onboardingStatus = user?.has_completed_onboarding;

        if (onboardingStatus === true) {
          setCompletedOnboarding(true);
          setTimeout(() => {
            navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
          }, 100);
        } else {
          setCompletedOnboarding(false);
          setTimeout(() => {
            navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
          }, 100);
        }
      } catch (err) {
        console.error('로그인 실패:', err);
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