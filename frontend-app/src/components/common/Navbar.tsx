import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '@/constants/colors';

const NAV_ITEMS = [
  { icon: 'chart-bar', route: 'History' },
  { icon: 'play-circle-outline', route: 'SleepRecord' },
  { icon: 'home-outline', route: 'Dashboard' },
  { icon: 'lightbulb-outline', route: 'Insight' },
  { icon: 'dots-horizontal', route: 'More' },
];

export const Navbar: React.FC = () => {
  let navigation;
  let route;

  try {
    navigation = useNavigation();
    route = useRoute();
  } catch (e) {
    console.warn('❗ Navigation 객체 없음 (Navbar NavigationContainer 외부)');
    return null;
  }

  const currentRoute = route.name;

  const handleNavigation = (route: string) => {
    navigation.navigate(route as never);
  };

  const getIconColor = (routeName: string) => {
    return currentRoute === routeName ? colors.textColor : colors.mediumGray;
  };

  return (
    <View style={styles.navbar}>
      {NAV_ITEMS.map(item => (
        <TouchableOpacity
          key={item.icon}
          style={styles.menuItem}
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
};

const styles = StyleSheet.create({
  navbar: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
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
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export default Navbar;
