import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSleepRecordList } from '@/services/recordListApi';
import { Text } from '@/components/common/Text';
import { DayRecord, MonthRecord, WeekRecord } from '@/types/history';
import { colors } from '@/constants/colors';
import { spacing } from '@/utils/responsive';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Layout } from '@/components/common/Layout';

const periodOptions = ['day', 'week', 'month'] as const;
type Period = (typeof periodOptions)[number];

export const HistoryPage: React.FC = () => {
  const [period, setPeriod] = useState<Period>('day');
  const { data, isLoading, error } = useSleepRecordList(period);
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
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
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
            <Text variant="bodyLarge" style={styles.statusText}>
              로딩 중...
            </Text>
          </View>
        )}
        {error && (
          <View style={styles.statusContainer}>
            <Text
              variant="bodyLarge"
              style={[styles.statusText, styles.errorText]}
            >
              {(() => {
                if (
                  error instanceof Error &&
                  'response' in error &&
                  typeof error.response === 'object'
                ) {
                  const err = error as any;
                  const status = err?.response?.status;
                  const msg = err?.response?.data?.message;
                  if (status === 400) {
                    return '테스트 정보가 없습니다. \n 오늘의 수면을 기록해보세요 !';
                  }
                  return `에러 발생: ${msg ?? error.message}`;
                }

                return '에러 발생: 알 수 없는 오류';
              })()}
            </Text>
          </View>
        )}

        {/* 일별 */}
        {period === 'day' &&
          (data?.results as DayRecord[])
            ?.sort((a, b) => (a.date < b.date ? 1 : -1))
            .slice(0, 60)
            .map((item, index) => (
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
                      <Text variant="labelMedium" style={styles.scoreLabel}>
                        수면점수
                      </Text>
                      <Text variant="titleMedium" style={styles.scoreValue}>
                        {item.sleep_score}점
                      </Text>
                    </View>
                    <View style={styles.scoreItem}>
                      <Text variant="labelMedium" style={styles.scoreLabel}>
                        인지점수
                      </Text>
                      <Text variant="titleMedium" style={styles.scoreValue}>
                        {item.cognitive_score}점
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.sleepTimeContainer}>
                  <Text variant="bodyLarge" style={styles.sleepTimeLabel}>
                    총 수면시간
                  </Text>
                  <Text variant="titleLarge" style={styles.sleepTimeValue}>
                    {item.sleep_hour}시간
                  </Text>
                </View>
              </Card>
            ))}

        {/* 주별 */}
        {period === 'week' &&
          (data?.results as WeekRecord[])
            ?.sort(
              (a, b) =>
                new Date(b.start_date).getTime() -
                new Date(a.start_date).getTime(),
            )
            .slice(0, 12)
            .map((item, index) => (
              <Card key={index} style={styles.card} elevation={4}>
                <View style={styles.cardHeader}>
                  <Text variant="titleLarge" style={styles.cardDate}>
                    {item.start_date} ~ {item.end_date}
                  </Text>
                </View>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text variant="bodyMedium" style={styles.statLabel}>
                      총 수면시간
                    </Text>
                    <Text variant="titleMedium" style={styles.statValue}>
                      {item.total_sleep_hours}시간
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text variant="bodyMedium" style={styles.statLabel}>
                      평균 수면점수
                    </Text>
                    <Text variant="titleMedium" style={styles.statValue}>
                      {item.average_sleep_score}점
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text variant="bodyMedium" style={styles.statLabel}>
                      평균 인지점수
                    </Text>
                    <Text variant="titleMedium" style={styles.statValue}>
                      {item.average_cognitive_score}점
                    </Text>
                  </View>
                </View>
              </Card>
            ))}

        {/* 월별 */}
        {period === 'month' &&
          (data?.results as MonthRecord[])
            ?.sort(
              (a, b) =>
                new Date(b.month + '-01').getTime() -
                new Date(a.month + '-01').getTime(),
            )
            .slice(0, 3)
            .map((item, index) => (
              <Card key={index} style={styles.card} elevation={4}>
                <View style={styles.cardHeader}>
                  <Text variant="titleLarge" style={styles.cardDate}>
                    {item.month}
                  </Text>
                </View>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text variant="bodyMedium" style={styles.statLabel}>
                      총 수면시간
                    </Text>
                    <Text variant="titleMedium" style={styles.statValue}>
                      {item.total_sleep_hours}시간
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text variant="bodyMedium" style={styles.statLabel}>
                      평균 수면점수
                    </Text>
                    <Text variant="titleMedium" style={styles.statValue}>
                      {item.average_sleep_score}점
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text variant="bodyMedium" style={styles.statLabel}>
                      평균 인지점수
                    </Text>
                    <Text variant="titleMedium" style={styles.statValue}>
                      {item.average_cognitive_score}점
                    </Text>
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
    height: 50,
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
    color: colors.textColor + '80',
    marginBottom: spacing.xs,
  },
  scoreValue: {
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
    color: colors.textColor,
    fontWeight: '600',
  },
  sleepTimeValue: {
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
    color: colors.textColor + '80',
    fontWeight: '600',
  },
  statValue: {
    fontWeight: '700',
    color: colors.textColor,
  },
});

export default HistoryPage;
