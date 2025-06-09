import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '@/constants/colors';

// Button 컴포넌트의 props 타입 정의
interface ButtonProps {
  onPress: () => void; // 버튼 클릭 시 실행 함수
  title: string; // 버튼에 표시될 텍스트
  variant?: 'primary' | 'secondary' | 'outline'; // 버튼 스타일 종류
  disabled?: boolean; // 비활성화 여부
  style?: ViewStyle; // 커스텀 버튼 스타일
  textStyle?: TextStyle; // 커스텀 텍스트 스타일
}

// Button: 공통 버튼 UI 컴포넌트
export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  // variant에 따라 버튼 배경 스타일 반환
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: colors.softBlue };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.deepNavy,
        };
      default:
        return { backgroundColor: colors.deepNavy };
    }
  };

  // variant에 따라 텍스트 색상 스타일 반환
  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return { color: colors.deepNavy };
      default:
        return { color: colors.white };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

// 버튼 스타일 정의
const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
