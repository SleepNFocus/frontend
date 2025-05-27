import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

// SocialLogin: 소셜 로그인 버튼만 보여주는 목업 컴포넌트
export const SocialLogin: React.FC = () => {
  const theme = useTheme();

  // 소셜 로그인 버튼 클릭 시 임시 알림
  const handleSocialLogin = (provider: string) => {
    alert(`${provider} 로그인은 아직 구현되지 않았습니다.`);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>소셜 로그인</Text>
      {/* 구글 로그인 버튼 */}
      <Button
        mode="contained"
        icon={() => (
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }} style={styles.icon} />
        )}
        onPress={() => handleSocialLogin('구글')}
        style={[styles.button, { backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1 }]}
        labelStyle={{ color: '#222' }}
        contentStyle={{ paddingVertical: 8 }}
      >
        구글로 로그인
      </Button>
      {/* 카카오 로그인 버튼 */}
      <Button
        mode="contained"
        icon={() => (
          <Image source={{ uri: 'https://developers.kakao.com/tool/resource/static/img/button/kakaoAccount/kakao_account_login_btn_medium_narrow.png' }} style={styles.icon} />
        )}
        onPress={() => handleSocialLogin('카카오')}
        style={[styles.button, { backgroundColor: '#FEE500' }]}
        labelStyle={{ color: '#3C1E1E' }}
        contentStyle={{ paddingVertical: 8 }}
      >
        카카오로 로그인
      </Button>
    </View>
  );
};

// 스타일 정의 (Material Design 3 기준)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    width: 260,
    marginBottom: 16,
    borderRadius: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: 'contain',
  },
}); 