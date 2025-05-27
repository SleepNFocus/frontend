import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Layout, Card, Text } from '../common';
import { useTheme } from 'react-native-paper';

// 화면 너비 계산
const screenWidth = Dimensions.get('window').width;

// Analytics: 관리자 - 통계 분석 페이지
export const Analytics: React.FC = () => {
  const theme = useTheme();

  // 차트 스타일 설정
  const chartConfig = {
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    color: (opacity = 1) => theme.colors.primary,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  // 임시 라인 차트 데이터
  const lineData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => theme.colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  // 임시 바 차트 데이터
  const barData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        {/* 사용자 통계 차트 */}
        <Card>
          <Text variant="headlineMedium">사용자 통계</Text>
          <LineChart
            data={lineData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            yAxisLabel=""
            yAxisSuffix=""
          />
        </Card>
        {/* 주간 테스트 통계 차트 */}
        <Card>
          <Text variant="headlineMedium">주간 테스트 통계</Text>
          <BarChart
            data={barData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            yAxisLabel=""
            yAxisSuffix=""
          />
        </Card>
        {/* 수면 데이터 분석 차트 */}
        <Card>
          <Text variant="headlineMedium">수면 데이터 분석</Text>
          <LineChart
            data={lineData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            yAxisLabel=""
            yAxisSuffix=""
          />
        </Card>
      </ScrollView>
    </Layout>
  );
};

// 스타일 정의 (Material Design 3 기준)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 