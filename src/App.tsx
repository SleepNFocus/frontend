import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardPage } from './app/tabs/DashboardPage';
import { DailyCheckPage } from './app/tabs/DailyCheckPage';
import { HistoryPage } from './app/tabs/HistoryPage';
import { InsightPage } from './app/tabs/InsightPage';
import { MorePage } from './app/tabs/MorePage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardPage} />
        <Stack.Screen name="DailyCheck" component={DailyCheckPage} />
        <Stack.Screen name="History" component={HistoryPage} />
        <Stack.Screen name="Insight" component={InsightPage} />
        <Stack.Screen name="More" component={MorePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
