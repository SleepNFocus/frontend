import { Dimensions } from 'react-native';

// 현재 디바이스의 화면 너비와 높이를 가져옵니다.
const { width, height } = Dimensions.get('window');

// 화면의 전체 너비와 높이를 상수로 정의합니다.
export const SCREEN_WIDTH = width; // 화면 너비
export const SCREEN_HEIGHT = height; // 화면 높이

// 반응형 폰트 사이즈를 위한 객체입니다.
// 화면 너비에 따라 폰트 크기를 동적으로 계산합니다.
export const fontSize = {
  xs: SCREEN_WIDTH * 0.03, // 매우 작은 폰트 (약 12px)
  sm: SCREEN_WIDTH * 0.035, // 작은 폰트 (약 14px)
  md: SCREEN_WIDTH * 0.04, // 기본 폰트 (약 16px)
  lg: SCREEN_WIDTH * 0.045, // 약간 큰 폰트 (약 18px)
  xl: SCREEN_WIDTH * 0.05, // 큰 폰트 (약 20px)
  xxl: SCREEN_WIDTH * 0.06, // 매우 큰 폰트 (약 24px)
};

// 반응형 패딩 및 마진을 위한 객체입니다.
// 화면 너비에 따라 여백 값을 동적으로 계산합니다.
export const spacing = {
  xs: SCREEN_WIDTH * 0.01, // 매우 작은 여백 (약 4px)
  sm: SCREEN_WIDTH * 0.02, // 작은 여백 (약 8px)
  md: SCREEN_WIDTH * 0.03, // 기본 여백 (약 12px)
  lg: SCREEN_WIDTH * 0.04, // 약간 큰 여백 (약 16px)
  xl: SCREEN_WIDTH * 0.05, // 큰 여백 (약 20px)
  xxl: SCREEN_WIDTH * 0.06, // 매우 큰 여백 (약 24px)
};

// 디바이스의 크기를 기준으로 타입을 구분합니다.
// 작은 기기: 375px 미만, 중간 기기: 375~413px, 큰 기기: 414px 이상
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = SCREEN_WIDTH >= 414;

// 반응형 스타일을 적용할 때 사용하는 헬퍼 함수입니다.
// 작은 기기에서는 폰트와 패딩을 0.9배로 줄여줍니다.
export const getResponsiveStyle = (styles: any) => {
  return {
    ...styles,
    fontSize: isSmallDevice ? styles.fontSize * 0.9 : styles.fontSize,
    padding: isSmallDevice ? styles.padding * 0.9 : styles.padding,
  };
};
