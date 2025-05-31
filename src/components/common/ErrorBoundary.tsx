import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

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

  public render() {
    if (this.state.hasError) {
      // 에러 발생 시 보여줄 UI
      return (
        <View style={styles.container}>
          <Text style={styles.title}>오류가 발생했습니다</Text>
          <Text style={styles.message}>{this.state.error?.message}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text style={styles.buttonText}>다시 시도</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
