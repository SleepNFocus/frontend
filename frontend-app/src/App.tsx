import React from 'react';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DashboardMain } from './app/tabs/DashboardMain';
import { DailyCheckPage } from './app/tabs/DailyCheckPage';
import { HistoryPage } from './app/tabs/HistoryPage';
import { InsightPage } from './app/tabs/InsightPage';
import { MorePage } from './app/tabs/MorePage';
import { SocialLogin } from './app/auth/SocialLogin';
import { Layout } from '@/components/common/Layout';
import { SleepRecordPage } from './app/sleep/SleepRecordPage';
import { SleepInsightsPage } from './app/sleep/SleepInsightPage';
import { NotificationSettingsPage } from './app/notifications/NotificationSettingsPage';
import Settings from '@/app/tabs/mypage/Settings';
import NicknameEdit from './app/tabs/mypage/NicknameEdit';
import SleepTestMain from './app/test/SleepTestMain';
import SleepTestDesc from './app/test/SleepTest';
import SleepTest1Desc from './components/sleepTest/SleepTest1Desc';
import SleepTest1 from './components/sleepTest/SleepTest1';
import SleepTest2Desc from './components/sleepTest/SleepTest2Desc';
import SleepTest2 from './components/sleepTest/SleepTest2';
import SleepTest3Desc from './components/sleepTest/SleepTest3Desc';
import SleepTest3 from './components/sleepTest/SleepTest3';
import SleepTestResult from './app/test/SleepTestResult';
import { PrivacyNotice } from './app/tabs/PrivacyNotice';
import { Loading } from './app/tabs/Loading';

export type RootStackParamList = {
  Dashboard: undefined;
  DailyCheck: undefined;
  History: undefined;
  Insight: undefined;
  More: undefined;
  SurveyStep1: undefined;
  TestSurvey: undefined;
  SocialLogin: undefined;
  SleepRecord: undefined;
  SleepInsights: { recordData?: any } | undefined;
  NotificationSettings: undefined;
  Settings: undefined;
  NicknameEdit: undefined;
  SleepTestMain: undefined;
  SleepTestDesc: undefined;
  SleepTest1Desc: undefined;
  SleepTest1: undefined;
  SleepTest2Desc: undefined;
  SleepTest2: undefined;
  SleepTest3Desc: undefined;
  SleepTest3: undefined;
  SleepTestResult: undefined;
  PrivacyNotice: undefined;
  Loading: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardMain} />
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
        <Stack.Screen name="SleepRecord" component={SleepRecordPage} />
        <Stack.Screen name="SleepInsights" component={SleepInsightsPage} />
        <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettingsPage}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="NicknameEdit" component={NicknameEdit} />
        <Stack.Screen name="SleepTestMain" component={SleepTestMain} />
        <Stack.Screen name="SleepTestDesc" component={SleepTestDesc} />
        <Stack.Screen name="SleepTest1Desc" component={SleepTest1Desc} />
        <Stack.Screen name="SleepTest1" component={SleepTest1} />
        <Stack.Screen name="SleepTest2Desc" component={SleepTest2Desc} />
        <Stack.Screen name="SleepTest2" component={SleepTest2} />
        <Stack.Screen name="SleepTest3Desc" component={SleepTest3Desc} />
        <Stack.Screen name="SleepTest3" component={SleepTest3} />
        <Stack.Screen name="SleepTestResult" component={SleepTestResult} />
        <Stack.Screen name="PrivacyNotice" component={PrivacyNotice} />
        <Stack.Screen name="Loading" component={Loading} />
      </Stack.Navigator>

      <Toast />
    </NavigationContainer>
  );
}
