import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSleepRecordList } from '@/services/recordListApi';
import { Text } from '@/components/common/Text';
import { DayRecord, MonthRecord, WeekRecord } from '@/types/history';
import { colors } from '@/constants/colors';
import { fontSize, spacing } from '@/utils/responsive';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Layout } from '@/components/common/Layout';
import { ToastList } from '@/components/common/Toast';
import useUiStore from '@/store/uiStore';

const periodOptions = ['day', 'week', 'month'] as const;
type Period = (typeof periodOptions)[number];

export const HistoryPage: React.FC = () => {
  const [period, setPeriod] = useState<Period>('day');
  const { data, isLoading, error } = useSleepRecordList(period);
  const { openToast } = useUiStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePeriodChange = (newPeriod: Period) => {
    if (period !== newPeriod) {
      setPeriod(newPeriod);
    }
  };

  const handleCardPress = (date: string) => {
    navigation.navigate('SleepDetail', { date });
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text variant="headlineMedium" style={styles.title}>
            수면 기록 조회
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            기간별 수면 데이터를 확인해보세요
          </Text>
        </View>

        {/* 필터 버튼 */}
        <View style={styles.filterContainer}>
          {periodOptions.map(p => (
            <Button
              key={p}
              onPress={() => handlePeriodChange(p)}
              title={p === 'day' ? '일별' : p === 'week' ? '주별' : '월별'}
              variant={period === p ? 'primary' : 'outline'}
              style={styles.filterButton}
              textStyle={period === p ? styles.activeFilterText : undefined}
            />
          ))}
        </View>

        {/* 상태 표시 */}
        {isLoading && (
          <View style={styles.statusContainer}>
            <Text variant="bodyLarge" style={styles.statusText}>로딩 중...</Text>
          </View>
        )}
        {error && (
          <View style={styles.statusContainer}>
            <Text variant="bodyLarge" style={[styles.statusText, styles.errorText]}>
              에러 발생:{' '}
              {error instanceof Error ? error.message : '알 수 없는 오류'}
            </Text>
          </View>
        )}

        {/* 일별 */}
        {period === 'day' &&
          (data?.results as DayRecord[])?.map((item, index) => (
            <Card
              key={index}
              style={styles.card}
              elevation={4}
              onPress={() => handleCardPress(item.date)}
            >
              <View style={styles.cardHeader}>
                <Text variant="titleLarge" style={styles.cardDate}>
                  {item.date}
                </Text>
                <View style={styles.scoreContainer}>
                  <View style={styles.scoreItem}>
                    <Text variant="labelMedium" style={styles.scoreLabel}>수면점수</Text>
                    <Text variant="titleMedium" style={styles.scoreValue}>{item.sleep_score}점</Text>
                  </View>
                  <View style={styles.scoreItem}>
                    <Text variant="labelMedium" style={styles.scoreLabel}>인지점수</Text>
                    <Text variant="titleMedium" style={styles.scoreValue}>{item.cognitive_score}점</Text>
                  </View>
                </View>
              </View>
              <View style={styles.sleepTimeContainer}>
                <Text variant="bodyLarge" style={styles.sleepTimeLabel}>총 수면시간</Text>
                <Text variant="titleLarge" style={styles.sleepTimeValue}>{item.sleep_hour}시간</Text>
              </View>
            </Card>
          ))}

        {/* 주별 */}
        {period === 'week' &&
          (data?.results as WeekRecord[])?.map((item, index) => (
            <Card key={index} style={styles.card} elevation={4}>
              <View style={styles.cardHeader}>
                <Text variant="titleLarge" style={styles.cardDate}>
                  {item.start_date} ~ {item.end_date}
                </Text>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text variant="bodyMedium" style={styles.statLabel}>총 수면시간</Text>
                  <Text variant="titleMedium" style={styles.statValue}>{item.total_sleep_hours}시간</Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="bodyMedium" style={styles.statLabel}>평균 수면점수</Text>
                  <Text variant="titleMedium" style={styles.statValue}>{item.average_sleep_score}점</Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="bodyMedium" style={styles.statLabel}>평균 인지점수</Text>
                  <Text variant="titleMedium" style={styles.statValue}>{item.average_cognitive_score}점</Text>
                </View>
              </View>
            </Card>
          ))}

        {/* 월별 */}
        {period === 'month' &&
          (data?.results as MonthRecord[])?.map((item, index) => (
            <Card key={index} style={styles.card} elevation={4}>
              <View style={styles.cardHeader}>
                <Text variant="titleLarge" style={styles.cardDate}>
                  {item.month}
                </Text>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text variant="bodyMedium" style={styles.statLabel}>총 수면시간</Text>
                  <Text variant="titleMedium" style={styles.statValue}>{item.total_sleep_hours}시간</Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="bodyMedium" style={styles.statLabel}>평균 수면점수</Text>
                  <Text variant="titleMedium" style={styles.statValue}>{item.average_sleep_score}점</Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="bodyMedium" style={styles.statLabel}>평균 인지점수</Text>
                  <Text variant="titleMedium" style={styles.statValue}>{item.average_cognitive_score}점</Text>
                </View>
              </View>
            </Card>
          ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
    color: colors.textColor,
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textColor + '80',
    fontSize: fontSize.sm,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: colors.bgColor + '20',
    borderRadius: 12,
    padding: 4,
    marginBottom: spacing.xl,
    marginHorizontal: spacing.sm,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
    minWidth: 70,
    height: 40,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  activeFilterText: {
    fontWeight: 'bold',
  },
  statusContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  statusText: {
    textAlign: 'center',
    fontSize: fontSize.md,
    color: colors.textColor + '80',
  },
  errorText: {
    color: colors.red,
  },
  card: {
    marginBottom: spacing.md,
    borderRadius: 16,
    padding: spacing.lg,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    marginBottom: spacing.md,
  },
  cardDate: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textColor,
    marginBottom: spacing.sm,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.bgColor + '20',
    borderRadius: 12,
    padding: spacing.md,
  },
  scoreItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreLabel: {
    fontSize: fontSize.sm,
    color: colors.textColor + '80',
    marginBottom: spacing.xs,
  },
  scoreValue: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.deepNavy,
  },
  sleepTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.deepNavy + '10',
    borderRadius: 12,
    padding: spacing.md,
  },
  sleepTimeLabel: {
    fontSize: fontSize.md,
    color: colors.textColor,
    fontWeight: '600',
  },
  sleepTimeValue: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.deepNavy,
  },
  statsContainer: {
    backgroundColor: colors.bgColor + '20',
    borderRadius: 12,
    padding: spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  statLabel: {
    fontSize: fontSize.md,
    color: colors.textColor + '80',
    fontWeight: '600',
  },
  statValue: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.textColor,
  },
});

export default HistoryPage;
