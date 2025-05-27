import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';

// Layout 컴포넌트의 props 타입 정의
interface LayoutProps {
  children: React.ReactNode; // 레이아웃 내부에 들어갈 자식 요소
}

// Layout: 화면 전체를 감싸는 공통 레이아웃 컴포넌트
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme(); // 테마 색상 사용

  return (
    // SafeAreaView: 노치/엣지 등 안전 영역 보장
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

// 레이아웃 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
}); 