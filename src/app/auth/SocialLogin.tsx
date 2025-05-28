import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

export const SocialLogin: React.FC = () => {
  const theme = useTheme();
  const [isStarted, setIsStarted] = useState(false);
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

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        소셜 로그인
      </Text>

      {!isStarted && (
        <Button
          mode="contained"
          onPress={() => setIsStarted(true)}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          labelStyle={{ color: '#fff' }}
          contentStyle={{ paddingVertical: 8 }}
        >
          시작하기
        </Button>
      )}

      {isStarted && (
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
            labelStyle={{ color: '#3C1E1E' }}
            contentStyle={{ paddingVertical: 8 }}
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
            style={[styles.button, { backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1 }]}
            labelStyle={{ color: '#222' }}
            contentStyle={{ paddingVertical: 8 }}
          >
            구글로 로그인
          </Button>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginBottom: 16,
    width: 260,
  },
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
  icon: {
    height: 24,
    marginRight: 8,
    resizeMode: 'contain',
    width: 24,
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
});
