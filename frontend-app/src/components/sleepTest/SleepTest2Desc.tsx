import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/common/Button';
import { colors } from '@/constants/colors';
import { GlassCard } from '../common/Card';
import { RootStackParamList } from '@/App';
import { useEffect, useRef } from 'react';

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
    <LinearGradient
      colors={[colors.softBlue, colors.white]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.root}>
        <Image
          source={require('@/assets/focuz_name_logo.png')}
          style={styles.nameLogoImage}
        />
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
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
  nameLogoImage: {
    width: 100,
    height: 20,
    marginBottom: 40,
  },
  symbolBox: {
    margin: 10,
  },
  symbol: {
    fontSize: 20,
    letterSpacing: 3,
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
