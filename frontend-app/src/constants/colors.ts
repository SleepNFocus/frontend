export const colors = {
  // Primary Colors
  deepNavy: '#2A3D66',
  midnightBlue: '#3F4F80',
  softBlue: '#5A6EA3',
  textColor: '#0F1C36',
  bgColor: '#d0dff4',

  // Accent Colors
  goldOrange: '#F7A325',
  softOrange: '#FFB74D',
  lightGold: '#FFD180',

  // Neutral Colors
  lightGray: '#F2F4F7',
  mediumLightGray: '#DFE3EA',
  mediumGray: '#CBD3DF',
  white: '#FFFFFF',

  // New Colors
  red: '#EF4444', // error
  green: '#22C55E', // success
  blue: '#3B82F6', // info
  yellow: '#EAB308', // warning

  // Score Feedback Colors
  scoreExcellent: '#22C55E', // 90점 이상
  scoreGood: '#A3E635', // 70-89점 (비비드한 연두색)
  scoreNormal: '#FF9800', // 50-69점
  scorePoor: '#EF4444', // 50점 미만
} as const;

// TypeScript 타입 정의
export type ColorKey = keyof typeof colors;
