import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SurveyStep1 from './SurveyStep1';
import TestScreen from './TestScreen';
// import SurveyStep2 from './SurveyStep2';
// import SurveyStep3 from './SurveyStep3';
// import SurveyStep4 from './SurveyStep4';

export type TestSurveyStackParamList = {
    // 전달 인자 없기 때문에 undefined 로 type 설정
    TestScreen: undefined;
    SurveyStep1: undefined;
    // SurveyStep2: undefined;
    // SurveyStep3: undefined;
    // SurveyStep4: undefined;
  };
  
  const Stack = createNativeStackNavigator<TestSurveyStackParamList>();

export default function TestSurveyNavigator() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="SurveyStep1" component={SurveyStep1} />
        {/* <Stack.Screen name="SurveyStep2" component={SurveyStep2} />
        <Stack.Screen name="SurveyStep3" component={SurveyStep3} />
        <Stack.Screen name="SurveyStep4" component={SurveyStep4} /> */}
      </Stack.Navigator>
  );
}