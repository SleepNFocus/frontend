import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 900;
  const isTablet = width > 900 && width <= 1200;
  const isDesktop = width > 1200;
  return { width, isMobile, isTablet, isDesktop };
} 