import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

interface AISleepTipsProps {
  tips: string[];
}

export const AISleepTips: React.FC<AISleepTipsProps> = ({ tips }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.cardTitle}>
          오늘의 수면 팁
        </Text>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Text variant="bodyMedium">• {tip}</Text>
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
  tipItem: {
    marginBottom: 8,
  },
});
