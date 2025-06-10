import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { colors } from '@/constants/colors';
import { RootStackParamList } from '@/App';
import { Button } from '../common/Button';

type RoundInfo = {
  gridSize: number;
  clickPattern: number;
};

const rounds: RoundInfo[] = [
  { gridSize: 4, clickPattern: 4 },
  { gridSize: 5, clickPattern: 6 },
  { gridSize: 6, clickPattern: 8 },
];

const getRandomIdx = (gridSize: number, clickPattern: number): number[] => {
  const total = gridSize * gridSize;
  const randomNum = new Set<number>();

  while (randomNum.size < clickPattern) {
    randomNum.add(Math.floor(Math.random() * total));
  }

  return Array.from(randomNum);
};

export default function SleepTest3() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { height: windowHeight } = useWindowDimensions();
  const { width: windowWidth } = useWindowDimensions();

  const containerHeight = Math.min(windowHeight * 0.7, 1200);
  const containerWidth = Math.min(windowWidth * 0.9, 700);
  const squareWidth = Math.min(windowWidth * 0.3, 45);
  const lineWidth = Math.min(windowWidth * 0.8, 600);

  // 상태관리 객체로 수정해보기
  const [totalStart, setTotalStart] = useState<number | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [showPattern, setShowPattern] = useState(true);
  const [pattern, setPattern] = useState<number[]>([]);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [round, setRound] = useState(0);

  function goToSleepTestResult() {
    navigation.navigate('SleepTestResult');
    resetGame();
  }

  function finishShow() {
    setShowPattern(false);
  }

  useEffect(() => {
    if (round < rounds.length) {
      const { gridSize, clickPattern } = rounds[round];
      const randomPattern = getRandomIdx(gridSize, clickPattern);
      setPattern(randomPattern);
      setSelected([]);
      setShowPattern(true);

      if (round === 0) setTotalStart(Date.now());

      const timer = setTimeout(finishShow, 1000);

      return () => clearTimeout(timer);
    }
  }, [round]);

  const handlePress = (clickNum: number) => {
    if (showPattern || selected.includes(clickNum)) return;

    const limit = rounds[round].clickPattern;

    if (selected.length < limit) {
      const updated = [...selected, clickNum];
      setSelected(updated);

      if (updated.length === limit) {
        setTimeout(() => roundSet(updated), 300);
      }
    }
  };

  const resetGame = () => {
    setRound(0);
    setTotalStart(null);
    setTotalCorrect(0);
    setGameEnded(false);
  };

  const roundSet = (selectIdx: number[]) => {
    const correct = selectIdx.filter(selectNum =>
      pattern.includes(selectNum),
    ).length;
    setTotalCorrect(prev => prev + correct);

    if (round < rounds.length - 1) {
      setRound(prev => prev + 1);
    } else {
      setGameEnded(true);
    }
  };

  if (gameEnded) {
    const totalTimeSec =
      totalStart && Date.now() ? (Date.now() - totalStart) / 1000 : 0;
    const baseScore = totalCorrect * 5;
    const bonusScore =
      totalTimeSec <= 10
        ? 10
        : totalTimeSec >= 20
          ? 0
          : Math.round((20 - totalTimeSec) * 1);
    const finalScore = baseScore + bonusScore;
    const answerPercent = ((totalCorrect / 18) * 100).toFixed(1);

    return (
      <LinearGradient
        colors={[colors.softBlue, colors.white]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.root}>
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
              <Text style={styles.title}> 패턴 기억 결과 </Text>
              <Text style={styles.scoreText}> {finalScore}점 </Text>
              <View style={styles.resultContainer}>
                <View style={styles.resultContainer2}>
                  <Text style={styles.result}>총 정답 수: </Text>
                  <Text style={styles.resultBold}>
                    {' '}
                    {totalCorrect}개 / 18개{' '}
                  </Text>
                </View>
                <View style={styles.resultContainer2}>
                  <Text style={styles.result}>정확도: </Text>
                  <Text style={styles.resultBold}> {answerPercent}% </Text>
                </View>
              </View>
            </View>

            <Button
              title="최종 결과 보기"
              variant="primary"
              style={styles.button}
              onPress={goToSleepTestResult}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }

  const { gridSize, clickPattern } = rounds[round];
  const totalsquares = gridSize * gridSize;
  const gridWidth = squareWidth * gridSize * 1.3;

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
          <View style={styles.titleBox}>
            <Text style={styles.title}>격자 기억하기</Text>
            <Text style={styles.subtitle1}> [ {round + 1} 라운드 ] </Text>
          </View>
          <View style={[styles.line, { width: lineWidth }]} />
          {showPattern ? (
            <Text style={styles.subtitle}>패턴을 기억하세요!</Text>
          ) : (
            <Text style={styles.subtitle}>
              선택: {selected.length} / {clickPattern}
            </Text>
          )}

          <View style={[styles.grid, { width: gridWidth }]}>
            {Array.from({ length: totalsquares }).map((_, index) => {
              const isCorrect = pattern.includes(index);
              const isSelected = selected.includes(index);
              const show = showPattern ? isCorrect : isSelected;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.square,
                    {
                      backgroundColor: show ? '#3F4F80' : '#5a6da350',
                      width: squareWidth,
                      height: squareWidth,
                    },
                  ]}
                  onPress={() => handlePress(index)}
                />
              );
            })}
          </View>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
    paddingHorizontal: 20,
    gap: 25,
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
  titleBox: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  line: {
    backgroundColor: '#bfbfbf',
    height: 1,
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  resultContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#0F1C36',
    textShadowColor: '#70707050',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
  },
  subtitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F1C36',
  },
  subtitle: {
    fontSize: 18,
    color: '#444',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  square: {
    margin: 5,
    borderRadius: 6,
  },
  result: {
    fontSize: 20,
  },
  resultBold: {
    fontSize: 18,
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
    width: 120,
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
