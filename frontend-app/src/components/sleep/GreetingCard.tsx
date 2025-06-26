import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';

interface GreetingCardProps {
  userName?: string;
  sleepScore?: number | null;
}

export const GreetingCard: React.FC<GreetingCardProps> = ({
  userName = '사용자',
  sleepScore = null,
}) => {
  return (
    <View style={styles.root}>
      <Text variant="titleLarge" style={styles.hello}>
        안녕하세요, {userName}님!
      </Text>
      <Text variant="bodyLarge" style={styles.desc}>
        오늘의 컨디션을 체크하고 퍼포먼스를 기록해보세요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  hello: {
    color: colors.textColor,
  },
  desc: {
    color: colors.midnightBlue,
    marginBottom: 8,
  },
  score: {
    color: colors.softBlue,
  },
});
