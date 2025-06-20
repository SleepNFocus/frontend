import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchSleepRecordDetail } from '@/services/recordListApi';
import { Text } from '@/components/common/Text';
import { RouteProp, useRoute } from '@react-navigation/native';
import { spacing } from '@/utils/responsive';
import { colors } from '@/constants/colors';
import { Layout } from '@/components/common/Layout';
import { Card } from '@/components/common/Card';
import BackButton from '@/components/common/BackButton';
import { fontSize } from '@/utils/responsive';

type ParamList = {
  SleepDetail: { date: string };
};

export const SleepRecordDetailPage: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'SleepDetail'>>();
  const { date } = route.params;

  const { data, isLoading, error } = useQuery({
    queryKey: ['sleepRecordDetail', date],
    queryFn: () => fetchSleepRecordDetail(date),
  });

  if (isLoading) {
    return (
      <Layout showLogo={false} showNavbar={false}>
        <View style={styles.loadingContainer}>
          <Text variant="bodyLarge" style={styles.loadingText}>로딩 중...</Text>
        </View>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout showLogo={false} showNavbar={false}>
        <View style={styles.errorContainer}>
          <Text variant="bodyLarge" style={styles.errorText}>에러 발생 혹은 데이터 없음</Text>
        </View>
      </Layout>
    );
  }

  const {
    total_sleep_hours,
    sleep_score,
    cognitive_test: {
      srt_score,
      srt_time_ms,
      symbol_score,
      symbol_count,
      symbol_accuracy,
      pattern_score,
      pattern_count,
      pattern_accuracy,
      pattern_time_ms,
    },
  } = data;

  return (
    <Layout showLogo={false} showNavbar={false}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* 헤더 섹션 */}
        <View style={styles.headerSection}>
          <BackButton size={32} />
          <View style={styles.headerContent}>
            <Text variant="headlineMedium" style={styles.headerTitle}>
              {data.date} 기록 상세
            </Text>
            <Text variant="bodyMedium" style={styles.headerSubtitle}>
              수면 및 인지 테스트 결과를 확인해보세요
            </Text>
          </View>
        </View>

        {/* 수면 정보 카드 */}
        <Card style={styles.mainCard} elevation={4}>
          <Text variant="titleLarge" style={styles.cardTitle}>수면 정보</Text>
          <View style={styles.sleepInfoContainer}>
            <View style={styles.infoItem}>
              <Text variant="labelMedium" style={styles.infoLabel}>총 수면시간</Text>
              <Text variant="headlineSmall" style={styles.infoValue}>{total_sleep_hours}시간</Text>
            </View>
            <View style={styles.infoItem}>
              <Text variant="labelMedium" style={styles.infoLabel}>수면점수</Text>
              <Text variant="headlineSmall" style={styles.infoValue}>{sleep_score}점</Text>
            </View>
          </View>
        </Card>

        {/* 인지 테스트 결과 카드 */}
        <Card style={styles.mainCard} elevation={4}>
          <Text variant="titleLarge" style={styles.cardTitle}>인지 테스트 결과</Text>
          
          {/* SRT 테스트 */}
          <View style={styles.testSection}>
            <Text variant="titleMedium" style={styles.testTitle}>SRT (Simple Reaction Time)</Text>
            <View style={styles.testResultContainer}>
              <View style={styles.testResultItem}>
                <Text variant="bodyMedium" style={styles.testResultLabel}>점수</Text>
                <Text variant="titleMedium" style={styles.testResultValue}>{srt_score}점</Text>
              </View>
              <View style={styles.testResultItem}>
                <Text variant="bodyMedium" style={styles.testResultLabel}>반응시간</Text>
                <Text variant="titleMedium" style={styles.testResultValue}>{srt_time_ms}ms</Text>
              </View>
            </View>
          </View>

          {/* Symbol 테스트 */}
          <View style={styles.testSection}>
            <Text variant="titleMedium" style={styles.testTitle}>Symbol 테스트</Text>
            <View style={styles.testResultContainer}>
              <View style={styles.testResultItem}>
                <Text variant="bodyMedium" style={styles.testResultLabel}>점수</Text>
                <Text variant="titleMedium" style={styles.testResultValue}>{symbol_score}점</Text>
              </View>
              <View style={styles.testResultItem}>
                <Text variant="bodyMedium" style={styles.testResultLabel}>완료 개수</Text>
                <Text variant="titleMedium" style={styles.testResultValue}>{symbol_count}개</Text>
              </View>
              <View style={styles.testResultItem}>
                <Text variant="bodyMedium" style={styles.testResultLabel}>정확도</Text>
                <Text variant="titleMedium" style={styles.testResultValue}>{symbol_accuracy}%</Text>
              </View>
            </View>
          </View>

          {/* Pattern 테스트 */}
          <View style={styles.testSection}>
            <Text variant="titleMedium" style={styles.testTitle}>Pattern 테스트</Text>
            <View style={styles.testResultContainer}>
              <View style={styles.testResultItem}>
                <Text variant="bodyMedium" style={styles.testResultLabel}>점수</Text>
                <Text variant="titleMedium" style={styles.testResultValue}>{pattern_score}점</Text>
              </View>
              <View style={styles.testResultItem}>
                <Text variant="bodyMedium" style={styles.testResultLabel}>완료 개수</Text>
                <Text variant="titleMedium" style={styles.testResultValue}>{pattern_count}개</Text>
              </View>
              <View style={styles.testResultItem}>
                <Text variant="bodyMedium" style={styles.testResultLabel}>정확도</Text>
                <Text variant="titleMedium" style={styles.testResultValue}>{pattern_accuracy}%</Text>
              </View>
              <View style={styles.testResultItem}>
                <Text variant="bodyMedium" style={styles.testResultLabel}>평균 시간</Text>
                <Text variant="titleMedium" style={styles.testResultValue}>{pattern_time_ms}ms</Text>
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textColor + '80',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.red,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  headerContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  headerTitle: {
    color: colors.textColor,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.textColor + '80',
    fontSize: fontSize.sm,
  },
  mainCard: {
    marginBottom: spacing.lg,
    borderRadius: 16,
    padding: spacing.lg,
    backgroundColor: 'white',
  },
  cardTitle: {
    color: colors.textColor,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  sleepInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.deepNavy + '10',
    borderRadius: 12,
    padding: spacing.lg,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    color: colors.textColor + '80',
    marginBottom: spacing.xs,
  },
  infoValue: {
    color: colors.deepNavy,
    fontWeight: '700',
  },
  testSection: {
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.bgColor + '40',
  },
  testTitle: {
    color: colors.textColor,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  testResultContainer: {
    backgroundColor: colors.bgColor + '20',
    borderRadius: 12,
    padding: spacing.md,
  },
  testResultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  testResultLabel: {
    color: colors.textColor + '80',
    fontWeight: '600',
  },
  testResultValue: {
    color: colors.textColor,
    fontWeight: '700',
  },
});

export default SleepRecordDetailPage;
