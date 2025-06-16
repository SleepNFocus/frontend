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
import { NotFoundPage } from '@/components/common/NotFoundPage';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { SleepRecordPage } from './app/sleep/SleepRecordPage';
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
import { PrivacyNotice } from './app/splash/PrivacyNotice';
import LandingPage from './app/splash/LandingPage';
import MyRecord from './app/tabs/mypage/MyRecord';
import { OnboardingSteps } from './app/splash/OnboardingSteps';
import { IntroCard } from '@/app/splash/IntroCard';

export type RootStackParamList = {
  LandingPage: undefined;
  IntroCard: undefined;
  Onboarding: undefined;
  Dashboard: undefined;
  DailyCheck: undefined;
  History: undefined;
  Insight: undefined;
  More: undefined;
  SurveyStep1: undefined;
  TestSurvey: undefined;
  SocialLogin: undefined;
  SleepRecord: undefined;
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
  MyRecord: undefined;
  NotFound: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LandingPage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="IntroCard" component={IntroCard} />
          <Stack.Screen name="Onboarding" component={OnboardingSteps} />
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
          <Stack.Screen name="MyRecord" component={MyRecord} />
          <Stack.Screen name="NotFound" component={NotFoundPage} />
        </Stack.Navigator>

        <Toast />
      </NavigationContainer>
    </ErrorBoundary>
  );
}
