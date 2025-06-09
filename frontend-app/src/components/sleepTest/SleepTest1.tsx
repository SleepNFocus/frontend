import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/App';
import { Button } from '../common/Button';

const MAX_STEP = 5;

export default function SleepTest1() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [startTime, setStartTime] = useState<number | null>(null);
  const [clickTimes, setClickTimes] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const timeout = useRef<number | null>(null);
  const [step, setStep] = useState(0);

  const { height: windowHeight } = useWindowDimensions();
  const { width: windowWidth } = useWindowDimensions();

  const containerHeight = Math.min(windowHeight * 0.6, 1000);
  const containerWidth = Math.min(windowWidth * 0.9, 700);
  const circlerWidth = Math.min(windowWidth * 0.3, 220);

  function goToSleepTest2Desc() {
    navigation.navigate('SleepTest2Desc');
  }

  useEffect(() => {
    if (step < MAX_STEP && isWaiting) {
      const delay = Math.random() * 2000 + 1000;

      timeout.current = setTimeout(() => {
        setStartTime(Date.now());
        setIsWaiting(false);
      }, delay);
    }

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [step, isWaiting]);

  const handlePress = () => {
    if (isWaiting || !startTime) return;

    const reaction = Date.now() - startTime;
    const updated = [...clickTimes, reaction];

    if (step + 1 < MAX_STEP) {
      setClickTimes(updated);
      setStep(step + 1);
      setIsWaiting(true);
      setStartTime(null);
    } else {
      setClickTimes(updated);
      setIsFinished(true);
    }
  };

  const calcScore = (times: number[]): number => {
    const scores = times.map(t => {
      if (t <= 150) return 100;
      if (t >= 800) return 0;
      return ((800 - t) / (800 - 150)) * 100;
    });
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(avg * 10) / 10;
  };

  const avgScore = calcScore(clickTimes);
  const recent = clickTimes[clickTimes.length - 1];

  const allAvg = Math.round(clickTimes.reduce((a, b) => a + b, 0) / MAX_STEP);
  const commaAvg = allAvg.toLocaleString();

  const commaRecent = recent !== undefined ? recent.toLocaleString() : '';

  const recentAvg =
    clickTimes.length > 0
      ? Math.round(clickTimes.reduce((a, b) => a + b, 0) / clickTimes.length)
      : 0;

  const commaRecentAvg = recentAvg.toLocaleString();

  return (
    <View style={styles.container}>
      {isFinished ? (
        <View style={styles.resultBox}>
          <Text style={styles.title}> 반응 속도 결과 </Text>
          <Text style={styles.scoreText}> {avgScore}점 </Text>
          <View style={styles.resultTextBox}>
            <Text style={styles.text}> 평균 반응속도 : </Text>
            <Text style={styles.boldText}>{commaAvg} ms</Text>
          </View>
          <Button title="다음" variant="outline" onPress={goToSleepTest2Desc} />
        </View>
      ) : (
        <View
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
                <Pressable onPress={handlePress}>
                  <View
                    style={[
                      styles.circle,
                      { width: circlerWidth, height: circlerWidth },
                    ]}
                  />
                </Pressable>
              )}
            </View>
            {clickTimes.length > 0 && (
              <View style={styles.resultText}>
                <Text style={styles.opacityText}>
                  최근 반응속도 : {commaRecent} ms
                </Text>
                <Text style={styles.opacityText}>
                  평균 반응속도 : {commaRecentAvg} ms
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
    paddingHorizontal: 20,
    gap: 35,
    borderColor: '#222',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
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
  },
  circleWrapper: {
    marginTop: 18,
    alignItems: 'center',
  },
  plus: {
    fontSize: 60,
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
  scoreText: {
    fontSize: 40,
    color: '#5f78ef',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
  },
  opacityText: {
    fontSize: 18,
    color: '#888',
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultTextBox: {
    flexDirection: 'row',
    fontWeight: 'bold',
  },
  waitBox: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 80,
  },
});
