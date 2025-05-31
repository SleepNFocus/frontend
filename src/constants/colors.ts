export const colors = {
  // Primary Colors
  deepNavy: '#2A3D66',
  midnightBlue: '#3F4F80',
  softBlue: '#5A6EA3',
  textColor: '#0F1C36',

  // Accent Colors
  goldOrange: '#F7A325',
  softOrange: '#FFB74D',
  lightGold: '#FFD180',

  // Neutral Colors
  lightGray: '#F2F4F7',
  mediumLightGray: '#DFE3EA',
  mediumGray: '#CBD3DF',
  white: '#FFFFFF',
} as const;

// TypeScript 타입 정의
export type ColorKey = keyof typeof colors;