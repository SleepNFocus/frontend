import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp  } from '@react-navigation/native';
import { useAuthStore } from '@/store/authStore';

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

  const setLogin = useAuthStore((state) => state.setLogin);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const { code } = route.params ?? {};

    if (!code) {
      navigation.goBack();
      return;
    }

    const mockAuthenticate = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setLogin(true);
      setUser({
        id: 1,
        email: 'test@test.mockup.io',
        nickname: 'TEST',
        image_url: '',
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    };

    mockAuthenticate();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>로그인 중입니다...</Text>
      <ActivityIndicator size="large" color="#6C7BFF" />
    </View>
  );
};

export default OAuthCallback;
/* eslint-disable react-native/no-color-literals */
// 재사용 예정 없는 스타일 코드라 주석 처리

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