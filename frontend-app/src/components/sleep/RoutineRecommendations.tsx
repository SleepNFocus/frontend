import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/common/Text';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/colors';
import { spacing, fontSize } from '@/utils/responsive';

interface RoutineRecommendationsProps {
  routines: string[];
}

export const RoutineRecommendations: React.FC<RoutineRecommendationsProps> = ({
  routines,
}) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.cardTitle}>추천 루틴</Text>
      {routines.map((routine, index) => (
        <View key={index} style={styles.routineItem}>
          <Text variant="bodyMedium" style={styles.routineText}>• {routine}</Text>
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
  routineItem: {
    marginBottom: spacing.sm,
  },
  routineText: {
    color: colors.midnightBlue,
    fontSize: fontSize.md,
  },
});
