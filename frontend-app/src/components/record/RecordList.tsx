import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { GlassCard } from '@/components/common/Card';
import { colors } from '@/constants/colors';
import dayjs from 'dayjs';

interface RecordItem {
  date: string;
  sleepTime: string;
  score: number;
}

interface RecordListProps {
  data: RecordItem[];
}

const RecordList = ({ data }: RecordListProps) => {
  const { width } = useWindowDimensions();

  const isSmallDevice = width < 360;

  const renderItem = ({ item }: { item: RecordItem }) => (
    <GlassCard style={[styles.card, isSmallDevice && styles.cardSmall]}>
      <Text style={[styles.date, isSmallDevice && styles.dateSmall]}>
        {dayjs(item.date).format('YYYY년 M월 D일')}
      </Text>
      <Text style={[styles.text, isSmallDevice && styles.textSmall]}>
        수면 시간: {item.sleepTime}
      </Text>
      <Text style={[styles.text, isSmallDevice && styles.textSmall]}>
        집중력 점수: {item.score}점
      </Text>
    </GlassCard>
  );

  if (data.length === 0) {
    return (
      <GlassCard style={styles.emptyCard}>
        <Text style={styles.emptyText}>기록이 아직 없어요</Text>
        <Text style={styles.emptySubText}>
          수면 및 집중력 테스트 결과가 여기에 표시됩니다
        </Text>
      </GlassCard>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.date}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default RecordList;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 24,
    gap: 12,
    paddingHorizontal: 16,
  },
  card: {
    padding: 20,
    borderRadius: 16,
  },
  cardSmall: {
    padding: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.deepNavy,
    marginBottom: 6,
  },
  dateSmall: {
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    color: colors.textColor,
  },
  textSmall: {
    fontSize: 12,
  },
  emptyCard: {
    marginTop: 24,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.deepNavy,
    marginBottom: 6,
  },
  emptySubText: {
    fontSize: 14,
    color: colors.mediumGray,
    textAlign: 'center',
  },
});
