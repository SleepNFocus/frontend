import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GreetingCard } from '@/components/sleep/GreetingCard';
import { Card } from '@/components/common/Card';
import { HexagonRadarChart } from '@/components/test/HexagonRadarChart';
import { SummaryCard } from '@/components/test/SummaryCard';
import { CheckinCard } from '@/components/sleep/CheckinCard';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';
import { fontSize, spacing, isSmallDevice, getResponsiveStyle } from '@/utils/responsive';

const cognitionData = [77, 54, 91, 60, 80, 70];
const cognitionLabels = [
  '반응 속도',
  '정보 처리',
  '패턴 기억',
  '시각 집중',
  '지속 집중',
  '유지력',
];
const scoreDetails = [
  { label: '반응 속도', value: '344ms', score: 77 },
  { label: '정보 처리', value: '12개 정답 (92.3%)', score: 54 },
  { label: '패턴 기억', value: '패턴 길이: undefined', score: 91 },
];

/**
 * 대시보드 메인 컴포넌트
 * 사용자의 인지 능력 프로필과 수면 점수를 보여주는 메인 화면
 */
export const DashboardMain: React.FC = () => {
  return (
    <LinearGradient
      colors={[colors.softBlue, colors.white]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: spacing.xxl * 4 }]}
        >
          <Card style={styles.greetingWrap}>
            <GreetingCard userName="닉네임" />
          </Card>
          
          <Card style={styles.abilityCard}>
            <Text style={styles.sectionLabel}>오늘의 수면 점수: -점</Text>
            <Text style={styles.sectionTitle}>나의 인지 능력 프로필</Text>
            <View style={styles.chartContainer}>
              <HexagonRadarChart
                data={cognitionData}
                labels={cognitionLabels}
              />
            </View>
          </Card>

          <Card style={styles.detailCard}>
            <Text style={styles.sectionTitle}>상세 결과</Text>
            <Text style={styles.avgScore}>
              전체 평균 점수:{' '}
              <Text style={styles.avgScorePoint}>74점</Text>
            </Text>
            <View style={styles.scoreCardList}>
              {scoreDetails.map((item) => (
                <View key={item.label} style={styles.scoreCard}>
                  <View style={styles.scoreCardRow}>
                    <View style={styles.scoreCardLabelBox}>
                      <Text style={styles.scoreCardLabel}>
                        {item.label}
                      </Text>
                      <Text style={styles.scoreCardValue}>
                        {item.value}
                      </Text>
                    </View>
                    <Text style={styles.scoreCardPoint}>
                      {item.score}점
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          <Card style={styles.summarySection}>
            <SummaryCard />
          </Card>

          <View style={styles.checkinSection}>
            <CheckinCard onCheckin={() => alert('컨디션 체크 시작!')} />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  greetingWrap: {
    width: '100%',
    padding: spacing.lg,
    borderRadius: spacing.lg,
    backgroundColor: colors.white,
  },
  abilityCard: {
    padding: spacing.lg,
    borderRadius: spacing.lg,
    backgroundColor: colors.white,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  detailCard: {
    padding: spacing.lg,
    borderRadius: spacing.lg,
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
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    color: colors.deepNavy,
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
  },
  avgScore: {
    color: colors.midnightBlue,
    fontSize: fontSize.sm,
    marginBottom: spacing.lg,
  },
  avgScorePoint: {
    color: colors.softBlue,
    fontWeight: 'bold',
  },
  scoreCardList: {
    gap: spacing.sm,
  },
  scoreCard: {
    backgroundColor: colors.lightGray,
    borderRadius: spacing.sm,
    padding: spacing.lg,
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
    marginTop: spacing.xs,
  },
  scoreCardPoint: {
    color: colors.softBlue,
    fontSize: fontSize.xl,
    fontWeight: 'bold',
  },
});
