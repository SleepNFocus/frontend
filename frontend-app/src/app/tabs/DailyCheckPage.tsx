import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout } from '@/components/common/Layout';

export const DailyCheckPage: React.FC = () => {
  return (
    <Layout showNavbar={true}>
      <View style={styles.content}>
      </View>
    </Layout>
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
