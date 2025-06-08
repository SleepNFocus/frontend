import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Button } from '@/components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TestStackParamList } from '@/app/test/navigation/TestNavigator';

export default function SleepTestDesc() {
  const navigation =
    useNavigation<NativeStackNavigationProp<TestStackParamList>>();

  const { width: windowWidth } = useWindowDimensions();
  const containerWidth = Math.min(windowWidth * 0.9, 700);

  return (
    <View style={styles.root}>
      <View style={[styles.container, { width: containerWidth }]}>
        <Text style={styles.title}> 현재 인지 능력 측정하기 </Text>
        <Text style={styles.description}>
          이제 당신의 현재 인지 능력을 파악하기 위한 3가지 게임을 진행합니다.
          {`\n`}
          {`\n`}
          평소 플레이하는 것과 동일한 버전이며,
          {`\n`}
          완료까지 약 10~15분 이상 소요될 수 있습니다.
        </Text>
        <Text style={styles.subTitle}>
          집중할 수 있는 조용한 환경에서 시작해 주시기 바랍니다.
        </Text>
        <Button
          title="측정 시작하기"
          variant="outline"
          onPress={() => {
            navigation.navigate('SleepTest1Desc');
          }}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    gap: 70,
    borderColor: '#222',
    borderRadius: 20,
    shadowColor: '#a5a5a5',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 2,
    shadowRadius: 20,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    marginBottom: 24,
    color: '#222',
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    marginBottom: 24,
    color: '#222',
    textAlign: 'center',
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 24,
    color: '#222',
    textAlign: 'center',
  },
});
