import React from 'react';
import { View, StyleSheet } from 'react-native';

interface HexagonRadarChartProps {
  data?: any;
  labels?: any;
}

export const HexagonRadarChart: React.FC<HexagonRadarChartProps> = ({ data, labels }) => {
  return (
    <View style={styles.container}>
      {/* 차트 구현 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
}); 