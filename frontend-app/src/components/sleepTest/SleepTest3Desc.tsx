import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TestStackParamList } from '@/app/test/navigation/TestNavigator';

export default function SleepTest3Desc() {
  const navigation =
    useNavigation<NativeStackNavigationProp<TestStackParamList>>();

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}> 격자 기억하기 </Text>
          <View style={styles.line} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.description}>
            화면에 잠시 표시되는 격자 패턴을 기억한 후, 같은 위치를 클릭하세요.
          </Text>
          <Text style={styles.descriptionBold}> [ 총 3라운드로 진행 ] </Text>
          <Text style={styles.description}>
            {' '}
            라운드마다 기억해야 할 패턴이 더 복잡해집니다.{' '}
          </Text>
        </View>
        <Button
          title="시작"
          variant="outline"
          onPress={() => {
            navigation.navigate('SleepTest3');
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
    width: 300,
    height: 400,
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
  },
  textContainer: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#bfbfbf',
    height: 1,
    width: 280,
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
  descriptionBold: {
    fontSize: 15,
    fontWeight: 'bold',
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
