import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text } from './Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useResponsive } from '../../hooks/useResponsive';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '@/constants/colors';

const NAV_ITEMS = [
  { icon: 'chart-bar', route: 'History' },
  { icon: 'play-circle-outline', route: 'SleepRecord' },
  { icon: 'home-outline', route: 'Dashboard' },
  { icon: 'lightbulb-outline', route: 'SleepInsights' },
  { icon: 'dots-horizontal', route: 'More' },
  { icon: 'clipboard-text-outline', route: 'Navigation' },
];

export const Navbar: React.FC = () => {
  const { isMobile } = useResponsive();
  const isWeb = Platform.OS === 'web';
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = route.name;

  const handleNavigation = (route: string) => {
    navigation.navigate(route as never);
  };

  const handleLogout = () => {
    navigation.navigate('SocialLogin' as never);
  };

  const getIconColor = (routeName: string) => {
    return currentRoute === routeName ? colors.textColor : colors.mediumGray;
  };

  if (isMobile) {
    // 모바일/태블릿: 하단 네비게이션 바
    return (
      <View
        style={[
          styles.mobileBar,
          isWeb && {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
          },
        ]}
      >
        {NAV_ITEMS.filter(item => item.route !== 'Navigation').map(item => (
          <TouchableOpacity
            key={item.icon}
            style={styles.mobileMenuBtn}
            onPress={() => handleNavigation(item.route)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={28}
              color={getIconColor(item.route)}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  // PC: 기존 상단 네비게이션 바 (아이콘만)
  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>FOCUZ</Text>
      <View style={styles.menuWrap}>
        {NAV_ITEMS.slice(0, 5).map(item => (
          <TouchableOpacity
            key={item.icon}
            onPress={() => handleNavigation(item.route)}
            style={styles.menuItem}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={28}
              color={getIconColor(item.route)}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.rightWrap}>
        <Text style={styles.icon}>🌱</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    height: 56,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumLightGray,
    shadowColor: colors.lightGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
    zIndex: 10,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.textColor,
    letterSpacing: 1,
  },
  menuWrap: {
    flexDirection: 'row',
    gap: 36,
    alignItems: 'center',
  },
  menuItem: {
    padding: 8,
  },
  rightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  logout: {
    fontSize: 15,
    color: colors.textColor,
    fontWeight: '500',
  },
  // 모바일/태블릿 하단 네비게이션 바
  mobileBar: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.mediumLightGray,
    shadowColor: colors.lightGray,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    zIndex: 100,
  },
  mobileMenuBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navbar;
