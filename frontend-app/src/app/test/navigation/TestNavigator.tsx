import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SleepTest1Desc from '@/components/sleepTest/SleepTest1Desc';
import SleepTest1 from '@/components/sleepTest/SleepTest1';
import SleepTest2Desc from '@/components/sleepTest/SleepTest2Desc';
import SleepTest2 from '@/components/sleepTest/SleepTest2';
import SleepTestMain from '@/app/test/SleepTestMain';
import SleepTestDesc from '@/app/test/SleepTest';
import SleepTest3Desc from '@/components/sleepTest/SleepTest3Desc';
import SleepTest3 from '@/components/sleepTest/SleepTest3';
import SleepTestResult from '../SleepTestResult';

export type TestStackParamList = {
  SleepTestMain: undefined;
  SleepTestDesc: undefined;
  SleepTest1Desc: undefined;
  SleepTest1: undefined;
  SleepTest2Desc: undefined;
  SleepTest2: undefined;
  SleepTest3Desc: undefined;
  SleepTest3: undefined;
  SleepTestResult: undefined;
};

const Stack = createNativeStackNavigator<TestStackParamList>();

export const TestNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SleepTestMain" component={SleepTestMain} />
      <Stack.Screen name="SleepTestDesc" component={SleepTestDesc} />
      <Stack.Screen name="SleepTest1Desc" component={SleepTest1Desc} />
      <Stack.Screen name="SleepTest1" component={SleepTest1} />
      <Stack.Screen name="SleepTest2Desc" component={SleepTest2Desc} />
      <Stack.Screen name="SleepTest2" component={SleepTest2} />
      <Stack.Screen name="SleepTest3Desc" component={SleepTest3Desc} />
      <Stack.Screen name="SleepTest3" component={SleepTest3} />
      <Stack.Screen name="SleepTestResult" component={SleepTestResult} />
    </Stack.Navigator>
  );
};
