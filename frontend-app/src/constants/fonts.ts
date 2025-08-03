export const fonts = {
  light: 'NanumSquareRoundL',
  regular: 'NanumSquareRoundR', 
  bold: 'NanumSquareRoundB',
  extraBold: 'NanumSquareRoundEB',
} as const;

export type FontFamily = keyof typeof fonts;