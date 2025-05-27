import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SummaryCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 요약</Text>
      <View style={styles.content}>
        <Text style={styles.text}>아직 데이터가 없습니다.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  content: {
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    padding: 16,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
}); 