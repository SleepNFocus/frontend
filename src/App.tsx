import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardPage } from './app/tabs/DashboardPage';
import { DailyCheckPage } from './app/tabs/DailyCheckPage';
import { HistoryPage } from './app/tabs/HistoryPage';
import { InsightPage } from './app/tabs/InsightPage';
import { MorePage } from './app/tabs/MorePage';
import SurveyStep1 from './components/testMain/SurveyStep1';
import { AdminNavigator } from './app/admin/navigation/AdminNavigator';
import TestSurveyNavigator from './components/testMain/Navigation';
import { SocialLogin } from './app/auth/SocialLogin';

export type RootStackParamList = {
  Dashboard: undefined;
  DailyCheck: undefined;
  History: undefined;
  Insight: undefined;
  More: undefined;
  SurveyStep1: undefined;
  Admin: undefined;
  TestSurvey: undefined;
  SocialLogin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        <Stack.Screen name="SurveyStep1" component={SurveyStep1} />
        <Stack.Screen name="Admin" component={AdminNavigator} />
        <Stack.Screen name="TestSurvey" component={TestSurveyNavigator} />
        <Stack.Screen name="SocialLogin" component={SocialLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
