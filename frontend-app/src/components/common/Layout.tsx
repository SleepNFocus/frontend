import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navbar } from './Navbar';
import { colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from '@/components/common/Modal';

// Layout 컴포넌트의 props 타입 정의
interface LayoutProps {
  children: React.ReactNode; // 레이아웃 내부에 들어갈 자식 요소
}

// Layout: 화면 전체를 감싸는 공통 레이아웃 컴포넌트
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // SafeAreaView: 노치/엣지 등 안전 영역 보장
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <LinearGradient
        colors={[colors.softBlue, colors.white]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.logoContainer}>
          <Image source={require('@/assets/focuz_name_logo.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.content}>{children}</View>
        <Navbar />
        <Modal type="success" />
        <Modal type="error" />
        <Modal type="warning" />
        <Modal type="info" />
        <Modal type="confirm" />
      </LinearGradient>
    </SafeAreaView>
  );
};

// 레이아웃 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  logo: {
    width: 100,
    height: 20,
    marginBottom: 0,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 80, // 네비게이션 바 높이(64) + 여유 공간(16)
  },
});
