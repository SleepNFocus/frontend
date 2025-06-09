import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/common/Button';
import { RootStackParamList } from '@/App';

const MAX_NUM = 9;
const TIMER_SECOND = 60000;
const RANDOM_SYMBOL = ['♥︎', '✦', '♠︎', '▲', '◉', '★', '▼', '☗', '◆'];

function randomArray(array: string[]) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // i번째와 j번째를 자리 바꿈으로 랜덤 배정
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

  const containerHeight = Math.min(windowHeight * 0.7, 1000);
  const containerWidth = Math.min(windowWidth * 0.9, 700);
  const lineWidth = Math.min(windowWidth * 0.8, 600);

  function goToSleepTest3Desc() {
    navigation.navigate('SleepTest3Desc');
  }

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

  const calculateScore = () => {
    const total = correctCount + wrongCount;
    const accuracy = total === 0 ? 0 : correctCount / total;
    const countScore = correctCount >= 20 ? 60 : correctCount * 3;
    const accuracyScore = Math.round(accuracy * 40);
    return {
      countScore,
      accuracyScore,
      totalScore: countScore + accuracyScore,
    };
  };

  const avgReactionTime =
    clickTimes.length === 0
      ? 0
      : Math.round(clickTimes.reduce((a, b) => a + b, 0) / clickTimes.length);

  const { totalScore } = calculateScore();

  const commaNum = avgReactionTime.toLocaleString();

  return (
    <View style={styles.container}>
      {gameOver ? (
        <View style={styles.resultBox}>
          <Text style={styles.title}>반응 속도 결과</Text>
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
          <Button title="다음" variant="outline" onPress={goToSleepTest3Desc} />
        </View>
      ) : (
        <>
          <View
            style={[
              styles.secContainer,
              { width: containerWidth, height: containerHeight },
            ]}
          >
            <Text style={styles.title}>기호 - 숫자 변환</Text>
            {start && !gameOver && (
              <Text style={styles.timerText}>남은 시간: {timeLeft}s</Text>
            )}
            <View style={[styles.line, { width: lineWidth }]} />
            <View style={styles.symbolNumberRow}>
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
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  secContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
    paddingHorizontal: 20,
    gap: 25,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#aaa',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
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
    padding: 13,
    borderColor: '#d6d6d6',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f7f5ffd2',
  },
  symbolNumberPair: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 17,
  },
  symbol: {
    fontSize: 17,
    textAlign: 'center',
  },
  numberText: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  symbolBox: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  randomNum: {
    fontSize: 60,
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  number: {
    fontSize: 22,
    fontWeight: 'bold',
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
    color: '#5f78ef',
  },
  resultTextBox: {
    alignItems: 'center',
    gap: 10,
  },
  resultTextBox2: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
