import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { AdminDashboard } from 'src/app/admin/Dashboard';
import { UserManagement } from 'src/app/admin/UserManagement';
import { TestManagement } from 'src/app/admin/TestManagement';
import { Analytics } from 'src/app/admin/Analytics';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AdminTabs = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: 'white',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={AdminDashboard}
        options={{ title: '대시보드', tabBarLabel: '대시보드' }}
      />
      <Tab.Screen
        name="UserManagement"
        component={UserManagement}
        options={{ title: '사용자 관리', tabBarLabel: '사용자' }}
      />
      <Tab.Screen
        name="TestManagement"
        component={TestManagement}
        options={{ title: '테스트 관리', tabBarLabel: '테스트' }}
      />
      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{ title: '통계', tabBarLabel: '통계' }}
      />
    </Tab.Navigator>
  );
};

export const AdminNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminMain"
        component={AdminTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}; 