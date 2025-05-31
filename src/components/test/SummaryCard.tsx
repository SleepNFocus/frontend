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
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'stretch',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 6,
    borderWidth: 0,
    borderColor: 'transparent',
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
