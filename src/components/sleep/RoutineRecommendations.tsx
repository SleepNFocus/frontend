import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

interface RoutineRecommendationsProps {
  routines: string[];
}

export const RoutineRecommendations: React.FC<RoutineRecommendationsProps> = ({ routines }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.cardTitle}>
          추천 루틴
        </Text>
        {routines.map((routine, index) => (
          <View key={index} style={styles.routineItem}>
            <Text variant="bodyMedium">• {routine}</Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  routineItem: {
    marginBottom: 8,
  },
});