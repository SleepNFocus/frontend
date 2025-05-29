import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "../common/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TestSurveyStackParamList } from "../testMain/Navigation";

export default function SleepTestMain() {

    const navigation = useNavigation<NativeStackNavigationProp<TestSurveyStackParamList>>();

    return (
        <LinearGradient
              colors={['#e8eafe', '#fff']}
              style={styles.root}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}>
                <View style={styles.mainBox}>
                    <Text style={styles.title}> Focuz </Text>
                    <Text style={styles.mainText}> 수면 테스트를 진행합니다. </Text>
                    {/* 버튼 공통 컴포넌트 수정 필요 ( variant - 스타일 수정 ) */}
                    <Button title="테스트 시작하기" variant="outline" onPress={()=>navigation.navigate('SleepTestDesc')} />
                </View>
            </LinearGradient>
      );
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