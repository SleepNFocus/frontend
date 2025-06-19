import { View, Animated, StyleSheet, useWindowDimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Text';
import { GlassCard } from '../common/Card';
import { RootStackParamList } from '@/App';
import { useEffect, useRef } from 'react';
import { Layout } from '../common/Layout';

export default function SleepTest2Desc() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { height: windowHeight } = useWindowDimensions();
  const { width: windowWidth } = useWindowDimensions();

  const containerHeight = Math.min(windowHeight * 0.6, 600);
  const containerWidth = Math.min(windowWidth * 0.9, 700);
  const lineWidth = Math.min(windowWidth * 0.8, 600);

  function goToSleepTest2() {
    navigation.navigate('SleepTest2');
  }

  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  const changeColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#5a6da388', '#5A6EA3'],
  });

  return (
    <Layout>
      <View style={styles.root}>
        <GlassCard
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
            <View style={styles.symbolBox}>
              <Animated.Text style={[styles.symbol, { color: changeColor }]}>
                ♥︎ ✦ ♠︎ ▲ ◉ ★ ▼ ☗ ◆
              </Animated.Text>
            </View>
            <Text style={styles.descriptionBold}>[ 제한 시간 60초 ]</Text>
          </View>
          <Button
            title="시작"
            variant="primary"
            style={styles.button}
            onPress={goToSleepTest2}
          />
        </GlassCard>
      </View>
    </Layout>
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
    backgroundColor: 'rgba(255, 255, 255, 0.600)',
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
    lineHeight: 30,
    fontSize: 27,
    marginBottom: 30,
    color: '#0F1C36',
    textAlign: 'center',
    textShadowColor: '#70707050',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 2,
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
    color: '#0F1C36',
  },
  symbolBox: {
    margin: 10,
  },
  symbol: {
    fontSize: 20,
    letterSpacing: 2.5,
  },
  button: {
    width: 70,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#909090',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});
