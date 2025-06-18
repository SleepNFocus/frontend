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

type LocalParamList = {
  Dashboard: undefined;
  OAuthCallback: {
    code: string;
    state?: string;
  };
};

type OAuthRouteParams = {
  OAuthCallback: {
    code: string;
    state?: string;
  };
};

const OAuthCallback = () => {
  const navigation = useNavigation<NavigationProp<LocalParamList>>();
  const route = useRoute<RouteProp<OAuthRouteParams, 'OAuthCallback'>>();

  const setLogin = useAuthStore(state => state.setLogin);
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const { code } = route.params ?? {};

    if (!code) {
      console.log('인가 코드 없음');
      navigation.goBack();
      return;
    }

    const authenticate = async () => {
      try {
        console.log('인가 코드:', code);

        const access_token = await getAccessTokenFromKakao(code);
        console.log('access_token:', access_token);

        const { access, refresh, user } = await sendKakaoLoginCode(access_token);
        console.log('유저 정보:', user);

        await AsyncStorage.setItem('accessToken', access);
        await AsyncStorage.setItem('refreshToken', refresh);
        await AsyncStorage.setItem('userInfo', JSON.stringify(user));

        setLogin(true);
        setUser(user);

        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      } catch (err) {
        console.error('로그인 실패:', err);
        Alert.alert('로그인 실패', '카카오 로그인에 실패했어요!');
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
