import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { GreetingCard } from 'src/components/sleep/GreetingCard';
import { HexagonRadarChart } from 'src/components/test/HexagonRadarChart';
import { SummaryCard } from 'src/components/test/SummaryCard';
import { CheckinCard } from 'src/components/sleep/CheckinCard';
import { Card } from 'src/components/common/Card';

// 목업 데이터
const cognitionData = [77, 54, 91, 60, 80, 70];
const cognitionLabels = ['반응 속도', '정보 처리', '패턴 기억', '시각 집중', '지속 집중', '유지력'];
const scoreDetails = [
  { label: '반응 속도', value: '344ms', score: 77 },
  { label: '정보 처리', value: '12개 정답 (92.3%)', score: 54 },
  { label: '패턴 기억', value: '패턴 길이: undefined', score: 91 },
];

export const DashboardMain: React.FC = () => {
  const width = Dimensions.get('window').width;
  const isWide = width > 700;

  return (
    <View style={styles.root}>
      {/* 상단 인사/안내 */}
      <View style={styles.greetingBox}>
        <GreetingCard userName="닉네임" sleepScore={null} />
      </View>
      {/* 메인 카드: 레이더차트+상세결과 */}
      <View style={[styles.mainRow, !isWide && styles.mainRowColumn]}>
        {/* 좌측: 큰 카드 */}
        <Card style={styles.leftMainCard}>
          <View style={[styles.leftMainContent, !isWide && styles.leftMainContentColumn]}>
            {/* 좌: 수면점수/프로필/레이더 */}
            <View style={styles.leftBox}>
              <Text style={styles.sleepScoreLabel}>오늘의 수면 점수: -점</Text>
              <Text style={styles.profileTitle}>나의 인지 능력 프로필</Text>
              <HexagonRadarChart data={cognitionData} labels={cognitionLabels} />
            </View>
            {/* 우: 상세 결과+점수카드 */}
            <View style={styles.rightBox}>
              <Text style={styles.detailTitle}>상세 결과</Text>
              <Text style={styles.avgScore}>전체 평균 점수: <Text style={styles.avgScorePoint}>74점</Text></Text>
              <View style={styles.scoreCardList}>
                {scoreDetails.map((item, idx) => (
                  <Card key={item.label} style={styles.scoreCard}>
                    <View style={styles.scoreCardRow}>
                      <View style={styles.scoreCardLabelBox}>
                        <Text style={styles.scoreCardLabel}>{item.label}</Text>
                        <Text style={styles.scoreCardValue}>{item.value}</Text>
                      </View>
                      <Text style={styles.scoreCardPoint}>{item.score}점</Text>
                    </View>
                  </Card>
                ))}
              </View>
            </View>
          </View>
        </Card>
        {/* 우측: 요약/체크인 */}
        <View style={styles.rightCol}>
          <Card style={styles.sideCard}><SummaryCard /></Card>
          <View style={styles.checkinCardBox}>
            <CheckinCard onCheckin={() => alert('컨디션 체크 시작!')} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#f5f6ff',
    paddingVertical: 40,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  greetingBox: {
    width: '100%',
    maxWidth: 1100,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  mainRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 24,
    boxShadow: '0 4px 24px 0 #e0e0ff33',
    shadowColor: '#e0e0ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 2,
    padding: 40,
    marginBottom: 32,
    width: '100%',
    maxWidth: 1100,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 48,
  },
  mainRowColumn: {
    flexDirection: 'column',
    gap: 0,
    alignItems: 'center',
    padding: 18,
  },
  leftMainCard: {
    flex: 1.2,
    minWidth: 260,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 32,
  },
  leftMainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftMainContentColumn: {
    flexDirection: 'column',
    gap: 0,
    alignItems: 'center',
    padding: 18,
  },
  leftBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sleepScoreLabel: {
    fontSize: 15,
    color: '#b0b0d0',
    marginBottom: 2,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  profileTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  rightBox: {
    flex: 1,
    minWidth: 320,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  detailTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
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
    gap: 14,
  },
  scoreCard: {
    backgroundColor: '#f8f9ff',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 0,
    shadowColor: 'transparent',
    elevation: 0,
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
    marginBottom: 2,
  },
  scoreCardValue: {
    fontSize: 13,
    color: '#888',
  },
  scoreCardPoint: {
    fontSize: 20,
    color: '#6C7BFF',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  rightCol: {
    width: '100%',
    maxWidth: 340,
    marginHorizontal: 8,
  },
  sideCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    width: '100%',
    shadowColor: '#e0e0ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 2,
    minWidth: 0,
  },
  checkinCardBox: {
    padding: 0,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    elevation: 0,
  },
}); 