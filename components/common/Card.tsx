import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

// Card 컴포넌트의 props 타입 정의
interface CardProps {
  children: React.ReactNode; // 카드 내부에 들어갈 자식 요소
  style?: ViewStyle;        // 카드의 커스텀 스타일
  elevation?: number;       // 그림자 깊이(기본값 2)
  onPress?: () => void;     // 카드 클릭 시 실행할 함수(선택)
}

// Card: 공통 카드 UI 컴포넌트
export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 2,
  onPress,
}) => {
  const theme = useTheme(); // 테마 색상 사용

  // 카드의 실제 내용(스타일 적용)
  const cardContent = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface, // 테마 표면색
          elevation,                             // 그림자 깊이
          shadowColor: theme.colors.shadow,      // 그림자 색상
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  // onPress가 있으면 TouchableOpacity로 감싸서 클릭 가능하게 함
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        {cardContent}
      </TouchableOpacity>
    );
  }

  // 클릭 기능이 없으면 그냥 View 반환
  return cardContent;
};

// 카드 스타일 정의
const styles = StyleSheet.create({
  card: {
    borderRadius: 8,      // 모서리 둥글게
    padding: 16,          // 내부 여백
    marginVertical: 8,    // 위아래 여백
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,  // 그림자 투명도
    shadowRadius: 3.84,   // 그림자 번짐
  },
}); 