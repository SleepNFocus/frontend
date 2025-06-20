import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Layout } from '@/components/common/Layout';
import Navbar from '@/components/common/Navbar';
import { Text } from '@/components/common/Text';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { colors } from '@/constants/colors';
import { spacing, fontSize } from '@/utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useSleepRecord } from '@/services/sleepApi';

export const HistoryPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'gallery'>('list');
  const [testDate, setTestDate] = useState<string | null>(null);
  
  // GET 요청 테스트용 훅
  const { data: sleepData, isLoading, error, refetch } = useSleepRecord(testDate || '');

  const handleGetTest = (date: string) => {
    console.log('🧪 GET 테스트 시작 - 날짜:', date);
    setTestDate(date);
  };

  const handleRefreshTest = () => {
    console.log('🔄 수동 refetch 실행');
    if (testDate) {
      refetch();
    }
  };

  return (
    <Layout showNavbar={true}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* 🧪 GET 요청 테스트 카드 */}
        <Card style={styles.sectionCard}>
          <Text style={styles.testTitle}>🧪 GET 요청 테스트</Text>
          
          <View style={styles.testButtonGroup}>
            <Button
              title="2025-06-20 조회"
              onPress={() => handleGetTest('2025-06-20')}
              style={styles.testButton}
            />
            <Button
              title="2025-06-21 조회"
              onPress={() => handleGetTest('2025-06-21')}
              style={styles.testButton}
            />
            <Button
              title="새로고침"
              onPress={handleRefreshTest}
              style={styles.testButton}
              disabled={!testDate}
            />
          </View>

          {/* 테스트 상태 표시 */}
          <View style={styles.testStatus}>
            <Text style={styles.statusText}>
              📅 테스트 날짜: {testDate || '선택되지 않음'}
            </Text>
            <Text style={styles.statusText}>
              🔄 로딩 상태: {isLoading ? '로딩 중...' : '완료'}
            </Text>
            <Text style={styles.statusText}>
              📊 데이터 존재: {sleepData ? 'O' : 'X'}
            </Text>
            <Text style={styles.statusText}>
              ❌ 에러: {error ? '있음' : '없음'}
            </Text>
          </View>

          {/* 응답 데이터 표시 */}
          {sleepData && (
            <View style={styles.dataDisplay}>
              <Text style={styles.dataTitle}>✅ 수신된 데이터:</Text>
              <Text style={styles.dataText}>날짜: {sleepData.date}</Text>
              <Text style={styles.dataText}>점수: {sleepData.score}점</Text>
              <Text style={styles.dataText}>수면시간: {Math.floor(sleepData.sleep_duration / 60)}시간 {sleepData.sleep_duration % 60}분</Text>
              <Text style={styles.dataText}>수면질: {sleepData.subjective_quality}/5</Text>
              <Text style={styles.dataText}>방해요인: {sleepData.disturb_factors.join(', ') || '없음'}</Text>
            </View>
          )}

          {/* 에러 표시 */}
          {error && (
            <View style={styles.errorDisplay}>
              <Text style={styles.errorTitle}>❌ 에러 발생:</Text>
              <Text style={styles.errorText}>
                {error instanceof Error ? error.message : '알 수 없는 오류'}
              </Text>
            </View>
          )}
        </Card>

        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>수면 기록</Text>
          <View style={styles.recordList}>
            <Card style={styles.recordCard}>
              <Text style={styles.dateText}>2024.03.20</Text>
              <Text style={styles.recordText}>수면 시간: 7시간 30분</Text>
              <Text style={styles.recordText}>수면 점수: 85점</Text>
            </Card>
            <Card style={styles.recordCard}>
              <Text style={styles.dateText}>2024.03.19</Text>
              <Text style={styles.recordText}>수면 시간: 6시간 45분</Text>
              <Text style={styles.recordText}>수면 점수: 78점</Text>
            </Card>
          </View>
        </Card>

        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>인지 테스트 결과</Text>
          <View style={styles.recordList}>
            <Card style={styles.recordCard}>
              <Text style={styles.dateText}>2024.03.20</Text>
              <Text style={styles.recordText}>테스트 유형: 집중력 테스트</Text>
              <Text style={styles.recordText}>점수: 92점</Text>
            </Card>
            <Card style={styles.recordCard}>
              <Text style={styles.dateText}>2024.03.19</Text>
              <Text style={styles.recordText}>테스트 유형: 기억력 테스트</Text>
              <Text style={styles.recordText}>점수: 88점</Text>
            </Card>
          </View>
        </Card>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  pageTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: colors.softBlue + '20',
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.textColor,
    marginBottom: spacing.md,
  },
  recordList: {
    gap: spacing.md,
  },
  recordCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    borderRadius: spacing.md,
  },
  dateText: {
    fontSize: fontSize.sm,
    color: colors.mediumGray,
    marginBottom: spacing.xs,
  },
  recordText: {
    fontSize: fontSize.md,
    color: colors.textColor,
    marginBottom: spacing.xs,
  },
  // 🧪 테스트 카드 스타일
  testCard: {
    borderColor: '#e74c3c',
    borderWidth: 2,
    backgroundColor: '#fff5f5',
  },
  testTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  testButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  testButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 8,
  },
  refreshButton: {
    backgroundColor: '#f39c12',
  },
  testStatus: {
    backgroundColor: '#f8f9fa',
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.md,
  },
  statusText: {
    fontSize: fontSize.sm,
    color: colors.textColor,
    marginBottom: 4,
  },
  dataDisplay: {
    backgroundColor: '#d4edda',
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.sm,
  },
  dataTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: '#155724',
    marginBottom: spacing.xs,
  },
  dataText: {
    fontSize: fontSize.sm,
    color: '#155724',
    marginBottom: 2,
  },
  errorDisplay: {
    backgroundColor: '#f8d7da',
    padding: spacing.md,
    borderRadius: spacing.sm,
  },
  errorTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: '#721c24',
    marginBottom: spacing.xs,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: '#721c24',
  },
});

export default HistoryPage;