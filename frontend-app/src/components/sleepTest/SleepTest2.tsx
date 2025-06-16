import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { calculateSleepTest2Score } from '@/utils/sleepTestScore';
import { useNavigation } from '@react-navigation/native';
import { useSleepTestStore } from '@/store/testStore';
import { Button } from '@/components/common/Button';
import { RootStackParamList } from '@/App';
import { GlassCard } from '../common/Card';
import { Layout } from '../common/Layout';

const MAX_NUM = 9;
const TIMER_SECOND = 60000;
const RANDOM_SYMBOL = ['♥︎', '✦', '♠︎', '▲', '◉', '★', '▼', '☗', '◆'];

function randomArray(array: string[]) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function SleepTest2() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const shuffledSymbols = useMemo(() => randomArray(RANDOM_SYMBOL), []);
  const [currentSymbol, setCurrentSymbol] = useState<string>('');
  const [clickTimes, setClickTimes] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [start, setStart] = useState(false);

  const { height: windowHeight } = useWindowDimensions();
  const { width: windowWidth } = useWindowDimensions();

  const containerHeight = Math.min(windowHeight * 0.77, 1000);
  const containerWidth = Math.min(windowWidth * 0.9, 700);
  const symbolBoxWidth = Math.min(windowWidth * 0.8, 400);
  const lineWidth = Math.min(windowWidth * 0.8, 600);

  const setTest2 = useSleepTestStore(state => state.setTest2);

  function goToSleepTest3Desc() {
    navigation.navigate('SleepTest3Desc');
  }

  useEffect(() => {
    if (gameOver) {
      const result = calculateSleepTest2Score(
        clickTimes,
        correctCount,
        wrongCount,
      );
      console.log('결과:', result);
      setTest2(result);
    }
  }, [gameOver]);

  useEffect(() => {
    setStart(true);
  }, []);

  const setOneRandomSymbol = () => {
    const random = shuffledSymbols[Math.floor(Math.random() * MAX_NUM)];
    setCurrentSymbol(random);
    setStartTime(Date.now());
  };

  function finishGame() {
    setGameOver(true);
  }

  useEffect(() => {
    if (start) {
      setOneRandomSymbol();
      const timer = setTimeout(finishGame, TIMER_SECOND);
      return () => clearTimeout(timer);
    }
  }, [start]);

  useEffect(() => {
    if (start && !gameOver) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [start, gameOver]);

  const handlePress = (pressedNum: number) => {
    if (gameOver) return;

    const responseTime = Date.now() - startTime;
    setClickTimes(prev => [...prev, responseTime]);

    const correctIndex =
      shuffledSymbols.findIndex(s => s === currentSymbol) + 1;

    if (pressedNum === correctIndex) {
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }
    setOneRandomSymbol();
  };

  const avgReactionTime =
    clickTimes.length === 0
      ? 0
      : Math.round(clickTimes.reduce((a, b) => a + b, 0) / clickTimes.length);

  const totalScore = calculateSleepTest2Score(
    clickTimes,
    correctCount,
    wrongCount,
  ).totalScore;

  const commaNum = avgReactionTime.toLocaleString();

  return (
    <Layout>
      <View style={styles.container}>
        {gameOver ? (
          <View style={styles.resultBox}>
            <Image
              source={require('@/assets/result.png')}
              style={styles.resultImage}
            />
            <View style={styles.resultBox2}>
              <Text style={styles.title}>처리 속도 결과</Text>
              <Text style={styles.scoreText}>{totalScore}점</Text>
              <View style={styles.resultTextBox}>
                <View style={styles.resultTextBox2}>
                  <Text style={styles.text}> 총 정답 수 : </Text>
                  <Text style={styles.boldText}> {correctCount} 개 </Text>
                </View>
                <View style={styles.resultTextBox2}>
                  <Text style={styles.text}>평균 반응속도 : </Text>
                  <Text style={styles.boldText}>{commaNum} ms</Text>
                </View>
                <View style={styles.resultTextBox2}>
                  <Text style={styles.text}> 정확도 : </Text>
                  <Text style={styles.boldText}>
                    {Math.round(
                      (correctCount / (correctCount + wrongCount || 1)) * 100,
                    )}
                    %
                  </Text>
                </View>
              </View>
            </View>
            <Button
              title="다음"
              variant="primary"
              style={styles.button}
              onPress={goToSleepTest3Desc}
            />
          </View>
        ) : (
          <GlassCard
            style={[
              styles.secContainer,
              { width: containerWidth, height: containerHeight },
            ]}
          >
            <View style={styles.titleBox}>
              <Text style={styles.title}>기호 - 숫자 변환</Text>
              {start && !gameOver && (
                <Text style={styles.timerText}>남은 시간: {timeLeft}s</Text>
              )}
            </View>
            <View style={[styles.line, { width: lineWidth }]} />
            <View style={[styles.symbolNumberRow, { width: symbolBoxWidth }]}>
              {shuffledSymbols.map((symbol, idx) => (
                <View key={idx} style={styles.symbolNumberPair}>
                  <Text style={styles.symbol}>{symbol}</Text>
                  <Text style={styles.numberText}>{idx + 1}</Text>
                </View>
              ))}
            </View>
            <View style={styles.symbolBox}>
              <Text style={styles.randomNum}>{currentSymbol}</Text>
            </View>
            <View style={styles.numContainer}>
              {Array.from({ length: MAX_NUM }).map((_, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handlePress(idx + 1)}
                  style={styles.numBox}
                >
                  <Text style={styles.number}>{idx + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </GlassCard>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  secContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
    padding: 30,
    paddingHorizontal: 20,
    gap: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.600)',
  },
  resultBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
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
  titleBox: {
    alignItems: 'center',
    gap: 10,
  },
  line: {
    backgroundColor: '#bfbfbf',
    height: 1,
  },
  symbolNumberRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
    padding: 10,
    borderColor: '#5a6da392',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#CBD3DF',
  },
  symbolNumberPair: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 17,
  },
  symbol: {
    fontSize: 20,
    textAlign: 'center',
    color: '#0F1C36',
  },
  numberText: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
    color: '#0F1C36',
  },
  symbolBox: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  randomNum: {
    fontSize: 60,
    color: '#0F1C36',
  },
  numContainer: {
    width: 210,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numBox: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#929292',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  number: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F1C36',
  },
  startBtn: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  startText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#5A6EA3',
    textShadowColor: '#70707050',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
  },
  resultTextBox: {
    alignItems: 'center',
    gap: 10,
  },
  resultTextBox2: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resultBox2: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontSize: 20,
    color: '#0F1C36',
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F1C36',
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
