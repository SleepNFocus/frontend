import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@/components/common/Text';
import { Layout } from '@/components/common/Layout';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { AISleepTips } from '@/components/sleep/AISleepTips';
import { RoutineRecommendations } from '@/components/sleep/RoutineRecommendations';
import { colors } from '@/constants/colors';
import { spacing, fontSize } from '@/utils/responsive';

export const InsightPage: React.FC = () => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 테스트 점수와 수면 패턴을 기반으로 AI 인사이트 생성
    generateInsights();
  }, []);

  const generateInsights = async () => {
    // TODO: 실제 API 호출로 대체
    setTimeout(() => {
      setInsights({
        sleepTips: [
          '수면 시간이 7-8시간 사이로 적정합니다.',
          '기상 시 컨디션이 좋지 않다면 수면 환경을 점검해보세요.',
        ],
        routines: [
          '잠들기 1시간 전 전자기기 사용을 줄이세요.',
          '규칙적인 수면 시간을 유지하세요.',
        ],
      });
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <ErrorBoundary>
        <Layout showNavbar={true}>
          <View style={styles.loadingContainer}>
            <Text variant="bodyLarge" style={styles.loadingText}>
              AI 인사이트를 생성하는 중...
            </Text>
          </View>
        </Layout>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Layout>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
        >
          <AISleepTips tips={insights?.sleepTips || []} />
          <RoutineRecommendations routines={insights?.routines || []} />
        </ScrollView>
      </Layout>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.xl,
    textAlign: 'center',
    fontSize: fontSize.xl,
    color: colors.textColor,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    color: colors.midnightBlue,
    fontSize: fontSize.lg,
  },
});
