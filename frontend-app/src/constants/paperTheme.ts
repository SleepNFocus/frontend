import { DefaultTheme } from 'react-native-paper';
import { fonts } from '@/constants/fonts';

export const paperTheme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: fonts.regular, 
      fontWeight: 'normal' as const,
    },
    medium: {
      fontFamily: fonts.bold,  
      fontWeight: 'normal' as const,
    },
    light: {
      fontFamily: fonts.light, 
      fontWeight: 'normal' as const,
    },
    thin: {
      fontFamily: fonts.light, 
      fontWeight: 'normal' as const,
    },
  },
};