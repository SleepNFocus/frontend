import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "src/components/common/Button";
import { useNavigation } from '@react-navigation/native';
import { TestSurveyStackParamList } from './Navigation';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function TestScreen () {

    const navigation = useNavigation<NativeStackNavigationProp<TestSurveyStackParamList>>();

    return(
    <LinearGradient
      colors={['#e8eafe', '#fff']}
      style={styles.root}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}>
        <View style={styles.mainBox}>
            <Text style={styles.title}> Focuz </Text>
            <Text style={styles.mainText}> 평소 수면 습관을 알려주세요. </Text>
            {/* 버튼 공통 컴포넌트 수정 필요 ( variant - 스타일 수정 ) */}
            <Button title="설문 시작하기" variant="outline" onPress={()=>navigation.navigate('SurveyStep1')} />
        </View>
    </LinearGradient>
    )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBox: {
    alignItems: 'center',
  },
  title: {
    color: '#6C7BFF',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 16,
    letterSpacing: 1,
    textAlign: 'center',
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 24,
    color: '#222',
    textAlign: 'center',
  },
}); 