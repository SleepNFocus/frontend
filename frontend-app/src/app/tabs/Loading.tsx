import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';

// Loading: 로딩 상태를 표시하는 공통 컴포넌트 (배경 그라데이션 적용)
export const Loading: React.FC = () => {
  const theme = useTheme(); // 테마 색상 사용

  return (
    <LinearGradient
      colors={[colors.lightGray, colors.softBlue, colors.deepNavy]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {/* ActivityIndicator: 로딩 스피너 */}
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </LinearGradient>
  );
};

export default Loading;

// 로딩 화면 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
