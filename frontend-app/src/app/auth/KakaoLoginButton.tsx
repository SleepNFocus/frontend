import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { loginWithKakao } from './loginWithKakao';

export const KakaoLoginButton = () => {
  const handleLogin = async () => {
    const result = await loginWithKakao();

    if (!result) {
      Alert.alert('로그인 실패', '다시 시도해 주세요');
      return;
    }

    const { token, profile } = result;
    console.log('로그인 성공! 토큰:', token);
    console.log('프로필 정보:', profile);

    // TODO: 백엔드로 토큰 전달하여 JWT 수신 + 상태 저장
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>카카오로 로그인</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FEE500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});
