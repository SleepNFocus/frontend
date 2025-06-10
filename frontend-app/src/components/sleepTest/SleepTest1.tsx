import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { RootStackParamList } from '@/App';
import { GlassCard } from '../common/Card';
import { Button } from '../common/Button';

const MAX_STEP = 5;
const MIN_WAIT_TIME = 1000;
const RANDOM_NUM_RANGE = 2000;
const REACTION_TIME_MIN = 150;
const REACTION_TIME_MAX = 800;

export default function SleepTest1() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [clickTimes, setClickTimes] = useState<number[]>([]);
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const timeout = useRef<number | null>(null);
  const [step, setStep] = useState<number>(0);

  const { height: windowHeight } = useWindowDimensions();
  const { width: windowWidth } = useWindowDimensions();

  const containerHeight = Math.min(windowHeight * 0.7, 1000);
  const containerWidth = Math.min(windowWidth * 0.9, 700);
  const circlerWidth = Math.min(windowWidth * 0.3, 220);

  function goToSleepTest2Desc() {
    navigation.navigate('SleepTest2Desc');
  }

  const showGreenLight = useCallback(() => {
    if (step < MAX_STEP && isWaiting) {
      const delay = Math.random() * RANDOM_NUM_RANGE + MIN_WAIT_TIME;

      timeout.current = setTimeout(() => {
        setStartTime(Date.now());
        setIsWaiting(false);
      }, delay);
    }
  }, [step, isWaiting]);

  useEffect(() => {
    showGreenLight();

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [showGreenLight]);

  const handlePressGreenLight = () => {
    const isInvalidClick = isWaiting || !startTime;
    if (isInvalidClick) return;

    const reactionTime = Date.now() - startTime;
    const updatedClickTimes = [...clickTimes, reactionTime];
    const isLastStep = step + 1 >= MAX_STEP;

    setClickTimes(updatedClickTimes);

    if (isLastStep) {
      setIsFinished(true);
      return;
    }

    setStep(step + 1);
    setIsWaiting(true);
    setStartTime(null);
  };

  const calcScore = (times: number[]): number => {
    const scores = times.map(t => {
      if (t <= REACTION_TIME_MIN) return 100;
      if (t >= REACTION_TIME_MAX) return 0;
      return (
        ((REACTION_TIME_MAX - t) / (REACTION_TIME_MAX - REACTION_TIME_MIN)) *
        100
      );
    });
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(avgScore * 10) / 10;
  };

  const avgScore = calcScore(clickTimes);

  const recentClickTime = clickTimes[clickTimes.length - 1];
  const commaRecentClickTime =
    recentClickTime !== undefined ? recentClickTime.toLocaleString() : '';

  const recentClickTimeAvg =
    clickTimes.length > 0
      ? Math.round(clickTimes.reduce((a, b) => a + b, 0) / clickTimes.length)
      : 0;

  const commaRecentStepClickTimesAvg = recentClickTimeAvg.toLocaleString();

  const allClickTimeAvg = Math.round(
    clickTimes.reduce((a, b) => a + b, 0) / MAX_STEP,
  );
  const commaAllClickTimeAvg = allClickTimeAvg.toLocaleString();

  return (
    <LinearGradient
      colors={[colors.softBlue, colors.white]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        {isFinished ? (
          <View style={styles.resultBox}>
            <Image
              source={require('@/assets/focuz_name_logo.png')}
              style={styles.nameLogoImage}
            />
            <Image
              source={require('@/assets/result.png')}
              style={styles.resultImage}
            />
            <View style={styles.resultBox2}>
              <Text style={styles.title}> 반응 속도 결과 </Text>
              <Text style={styles.scoreText}> {avgScore}점 </Text>
              <View style={styles.resultTextBox}>
                <Text style={styles.text}> 평균 반응속도 : </Text>
                <Text style={styles.boldText}>{commaAllClickTimeAvg} ms</Text>
              </View>
            </View>
            <Button
              title="다음"
              variant="primary"
              style={styles.button}
              onPress={goToSleepTest2Desc}
            />
          </View>
        ) : (
          <>
            <Image
              source={require('@/assets/focuz_name_logo.png')}
              style={styles.nameLogoImage}
            />
            <GlassCard
              style={[
                styles.secContainer,
                { width: containerWidth, height: containerHeight },
              ]}
            >
              <View style={styles.testBox}>
                <View style={styles.headerBox}>
                  <Text style={styles.progress}>
                    진행 : {step + 1}/{MAX_STEP}
                  </Text>
                  <Text style={styles.title}> 초록 불을 잡아라! </Text>
                </View>
                <View style={styles.circleWrapper}>
                  {isWaiting ? (
                    <View style={styles.waitBox}>
                      <Text style={styles.plus}> + </Text>
                      <Text style={styles.text}>
                        자극이 나타날 때까지 기다려주세요
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.circleBox}>
                      <Pressable onPress={handlePressGreenLight}>
                        <View
                          style={[
                            styles.circle,
                            { width: circlerWidth, height: circlerWidth },
                          ]}
                        />
                      </Pressable>
                    </View>
                  )}
                </View>
                <View style={styles.msBox}>
                  {clickTimes.length > 0 ? (
                    <View style={styles.resultText}>
                      <Text style={styles.opacityText}>
                        최근 반응속도 : {commaRecentClickTime} ms
                      </Text>
                      <Text style={styles.opacityText}>
                        평균 반응속도 : {commaRecentStepClickTimesAvg} ms
                      </Text>
                    </View>
                  ) : (
                    ''
                  )}
                </View>
              </View>
            </GlassCard>
          </>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
    paddingHorizontal: 20,
    gap: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.600)',
  },
  headerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  testBox: {
    alignItems: 'center',
    gap: 60,
  },
  progress: {
    fontSize: 20,
    color: '#888',
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0F1C36',
    textShadowColor: '#70707050',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
  },
  circleWrapper: {
    marginTop: 18,
    alignItems: 'center',
  },
  plus: {
    fontSize: 60,
    color: '#0F1C36',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 150,
    backgroundColor: 'green',
  },
  resultText: {
    marginTop: 16,
    alignItems: 'center',
  },
  resultBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  resultBox2: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  scoreText: {
    fontSize: 40,
    color: '#5A6EA3',
    fontWeight: 'bold',
    textShadowColor: '#70707050',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
  },
  text: {
    fontSize: 20,
    color: '#0F1C36',
  },
  opacityText: {
    fontSize: 18,
    color: '#888',
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F1C36',
  },
  resultTextBox: {
    flexDirection: 'row',
    fontWeight: 'bold',
  },
  waitBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    gap: 80,
  },
  circleBox: {
    height: 150,
  },
  msBox: {
    height: 30,
    marginTop: 30,
  },
  nameLogoImage: {
    width: 100,
    height: 20,
    marginBottom: 30,
  },
  resultImage: {
    width: 100,
    height: 100,
    opacity: 0.8,
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
