import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from '../../components/common/Navbar';
import { DashboardMain } from './DashboardMain';

export const DashboardPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <DashboardMain />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
