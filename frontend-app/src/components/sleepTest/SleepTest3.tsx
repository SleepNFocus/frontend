import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '../common/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TestStackParamList } from '@/app/test/navigation/TestNavigator';
import { useNavigation } from 'expo-router';

type RoundInfo = {
  gridSize: number;
  patternAns: number;
};

const rounds: RoundInfo[] = [
  { gridSize: 4, patternAns: 4 },
  { gridSize: 5, patternAns: 6 },
  { gridSize: 6, patternAns: 8 },
];

const getRandomIdx = (gridSize: number, patternAns: number): number[] => {
  const total = gridSize * gridSize;
  const randomNum = new Set<number>();

  while (randomNum.size < patternAns) {
    randomNum.add(Math.floor(Math.random() * total));
  }

  return Array.from(randomNum);
};

export default function SleepTest3() {
  const navigation =
    useNavigation<NativeStackNavigationProp<TestStackParamList>>();

  // 상태관리 객체로 수정해보기
  const [round, setRound] = useState(0);
  const [pattern, setPattern] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [showPattern, setShowPattern] = useState(true);
  const [totalStart, setTotalStart] = useState<number | null>(null);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    if (round < rounds.length) {
      const { gridSize, patternAns } = rounds[round];
      const randomPattern = getRandomIdx(gridSize, patternAns);
      setPattern(randomPattern);
      setSelected([]);
      setShowPattern(true);

      if (round === 0) setTotalStart(Date.now());

      const timer = setTimeout(() => {
        setShowPattern(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [round]);

  const handlePress = (clickNum: number) => {
    if (showPattern || selected.includes(clickNum)) return;

    const limit = rounds[round].patternAns;

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
      <View style={styles.root}>
        <View style={styles.resultBox}>
          <Text style={styles.title}> 패턴 기억 결과 </Text>
          <Text style={styles.scoreText}> {finalScore}점 </Text>
          <View style={styles.resultContainer}>
            <View style={styles.resultContainer2}>
              <Text style={styles.result}>총 정답 수: </Text>
              <Text style={styles.resultBold}> {totalCorrect}개 / 18개 </Text>
            </View>
            <View style={styles.resultContainer2}>
              <Text style={styles.result}>정확도: </Text>
              <Text style={styles.resultBold}> {answerPercent}% </Text>
            </View>
          </View>

          <Button
            title="최종 결과 보기"
            variant="outline"
            onPress={() => {
              navigation.navigate('SleepTestResult');
              resetGame();
            }}
          />
        </View>
      </View>
    );
  }

  const { gridSize, patternAns } = rounds[round];
  const totalCells = gridSize * gridSize;

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>격자 기억하기</Text>
          <Text style={styles.subtitle1}> {round + 1} 라운드 </Text>
        </View>
        <View style={styles.line} />
        {showPattern ? (
          <Text style={styles.subtitle}>패턴을 기억하세요!</Text>
        ) : (
          <Text style={styles.subtitle}>
            선택: {selected.length}/{patternAns}
          </Text>
        )}

        <View style={[styles.grid, { width: gridSize * 60 }]}>
          {Array.from({ length: totalCells }).map((_, index) => {
            const isCorrect = pattern.includes(index);
            const isSelected = selected.includes(index);
            const show = showPattern ? isCorrect : isSelected;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.cell,
                  {
                    backgroundColor: show ? '#7b6cf6' : '#eee',
                  },
                ]}
                onPress={() => handlePress(index)}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 400,
    height: 680,
    padding: 30,
    paddingHorizontal: 20,
    gap: 25,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#aaa',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  resultBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  titleBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#bfbfbf',
    height: 1,
    width: 350,
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  cell: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 6,
  },
  result: {
    fontSize: 18,
    marginVertical: 5,
  },
  resultBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#7b6cf6',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scoreText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#5f78ef',
  },
});
