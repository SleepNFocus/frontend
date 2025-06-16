import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Layout } from '@/components/common/Layout';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { colors } from '@/constants/colors';

// ErrorBoundary 컴포넌트의 props 타입 정의
interface Props {
  children: ReactNode; // 자식 컴포넌트
}

// ErrorBoundary의 상태 타입 정의
interface State {
  hasError: boolean; // 에러 발생 여부
  error: Error | null; // 에러 객체
}

// ErrorBoundary: 자식 컴포넌트에서 에러 발생 시 UI를 대체하여 보여주는 컴포넌트
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  // 에러 발생 시 상태를 변경
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // 실제로 에러가 발생했을 때 호출되는 메서드(로깅 등)
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  // 홈으로 이동하는 함수 (클래스 컴포넌트에서는 navigation hook 사용 불가)
  private handleGoHome = () => {
    // 페이지 새로고침으로 대체 (웹) 또는 앱 재시작
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  public render() {
    if (this.state.hasError) {
      // 에러 발생 시 보여줄 UI
      return (
        <Layout showLogo={false}>
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name="warning-outline" 
                size={80} 
                color={colors.red} 
              />
            </View>
            
            <View style={styles.textContainer}>
              <Text variant="headlineSmall" style={styles.title}>
                오류가 발생했습니다
              </Text>
              <Text variant="bodyLarge" style={styles.message}>
                {this.state.error?.message || '예상치 못한 오류가 발생했습니다.'}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="다시 시도"
                variant="outline"
                onPress={() => this.setState({ hasError: false, error: null })}
                style={styles.retryButton}
              />
              <Button
                title="홈으로 돌아가기"
                variant="primary"
                onPress={this.handleGoHome}
                style={styles.homeButton}
              />
            </View>
          </View>
        </Layout>
      );
    }

    // 에러가 없으면 자식 컴포넌트 렌더링
    return this.props.children;
  }
}

// 에러 UI 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 32,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    color: colors.mediumGray,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 12,
  },
  retryButton: {
    borderColor: colors.red,
  },
  homeButton: {
    backgroundColor: colors.red,
  },
});
