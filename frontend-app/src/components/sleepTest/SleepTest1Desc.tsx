import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/common/Button';
import { RootStackParamList } from '@/App';

export default function SleepTest1Desc() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { height: windowHeight } = useWindowDimensions();
  const { width: windowWidth } = useWindowDimensions();

  const containerHeight = Math.min(windowHeight * 0.6, 600);
  const containerWidth = Math.min(windowWidth * 0.9, 700);
  const lineWidth = Math.min(windowWidth * 0.8, 600);

  function goToSleepTest1() {
    navigation.navigate('SleepTest1');
  }

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          { width: containerWidth, height: containerHeight },
        ]}
      >
        <View>
          <Text style={styles.title}> 초록 불을 잡아라. </Text>
          <View style={[styles.line, { width: lineWidth }]} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.description}>
            화면에 초록색 원이 나타나면 최대한 빠르게 클릭하세요.
          </Text>
          <Text style={styles.descriptionBold}>[ 5회 측정 ]</Text>
        </View>
        <Button title="시작" variant="outline" onPress={goToSleepTest1} />
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
