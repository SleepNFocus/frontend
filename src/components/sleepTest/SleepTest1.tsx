import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Button } from '../common/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TestStackParamList } from '@/app/test/navigation/TestNavigator';

const MAX_STEP = 5;

export default function SleepTest1() {
  const navigation =
    useNavigation<NativeStackNavigationProp<TestStackParamList>>();

  const [step, setStep] = useState(0);
  const [isWaiting, setIsWaiting] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [clickTimes, setClickTimes] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

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
      <View style={styles.secContainer}>
        {isFinished ? (
          <View style={styles.resultBox}>
            <Text style={styles.title}> 반응 속도 결과 </Text>
            <Text style={styles.scoreText}> {avgScore}점 </Text>
            <View style={styles.resultTextBox}>
              <Text style={styles.text}> 평균 반응속도 : </Text>
              <Text style={styles.boldText}>{commaAvg} ms</Text>
            </View>
            <Button
              title="다음"
              variant="outline"
              onPress={() => {
                navigation.navigate('SleepTest2Desc');
              }}
            />
          </View>
        ) : (
          <View style={styles.testBox}>
            <Text style={styles.progress}>
              진행 : {step + 1}/{MAX_STEP}
            </Text>
            <Text style={styles.title}> 초록 불을 잡아라! </Text>
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
                  <View style={styles.circle} />
                </Pressable>
              )}
            </View>
            {clickTimes.length > 0 && (
              <View style={styles.resultText}>
                <Text> 최근 반응속도: {commaRecent} ms </Text>
                <Text>평균 반응속도: {commaRecentAvg} ms</Text>
              </View>
            )}
          </View>
        )}
      </View>
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
  testBox: {
    alignItems: 'center',
    gap: 16,
  },
  progress: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  circleWrapper: {
    marginTop: 24,
    alignItems: 'center',
  },
  plus: {
    fontSize: 40,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'green',
  },
  resultText: {
    marginTop: 16,
    alignItems: 'center',
  },
  resultBox: {
    alignItems: 'center',
    gap: 20,
  },
  scoreText: {
    fontSize: 35,
    color: '#5f78ef',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  resultTextBox: {
    flex: 1,
    flexDirection: 'row',
    fontWeight: 'bold',
  },
  waitBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
  },
});
