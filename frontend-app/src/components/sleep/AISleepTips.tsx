import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/common/Text';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/colors';
import { spacing, fontSize } from '@/utils/responsive';

interface AISleepTipsProps {
  tips: string[];
}

export const AISleepTips: React.FC<AISleepTipsProps> = ({ tips }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.cardTitle}>오늘의 수면 팁</Text>
      {tips.map((tip, index) => (
        <View key={index} style={styles.tipItem}>
          <Text variant="bodyMedium" style={styles.tipText}>• {tip}</Text>
        </View>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
    backgroundColor: colors.white,
    borderColor: colors.mediumLightGray,
    borderWidth: 1,
  },
  cardTitle: {
    marginBottom: spacing.md,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  tipItem: {
    marginBottom: spacing.sm,
  },
  tipText: {
    color: colors.midnightBlue,
    fontSize: fontSize.md,
  },
});
