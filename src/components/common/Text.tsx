import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

// Text 컴포넌트의 props 타입 정의
interface TextProps {
  children: React.ReactNode; // 텍스트 내용
  variant?:
    | 'displayLarge'
    | 'displayMedium'
    | 'displaySmall'
    | 'headlineLarge'
    | 'headlineMedium'
    | 'headlineSmall'
    | 'titleLarge'
    | 'titleMedium'
    | 'titleSmall'
    | 'bodyLarge'
    | 'bodyMedium'
    | 'bodySmall'
    | 'labelLarge'
    | 'labelMedium'
    | 'labelSmall'; // 텍스트 스타일 종류
  style?: TextStyle; // 커스텀 스타일
  color?: string; // 텍스트 색상
}

// Text: 공통 텍스트 UI 컴포넌트
export const Text: React.FC<TextProps> = ({
  children,
  variant = 'bodyMedium',
  style,
  color,
}) => {
  const theme = useTheme(); // 테마 색상 사용

  // variant에 따라 스타일 반환
  const getTextStyle = () => {
    switch (variant) {
      case 'displayLarge':
        return styles.displayLarge;
      case 'displayMedium':
        return styles.displayMedium;
      case 'displaySmall':
        return styles.displaySmall;
      case 'headlineLarge':
        return styles.headlineLarge;
      case 'headlineMedium':
        return styles.headlineMedium;
      case 'headlineSmall':
        return styles.headlineSmall;
      case 'titleLarge':
        return styles.titleLarge;
      case 'titleMedium':
        return styles.titleMedium;
      case 'titleSmall':
        return styles.titleSmall;
      case 'bodyLarge':
        return styles.bodyLarge;
      case 'bodyMedium':
        return styles.bodyMedium;
      case 'bodySmall':
        return styles.bodySmall;
      case 'labelLarge':
        return styles.labelLarge;
      case 'labelMedium':
        return styles.labelMedium;
      case 'labelSmall':
        return styles.labelSmall;
      default:
        return styles.bodyMedium;
    }
  };

  return (
    <RNText
      style={[
        getTextStyle(),
        { color: color || theme.colors.onSurface }, // 색상 적용
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

// Material Design 3 기준 텍스트 스타일 정의
const styles = StyleSheet.create({
  displayLarge: {
    fontSize: 57,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontSize: 45,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontSize: 36,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontSize: 32,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontSize: 22,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  labelLarge: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
});
