import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchSleepRecordDetail } from '@/services/recordListApi';
import { Text } from '@/components/common/Text';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { spacing } from '@/utils/responsive';
import { colors } from '@/constants/colors';

type ParamList = {
  SleepDetail: { date: string };
};

export const SleepRecordDetailPage: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'SleepDetail'>>();
  const navigation = useNavigation();
  const { date } = route.params;

  const { data, isLoading, error } = useQuery({
    queryKey: ['sleepRecordDetail', date],
    queryFn: () => fetchSleepRecordDetail(date),
  });

  if (isLoading) return <Text>로딩 중...</Text>;
  if (error || !data) return <Text>에러 발생 혹은 데이터 없음</Text>;

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
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text> </Text>
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>

      <Text style={styles.header}>{data.date} 기록 상세</Text>
      <View style={styles.card}>
        <Text>총 수면시간: {total_sleep_hours}시간</Text>
        <Text>수면점수: {sleep_score}점</Text>
        <Text>
          SRT 점수: {srt_score}점 / {srt_time_ms}ms
        </Text>
        <Text>
          Symbol 점수: {symbol_score}점 / {symbol_count}개 / 정확도{' '}
          {symbol_accuracy}%
        </Text>
        <Text>
          Pattern 점수: {pattern_score}점 / {pattern_count}개 / 정확도{' '}
          {pattern_accuracy}% / {pattern_time_ms}ms
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    paddingTop: 100,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  backText: {
    fontSize: 16,
    marginLeft: spacing.sm,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.lightGray,
    borderRadius: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
  },
});

export default SleepRecordDetailPage;
