import React from 'react';
import Toast from 'react-native-toast-message';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardPage } from './app/tabs/DashboardPage';
import { DailyCheckPage } from './app/tabs/DailyCheckPage';
import { HistoryPage } from './app/tabs/HistoryPage';
import { InsightPage } from './app/tabs/InsightPage';
import { MorePage } from './app/tabs/MorePage';
import { SocialLogin } from './app/auth/SocialLogin';
import Mypage from '@/app/mypage/Mypage';
import { Layout } from '@/components/common/Layout';
import { SleepRecordPage } from './app/sleep/SleepRecordPage';
import { SleepInsightsPage } from './app/sleep/SleepInsightPage';
import { NotificationSettingsPage } from './app/notifications/NotificationSettingsPage';
import {
  TestNavigator,
  TestStackParamList,
} from './app/test/navigation/TestNavigator';

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
  MyPage: undefined;
  SleepRecord: undefined;
  SleepInsights: { recordData?: any } | undefined;
  NotificationSettings: undefined;
  TestNavigator: NavigatorScreenParams<TestStackParamList>;
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
        <Stack.Screen name="DailyCheck">
          {() => (
            <Layout>
              <DailyCheckPage />
            </Layout>
          )}
        </Stack.Screen>
        <Stack.Screen name="History" component={HistoryPage} />
        <Stack.Screen name="Insight" component={InsightPage} />
        <Stack.Screen name="More" component={MorePage} />
        <Stack.Screen name="SocialLogin" component={SocialLogin} />
        <Stack.Screen name="MyPage" component={Mypage} />
        <Stack.Screen name="SleepRecord" component={SleepRecordPage} />
        <Stack.Screen name="SleepInsights" component={SleepInsightsPage} />
        <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettingsPage}
        />
        <Stack.Screen name="TestNavigator" component={TestNavigator} />
      </Stack.Navigator>
           <Toast />
    </NavigationContainer>
  );
}
