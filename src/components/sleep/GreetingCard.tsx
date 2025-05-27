import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface GreetingCardProps {
  userName?: string;
  sleepScore?: number | null;
}

// 대시보드 상단 인사 및 안내 컴포넌트
export const GreetingCard: React.FC<GreetingCardProps> = ({ userName = '사용자', sleepScore = null }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.hello}>안녕하세요, 🐝 {userName}님!</Text>
      <Text style={styles.desc}>오늘의 컨디션을 체크하고 퍼포먼스를 기록해보세요.</Text>
      <Text style={styles.score}>오늘의 수면 점수: {sleepScore !== null ? `${sleepScore}점` : '-점'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 24,
  },
  hello: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  desc: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  score: {
    fontSize: 16,
    color: '#6C7BFF',
    fontWeight: 'bold',
  },
}); 