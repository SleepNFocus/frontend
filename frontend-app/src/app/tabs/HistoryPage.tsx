import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSleepRecordList } from '@/services/recordListApi';
import { Text } from '@/components/common/Text';
import { DayRecord, MonthRecord, WeekRecord } from '@/types/history';
import { colors } from '@/constants/colors';
import { spacing } from '@/utils/responsive';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';

const periodOptions = ['day', 'week', 'month'] as const;
type Period = (typeof periodOptions)[number];

export const HistoryPage: React.FC = () => {
  const [period, setPeriod] = useState<Period>('day');
  const { data, isLoading, error } = useSleepRecordList(period);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 필터 버튼 */}
      <View style={styles.filterContainer}>
        {periodOptions.map(p => (
          <TouchableOpacity
            key={p}
            onPress={() => setPeriod(p)}
            style={[
              styles.filterButton,
              period === p && styles.activeFilterButton,
            ]}
          >
            <Text>{p === 'day' ? '일별' : p === 'week' ? '주별' : '월별'}</Text>
          </TouchableOpacity>
        ))}
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
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              navigation.navigate('SleepDetail', { date: item.date })
            }
          >
            <Text>날짜: {item.date}</Text>
            <Text>수면시간: {item.sleep_hour}시간</Text>
            <Text>수면점수: {item.sleep_score}점</Text>
            <Text>인지점수: {item.cognitive_score}점</Text>
          </TouchableOpacity>
        ))}

      {/* 주별 */}
      {period === 'week' &&
        (data?.results as WeekRecord[])?.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text>시작일: {item.start_date}</Text>
            <Text>종료일: {item.end_date}</Text>
            <Text>총 수면시간: {item.total_sleep_hours}시간</Text>
            <Text>평균 수면점수: {item.average_sleep_score}</Text>
            <Text>평균 인지점수: {item.average_cognitive_score}</Text>
          </View>
        ))}

      {/* 월별 */}
      {period === 'month' &&
        (data?.results as MonthRecord[])?.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text>월: {item.month}</Text>
            <Text>총 수면시간: {item.total_sleep_hours}시간</Text>
            <Text>평균 수면점수: {item.average_sleep_score}</Text>
            <Text>평균 인지점수: {item.average_cognitive_score}</Text>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingTop: 300,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
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
    backgroundColor: colors.lightGray,
    borderRadius: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
  },
});

export default HistoryPage;
