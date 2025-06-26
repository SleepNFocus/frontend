import { View, Animated, StyleSheet, useWindowDimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Text';
import { GlassCard } from '../common/Card';
import { RootStackParamList } from '@/App';
import { useEffect, useRef } from 'react';
import { Layout } from '../common/Layout';

const SQUARE = 4;

export default function SleepTest3Desc() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { height: windowHeight } = useWindowDimensions();
  const { width: windowWidth } = useWindowDimensions();

  const containerHeight = Math.min(windowHeight * 0.7, 600);
  const containerWidth = Math.min(windowWidth * 0.9, 700);
  const lineWidth = Math.min(windowWidth * 0.8, 600);

  function goToSleepTest3() {
    navigation.navigate('SleepTest3');
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
    outputRange: ['#0f1c36c0', '#0F1C36'],
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
            <Text style={styles.title}> 격자 기억하기 </Text>
            <View style={[styles.line, { width: lineWidth }]} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.description}>
              화면에 잠시 표시되는 격자 패턴을 기억한 후, 같은 위치를
              클릭하세요.
            </Text>
            <View style={styles.squareBox}>
              {Array.from({ length: SQUARE }).map((_, index) => (
                <Animated.View
                  key={index}
                  style={[styles.square, { backgroundColor: changeColor }]}
                />
              ))}
            </View>
            <Text style={styles.descriptionBold}> [ 총 3라운드로 진행 ] </Text>
            <Text style={styles.description}>
              라운드마다 기억해야 할 패턴이 더 복잡해집니다.
            </Text>
          </View>
          <Button
            title="시작"
            variant="primary"
            style={styles.button}
            onPress={goToSleepTest3}
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
    fontSize: 27,
    lineHeight: 29,
    marginBottom: 30,
    color: '#0F1C36',
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
    textAlign: 'center',
    color: '#0F1C36',
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
  squareBox: {
    flexDirection: 'row',
    width: 70,
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 20,
  },
  square: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
