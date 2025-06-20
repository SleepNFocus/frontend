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

const periodOptions = ['day', 'week', 'month'] as const;
type Period = (typeof periodOptions)[number];

export const HistoryPage: React.FC = () => {
  const [period, setPeriod] = useState<Period>('day');
  const { data, isLoading, error } = useSleepRecordList(period);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.secContainer}>
          <Text variant="headlineMedium" style={styles.text}>
            수면 기록 조회
          </Text>
          {/* 필터 버튼 */}
          <View style={styles.filterContainer}>
            {periodOptions.map(p => (
              <Button
                key={p}
                onPress={() => setPeriod(p)}
                title={p === 'day' ? '일별' : p === 'week' ? '주별' : '월별'}
                variant={period === p ? 'primary' : 'outline'}
                style={styles.filterButton}
                textStyle={period === p ? styles.activeFilterText : undefined}
              />
            ))}
          </View>
        </View>

        {/* 상태 표시 */}
        {isLoading && <Text style={styles.statusText}>로딩 중...</Text>}
        {error && (
          <Text style={[styles.statusText]}>
            에러 발생:{' '}
            {error instanceof Error ? error.message : '알 수 없는 오류'}
          </Text>
        )}

        {/* 일별 */}
        {period === 'day' &&
          (data?.results as DayRecord[])?.map((item, index) => (
            <Card
              key={index}
              style={styles.card}
              onPress={() =>
                navigation.navigate('SleepDetail', { date: item.date })
              }
            >
              <Text style={styles.text} variant="titleLarge">
                {item.date}
              </Text>
              <Text>수면시간 {item.sleep_hour}시간 </Text>
              <Text>수면점수 {item.sleep_score}점</Text>
              <Text>인지점수 {item.cognitive_score}점</Text>
            </Card>
          ))}

        {/* 주별 */}
        {period === 'week' &&
          (data?.results as WeekRecord[])?.map((item, index) => (
            <Card key={index} style={styles.card}>
              <Text style={styles.text}>시작일: {item.start_date}</Text>
              <Text>종료일: {item.end_date}</Text>
              <Text>총 수면시간: {item.total_sleep_hours}시간</Text>
              <Text>평균 수면점수: {item.average_sleep_score}</Text>
              <Text>평균 인지점수: {item.average_cognitive_score}</Text>
            </Card>
          ))}

        {/* 월별 */}
        {period === 'month' &&
          (data?.results as MonthRecord[])?.map((item, index) => (
            <Card key={index} style={styles.card}>
              <Text>월: {item.month}</Text>
              <Text>총 수면시간: {item.total_sleep_hours}시간</Text>
              <Text>평균 수면점수: {item.average_sleep_score}</Text>
              <Text>평균 인지점수: {item.average_cognitive_score}</Text>
            </Card>
          ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  secContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 40,
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: 60,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    minWidth: 70,
    height: 40,
  },
  activeFilterButton: {
    backgroundColor: 'lightgray',
    borderColor: 'black',
  },
  activeFilterText: {
    fontWeight: 'bold',
  },
  statusText: {
    textAlign: 'center',
    marginBottom: spacing.md,
    color: colors.textColor,
  },
  card: {
    gap: 3,
    paddingHorizontal: 40,
    padding: 10,
  },
  text: {
    paddingVertical: 4,
  },
  roxBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  defaultText: {
    fontWeight: 'bold',
  },
});

export default HistoryPage;
