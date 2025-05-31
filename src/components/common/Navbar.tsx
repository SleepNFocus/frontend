import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text } from './Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useResponsive } from '../../hooks/useResponsive';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '@/constants/colors';

const NAV_ITEMS = [
  { label: '대시보드', icon: 'home-outline', route: 'Dashboard' },
  { label: '데일리체크', icon: 'play-circle-outline', route: 'SleepRecord' },
  { label: '히스토리', icon: 'chart-bar', route: 'History' },
  { label: '인사이트', icon: 'lightbulb-outline', route: 'SleepInsights' },
  { label: '내 정보', icon: 'account-outline', route: 'MyPage' },
  { label: '더보기', icon: 'dots-horizontal', route: 'More' },
  { label: '테스트', icon: 'clipboard-text-outline', route: 'Navigation' },
  { label: '관리자', icon: 'account-cog-outline', route: 'Admin' },
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

  const handleAdminClick = () => {
    navigation.navigate('Admin' as never);
  };

  const handleLogout = () => {
    navigation.navigate('SocialLogin' as never);
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
        {NAV_ITEMS.filter(item => item.route !== 'Navigation').map((item) => (
          <TouchableOpacity 
            key={item.label} 
            style={styles.mobileMenuBtn}
            onPress={() => handleNavigation(item.route)}
          >
            <MaterialCommunityIcons 
              name={item.icon} 
              size={22} 
              style={styles.mobileIcon} 
              color={currentRoute === item.route ? colors.deepNavy : colors.mediumGray} 
            />
            <Text
              style={{
                ...styles.mobileMenu,
                color: currentRoute === item.route ? colors.deepNavy : colors.mediumGray,
                fontWeight: currentRoute === item.route ? 'bold' : '500',
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  // PC: 기존 상단 네비게이션 바 (아이콘 추가)
  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>FOCUZ</Text>
      <View style={styles.menuWrap}>
        {NAV_ITEMS.slice(0, 5).map((item) => (
          <TouchableOpacity 
            key={item.label}
            onPress={() => handleNavigation(item.route)}
            style={styles.menuItem}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={20}
              style={styles.menuIcon}
              color={currentRoute === item.route ? colors.deepNavy : colors.mediumGray}
            />
            <Text style={currentRoute === item.route
              ? { ...styles.menu, color: colors.deepNavy, fontWeight: 'bold' }
              : { ...styles.menu, color: colors.mediumGray }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.rightWrap}>
        <Text style={styles.icon}>🌱</Text>
        <TouchableOpacity style={styles.settingBtn} onPress={handleAdminClick}>
          <Text style={styles.settingText}>관리자</Text>
        </TouchableOpacity>
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
    color: colors.softBlue,
    letterSpacing: 1,
  },
  menuWrap: {
    flexDirection: 'row',
    gap: 36,
    alignItems: 'center',
  },
  menu: {
    fontSize: 16,
    color: colors.textColor,
    fontWeight: '500',
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
  settingBtn: {
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: colors.white,
  },
  settingText: {
    fontSize: 15,
    color: colors.textColor,
    fontWeight: '500',
  },
  logout: {
    fontSize: 15,
    color: colors.textColor,
    fontWeight: '500',
  },
  // 모바일/태블릿 하단 네비게이션 바
  mobileBar: {
    position: 'absolute',
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
    gap: 2,
  },
  mobileIcon: {
    fontSize: 22,
    marginBottom: 2,
    color: colors.mediumGray,
  },
  mobileMenu: {
    fontSize: 13,
    fontWeight: '500',
  },
  menuActive: {
    color: colors.softBlue,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  menuIcon: {
    marginRight: 2,
  },
});

export default Navbar; 