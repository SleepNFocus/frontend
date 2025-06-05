import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { Button, Text } from 'react-native-paper';
import IntroScreen from './IntroScreen';

export const SocialLogin: React.FC = () => {
  const [isStarted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isStarted) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isStarted]);

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} 로그인은 아직 구현되지 않았습니다.`);
  };

  if (!isStarted) {
    return (
      <View style={{ flex: 1 }}>
        {/* <IntroScreen onNext={() => setIsStarted(true)} /> 나중에 onNext사용시 이렇게 변경 */}
        <IntroScreen />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        소셜 로그인
      </Text>

      <Animated.View style={[styles.fadeContainer, { opacity: fadeAnim }]}>
        <Button
          mode="contained"
          icon={() => (
            <Image
              source={{
                uri: 'https://developers.kakao.com/tool/resource/static/img/button/kakaoAccount/kakao_account_login_btn_medium_narrow.png',
              }}
              style={styles.icon}
            />
          )}
          onPress={() => handleSocialLogin('카카오')}
          style={[styles.button, { backgroundColor: '#FEE500' }]}
          labelStyle={{ color: '#3C1E1E', fontWeight: 'bold' }}
          contentStyle={{ paddingVertical: 10 }}
        >
          카카오로 로그인
        </Button>

        <Button
          mode="contained"
          icon={() => (
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
              }}
              style={styles.icon}
            />
          )}
          onPress={() => handleSocialLogin('구글')}
          style={[
            styles.button,
            { backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1 },
          ]}
          labelStyle={{ color: '#222', fontWeight: 'bold' }}
          contentStyle={{ paddingVertical: 10 }}
        >
          구글로 로그인
        </Button>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  fadeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    borderRadius: 12,
    marginBottom: 16,
    width: 260,
    elevation: 2,
  },
  icon: {
    height: 24,
    marginRight: 8,
    resizeMode: 'contain',
    width: 24,
  },
});
