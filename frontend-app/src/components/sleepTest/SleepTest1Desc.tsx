import {
  View,
  Text,
  Animated,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/common/Button';
import { RootStackParamList } from '@/App';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { useEffect, useRef } from 'react';

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

  const interpolatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#00800090', '#008000'],
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
              화면에 초록색 원이 나타나면 {`\n`} 최대한 빠르게 클릭하세요.
            </Text>
            <Animated.View
              style={[styles.circle, { backgroundColor: interpolatedColor }]}
            />
            <Text style={styles.descriptionBold}>[ 5회 측정 ]</Text>
          </View>
          <Button
            title="시작"
            variant="primary"
            style={styles.button}
            onPress={goToSleepTest1}
          />
        </View>
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
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
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
    color: '#222',
    textAlign: 'center',
  },
  descriptionBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F1C36',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 150,
    margin: 20,
  },
  nameLogoImage: {
    width: 100,
    height: 20,
    marginBottom: 40,
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
