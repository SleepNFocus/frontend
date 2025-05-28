import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GreetingCard } from 'src/components/sleep/GreetingCard';
import { Card } from 'src/components/common/Card';
import { HexagonRadarChart } from 'src/components/test/HexagonRadarChart';
import { SummaryCard } from 'src/components/test/SummaryCard';
import { CheckinCard } from 'src/components/sleep/CheckinCard';
import { Text } from 'src/components/common/Text';

const cognitionData = [77, 54, 91, 60, 80, 70];
const cognitionLabels = ['반응 속도', '정보 처리', '패턴 기억', '시각 집중', '지속 집중', '유지력'];
const scoreDetails = [
  { label: '반응 속도', value: '344ms', score: 77 },
  { label: '정보 처리', value: '12개 정답 (92.3%)', score: 54 },
  { label: '패턴 기억', value: '패턴 길이: undefined', score: 91 },
];

export const DashboardMain: React.FC = () => {
  const width = Dimensions.get('window').width;
  const isWide = width > 900;

  return (
    <LinearGradient
      colors={['#edeaff', '#fff']}
      style={styles.bg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
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
                  <HexagonRadarChart data={cognitionData} labels={cognitionLabels} />
                </View>
              </View>
              <View style={styles.detailCol}>
                <View style={styles.detailCard}>
                  <Text style={styles.sectionTitle}>상세 결과</Text>
                  <Text style={styles.avgScore}>전체 평균 점수: <Text style={styles.avgScorePoint}>74점</Text></Text>
                  <View style={styles.scoreCardList}>
                    {scoreDetails.map((item, idx) => (
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    minHeight: Dimensions.get('window').height,
  },
  centerWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  greetingWrap: {
    width: 1100,
    maxWidth: '95%',
    marginTop: 32,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 32,
    width: 1100,
    maxWidth: '95%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  rowMobile: {
    flexDirection: 'column',
    gap: 24,
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
  rightCol: {
    flex: 1,
    gap: 24,
  },
  rightColMobile: {
    flex: 1,
    gap: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 8,
    shadowColor: '#e0e0ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionLabel: {
    fontSize: 15,
    color: '#b0b0d0',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#222',
    alignSelf: 'flex-start',
  },
  avgScore: {
    fontSize: 15,
    color: '#888',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  avgScorePoint: {
    color: '#6C7BFF',
    fontWeight: 'bold',
  },
  scoreCardList: {
    gap: 12,
  },
  scoreCard: {
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 0,
    shadowColor: 'transparent',
    elevation: 0,
    marginTop: 0,
  },
  scoreCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreCardLabelBox: {
    flex: 1,
  },
  scoreCardLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
  scoreCardValue: {
    fontSize: 13,
    color: '#888',
  },
  scoreCardPoint: {
    fontSize: 20,
    color: '#6C7BFF',
    fontWeight: 'bold',
  },
  checkinCardBox: {
    width: '100%',
    minWidth: 0,
  },
  outerCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#e0e0ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    width: '60%',
    maxWidth: '95%',
    alignSelf: 'center',
  },
  detailCard: {
    marginTop: 24,
  },
  innerRow: {
    flexDirection: 'row',
    gap: 32,
    width: '100%',
    alignItems: 'flex-start',
  },
  abilityCol: {
    flex: 1,
    minWidth: 0,
  },
  detailCol: {
    flex: 1,
    minWidth: 0,
  },
});
