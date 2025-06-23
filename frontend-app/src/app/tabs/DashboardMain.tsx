import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout } from '@/components/common/Layout';
import { GreetingCard } from '@/components/sleep/GreetingCard';
import { Card } from '@/components/common/Card';
import { SummaryCard } from '@/components/sleep/SummaryCard';
import { CheckinCard } from '@/components/sleep/CheckinCard';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';
import { fontSize, spacing } from '@/utils/responsive';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { useGetDailySummary } from '@/services/testApi';
import ResultChart from '@/components/common/ResultChart';
import { useAuthStore } from '@/store/authStore';
import { format } from 'date-fns';
import { useSleepRecord } from '@/services/sleepApi';

interface ScoreDetail {
  label: string;
  value: string;
  score: number;
}

interface CognitionData {
  data: number[];
  labels: string[];
}

interface AbilityProfileCardProps {
  data: number[];
  labels: string[];
  sleepScore?: number;
}

interface ScoreDetailCardProps {
  details: ScoreDetail[];
  averageScore: number;
}

// AbilityProfileCard
const AbilityProfileCard: React.FC<AbilityProfileCardProps> = memo(
  ({ data, labels, sleepScore }) => {
    return (
      <Card style={styles.abilityCard}>
        <Text style={styles.sectionTitle}>나의 인지 능력 프로필</Text>
        <Text style={styles.sectionLabel}>
          오늘의 수면 점수: {sleepScore}점
        </Text>
        <View style={styles.chartContainer}>
          <ResultChart data={data} labels={labels} />
        </View>
      </Card>
    );
  },
);

// ScoreDetailCard
const ScoreDetailCard: React.FC<ScoreDetailCardProps> = memo(
  ({ details, averageScore }) => {
    return (
      <Card style={styles.detailCard}>
        <Text style={styles.sectionTitle}>인지 테스트 상세 결과</Text>
        <Text style={styles.avgScore}>
          평균 점수:{' '}
          <Text style={styles.avgScorePoint}>{Math.floor(averageScore)}점</Text>
        </Text>
        <View style={styles.scoreCardList}>
          {details.map(item => (
            <View key={item.label} style={styles.scoreCard}>
              <View style={styles.scoreCardRow}>
                <View style={styles.scoreCardLabelBox}>
                  <Text style={styles.scoreCardLabel}>{item.label}</Text>
                  <Text style={styles.scoreCardValue}>{item.value}</Text>
                </View>
                <Text style={styles.scoreCardPoint}>{item.score}점</Text>
              </View>
            </View>
          ))}
        </View>
      </Card>
    );
  },
);
// DashboardMain
export const DashboardMain: React.FC = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const today = format(new Date(), 'yyyy-MM-dd');
  const { data: sleepRecordData } = useSleepRecord(today);
  const sleepScore = sleepRecordData?.score ?? 0;

  const [cognitionData, setCognitionData] = useState<CognitionData>({
    data: [],
    labels: [],
  });
  const [scoreDetails, setScoreDetails] = useState<ScoreDetail[]>([]);
  const [averageScore, setAverageScore] = useState<number>(0);

  const { user } = useAuthStore();

  const {
    mutate: fetchSummary,
    data,
    isPending,
    isError,
    error,
  } = useGetDailySummary();

  const [hasCognitiveScore, setHasCognitiveScore] = useState(false);

  useEffect(() => {
    fetchSummary(undefined, {
      onSuccess: res => {
        if (!res || res.length === 0) return;

        const latest = res[res.length - 1];

        const cognition = [
          latest.raw_scores.srt.average_score,
          latest.raw_scores.symbol.average_score,
          latest.raw_scores.pattern.average_score,
        ];

        const hasScore = cognition.some(
          score => typeof score === 'number' && score > 0,
        );
        setHasCognitiveScore(hasScore);

        const labels = ['반응 속도', '정보 처리', '패턴 기억'];

        const detail: ScoreDetail[] = [
          {
            label: '반응 속도',
            value: `${latest.raw_scores.srt.avg_ms}ms`,
            score: Math.floor(latest.raw_scores.srt.average_score),
          },
          {
            label: '정보 처리',
            value: `정답 개수: ${latest.raw_scores.symbol.correct}개 / 정확도: ${latest.raw_scores.symbol.symbol_accuracy}%`,
            score: Math.floor(latest.raw_scores.symbol.average_score),
          },
          {
            label: '패턴 기억',
            value: `정답 개수: ${latest.raw_scores.pattern.correct}개`,
            score: Math.floor(latest.raw_scores.pattern.average_score),
          },
        ];

        setCognitionData({ data: cognition, labels });
        setScoreDetails(detail);
        setAverageScore(latest.average_score);
      },
    });
  }, []);

  if (isPending) {
    return (
      <Layout>
        <View style={{ padding: 20 }}>
          <Text>데이터 불러오는 중...</Text>
        </View>
      </Layout>
    );
  }

  return (
    <ErrorBoundary>
      <Layout>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Card style={styles.greetingWrap}>
            <GreetingCard userName={user?.nickname} />
          </Card>
          {!hasCognitiveScore && (
            <View style={styles.checkinSection}>
              <CheckinCard
                onCheckin={() => navigation.navigate('SleepRecord')}
              />
            </View>
          )}

          <AbilityProfileCard
            data={cognitionData.data}
            labels={cognitionData.labels}
            sleepScore={sleepScore}
          />

          <ScoreDetailCard details={scoreDetails} averageScore={averageScore} />

          {/* <Card style={styles.summarySection}>
            <SummaryCard />
          </Card> */}
        </ScrollView>
      </Layout>
    </ErrorBoundary>
  );
});

DashboardMain.displayName = 'DashboardMain';

export default DashboardMain;

// 스타일 정의
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    gap: 12,
  },
  greetingWrap: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  abilityCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  chartContainer: {
    alignItems: 'center',
  },
  detailCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  summarySection: {
    width: '100%',
  },
  checkinSection: {
    width: '100%',
  },
  sectionLabel: {
    color: colors.midnightBlue,
    fontSize: fontSize.md,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    color: colors.textColor,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
  },
  avgScore: {
    color: colors.midnightBlue,
    fontSize: fontSize.md,
    marginBottom: spacing.lg,
  },
  avgScorePoint: {
    color: colors.softBlue,
    fontWeight: 'bold',
  },
  scoreCardList: {
    gap: 16,
  },
  scoreCard: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 16,
  },
  scoreCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreCardLabelBox: {
    flex: 1,
  },
  scoreCardLabel: {
    color: colors.deepNavy,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  scoreCardValue: {
    color: colors.midnightBlue,
    fontSize: fontSize.xs,
  },
  scoreCardPoint: {
    color: colors.softBlue,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: colors.midnightBlue,
    fontSize: fontSize.md,
    textAlign: 'center',
  },
});
