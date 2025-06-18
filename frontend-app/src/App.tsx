import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { DashboardMain } from './app/tabs/DashboardMain';
import { DailyCheckPage } from './app/tabs/DailyCheckPage';
import { HistoryPage } from './app/tabs/HistoryPage';
import { InsightPage } from './app/tabs/InsightPage';
import { MorePage } from './app/tabs/MorePage';
import { SocialLogin } from './app/auth/SocialLogin';
import { Layout } from '@/components/common/Layout';
import { NotFoundPage } from '@/components/common/NotFoundPage';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { SleepRecordPage } from './app/tabs/sleep/SleepRecordPage';
import { NotificationSettingsPage } from './app/notifications/NotificationSettingsPage';
import Settings from '@/app/tabs/mypage/Settings';
import NicknameEdit from './app/tabs/mypage/NicknameEdit';
import SleepTestMain from './app/tabs/test/SleepTestMain';
import SleepTestDesc from './app/tabs/test/SleepTest';
import SleepTest1Desc from './components/sleepTest/SleepTest1Desc';
import SleepTest1 from './components/sleepTest/SleepTest1';
import SleepTest2Desc from './components/sleepTest/SleepTest2Desc';
import SleepTest2 from './components/sleepTest/SleepTest2';
import SleepTest3Desc from './components/sleepTest/SleepTest3Desc';
import SleepTest3 from './components/sleepTest/SleepTest3';
import SleepTestResult from './app/tabs/test/SleepTestResult';
import { PrivacyNotice } from './app/splash/PrivacyNotice';
import LandingPage from './app/splash/LandingPage';
import { OnboardingSteps } from './app/splash/OnboardingSteps';
import { IntroCard } from '@/app/splash/IntroCard';
import { SplashScreen } from 'expo-router';
import { AISleepTipsScreen } from './components/sleep/AISleepTipsScreen';
import { KakaoWebView } from './app/auth/KakaoWebView';
import { CognitiveResultType } from './types/cognitive';

SplashScreen.preventAutoHideAsync();

const paperTheme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'NanumSquareRoundR',
      fontWeight: 'normal' as const,
    },
    medium: {
      fontFamily: 'NanumSquareRoundB',
      fontWeight: 'normal' as const,
    },
    light: {
      fontFamily: 'NanumSquareRoundL',
      fontWeight: 'normal' as const,
    },
    thin: {
      fontFamily: 'NanumSquareRoundL',
      fontWeight: 'normal' as const,
    },
  },
};

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
  SleepTestResult: {
    basic: CognitiveResultType;
  };
  PrivacyNotice: undefined;
  DailyCheckScreen: undefined;
  NotFound: undefined;
  AISleepTips: { date: string; score: number };
  KakaoWebView: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    NanumSquareRoundL: require('./assets/fonts/NanumSquareRoundL.ttf'),
    NanumSquareRoundR: require('./assets/fonts/NanumSquareRoundR.ttf'),
    NanumSquareRoundB: require('./assets/fonts/NanumSquareRoundB.ttf'),
    NanumSquareRoundEB: require('./assets/fonts/NanumSquareRoundEB.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <QueryClientProvider client={queryClient}>
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
                name="AISleepTips"
                component={AISleepTipsScreen}
                options={{ headerShown: true, title: 'AI 수면 분석' }}
              />
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
              <Stack.Screen
                name="SleepTestResult"
                component={SleepTestResult}
              />
              <Stack.Screen name="PrivacyNotice" component={PrivacyNotice} />
              <Stack.Screen
                name="DailyCheckScreen"
                component={DailyCheckPage}
              />
              <Stack.Screen name="NotFound" component={NotFoundPage} />
              <Stack.Screen name="KakaoWebView" component={KakaoWebView} />
            </Stack.Navigator>

            <Toast />
          </NavigationContainer>
        </ErrorBoundary>
      </QueryClientProvider>
    </PaperProvider>
  );
}
