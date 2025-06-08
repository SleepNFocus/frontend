import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Button } from '@/components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TestStackParamList } from '@/app/test/navigation/TestNavigator';

export default function SleepTest2Desc() {
  const navigation =
    useNavigation<NativeStackNavigationProp<TestStackParamList>>();

  const { width: windowWidth } = useWindowDimensions();
  const { height: windowHeight } = useWindowDimensions();

  const containerWidth = Math.min(windowWidth * 0.9, 700);
  const containerHeight = Math.min(windowHeight * 0.6, 600);
  const lineWidth = Math.min(windowWidth * 0.8, 600);

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          { width: containerWidth, height: containerHeight },
        ]}
      >
        <View>
          <Text style={styles.title}> 기호 - 숫자 변환 </Text>
          <View style={[styles.line, { width: lineWidth }]} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.description}>
            화면 상단의 [ 기호 - 숫자 ] 짝을 기억하고, {`\n`} 아래에 나타나는
            기호에 해당하는 숫자를 빠르게 입력하세요.
          </Text>
          <Text style={styles.descriptionBold}>
            [ 제한 시간은 1분 입니다. ]
          </Text>
        </View>
        <Button
          title="시작"
          variant="outline"
          onPress={() => {
            navigation.navigate('SleepTest2');
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
    gap: 35,
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
  textContainer: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#bfbfbf',
    height: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 27,
    marginBottom: 50,
    color: '#222',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginBottom: 24,
    color: '#222',
    textAlign: 'center',
  },
  descriptionBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 24,
    color: '#222',
    textAlign: 'center',
  },
});
