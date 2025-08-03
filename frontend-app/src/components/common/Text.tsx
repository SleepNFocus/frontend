import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { TextProps as RNTextProps } from 'react-native';

export interface TextProps extends RNTextProps {
  children: React.ReactNode;
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
    | 'labelSmall';
  style?: TextStyle | TextStyle[];
  color?: string;
  fontFamily?: keyof typeof fonts;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'bodyMedium',
  style,
  color,
  fontFamily,
}) => {
  const getTextStyle = () => {
    const baseStyle = styles[variant] || styles.bodyMedium;

    let selectedFont: keyof typeof fonts = 'regular';

    if (fontFamily) {
      selectedFont = fontFamily;
    } else {
      const fontWeight = String(baseStyle.fontWeight);
      if (fontWeight === '700' || fontWeight === 'bold') {
        selectedFont = 'bold';
      } else if (fontWeight === '800') {
        selectedFont = 'extraBold';
      } else if (fontWeight === '300') {
        selectedFont = 'light';
      } else {
        selectedFont = 'regular';
      }
    }

    return {
      ...baseStyle,
      fontFamily: fonts[selectedFont],
    };
  };

  return (
    <RNText
      style={[
        { fontFamily: fonts.regular },
        getTextStyle(),
        { color: color || colors.deepNavy },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  displayLarge: {
    fontSize: 57,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontSize: 45,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontSize: 14,
    fontWeight: '700',
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
    fontWeight: '700',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
});
