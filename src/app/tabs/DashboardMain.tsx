import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GreetingCard } from '@/components/sleep/GreetingCard';
import { Card } from '@/components/common/Card';
import { HexagonRadarChart } from '@/components/test/HexagonRadarChart';
import { SummaryCard } from '@/components/test/SummaryCard';
import { CheckinCard } from '@/components/sleep/CheckinCard';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';

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

export const DashboardMain: React.FC = () => {
  const width = Dimensions.get('window').width;
  const isWide = width > 900;

  return (
    <View style={styles.bg}>
      <View style={styles.centerWrap}>
        <View style={styles.greetingWrap}>
          <GreetingCard userName="닉네임" />
        </View>
        <View style={styles.row}>
          <Card style={styles.outerCard}>
            <View style={styles.innerRow}>
              <View style={styles.abilityCol}>
                <Text style={styles.sectionLabel}>오늘의 수면 점수: -점</Text>
                <Text style={styles.sectionTitle}>나의 인지 능력 프로필</Text>
                <View style={{ alignItems: 'center', marginTop: 12 }}>
                  <HexagonRadarChart
                    data={cognitionData}
                    labels={cognitionLabels}
                  />
                </View>
              </View>
              <View style={styles.detailCol}>
                <View style={styles.detailCard}>
                  <Text style={styles.sectionTitle}>상세 결과</Text>
                  <Text style={styles.avgScore}>
                    전체 평균 점수:{' '}
                    <Text style={styles.avgScorePoint}>74점</Text>
                  </Text>
                  <View style={styles.scoreCardList}>
                    {scoreDetails.map((item, idx) => (
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
                </View>
              </View>
            </View>
          </Card>
          <View style={styles.rightCol}>
            <View>
              <SummaryCard />
            </View>
            <View style={styles.checkinCardBox}>
              <CheckinCard onCheckin={() => alert('컨디션 체크 시작!')} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  abilityCol: {
    flex: 1,
    minWidth: 0,
  },
  avgScore: {
    alignSelf: 'flex-start',
    color: colors.mediumGray,
    fontSize: 15,
    marginBottom: 16,
  },
  avgScorePoint: {
    color: colors.softBlue,
    fontWeight: 'bold',
  },
  bg: {
    flex: 1,
    minHeight: Dimensions.get('window').height,
    width: '100%',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    elevation: 1,
    padding: 8,
    shadowColor: colors.lightGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  centerWrap: {
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
    width: '100%',
  },
  checkinCardBox: {
    minWidth: 0,
    width: '100%',
  },
  detailCard: {
    marginTop: 24,
  },
  detailCol: {
    flex: 1,
    minWidth: 0,
  },
  greetingWrap: {
    alignSelf: 'center',
    marginTop: 32,
    maxWidth: '95%',
    width: 1100,
  },
  innerRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 32,
    width: '100%',
  },
  leftCol: {
    flex: 2,
    gap: 24,
  },
  leftColMobile: {
    flex: 1,
    gap: 24,
  },
  outerCard: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    maxWidth: '95%',
    padding: 20,
    shadowColor: colors.lightGray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    width: '60%',
  },
  rightCol: {
    flex: 1,
    gap: 24,
  },
  rightColMobile: {
    flex: 1,
    gap: 24,
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 32,
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 0,
    maxWidth: '95%',
    paddingBottom: 0,
    paddingTop: 0,
    width: 1100,
  },
  rowMobile: {
    flexDirection: 'column',
    gap: 24,
    width: '100%',
  },
  scoreCard: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    elevation: 0,
    marginBottom: 0,
    marginTop: 0,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: 'transparent',
  },
  scoreCardLabel: {
    color: colors.textColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreCardLabelBox: {
    flex: 1,
  },
  scoreCardList: {
    gap: 12,
  },
  scoreCardPoint: {
    color: colors.softBlue,
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreCardRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreCardValue: {
    color: colors.mediumGray,
    fontSize: 13,
  },
  sectionLabel: {
    alignSelf: 'flex-start',
    color: colors.mediumLightGray,
    fontSize: 15,
    fontWeight: 'bold',
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    color: colors.textColor,
    fontSize: 21,
    fontWeight: 'bold',
  },
});
