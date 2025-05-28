import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from '../../components/common/Navbar';
import { Text } from '../../components/common/Text';

export const DailyCheckPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        <Text style={styles.title}>데일리 체크</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
}); 