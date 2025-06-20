import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { Layout } from '@/components/common/Layout';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { SleepRecordForm } from '@/components/sleep/SleepRecordForm';
import { SleepRecordData } from '@/types/sleep';
import { RootStackParamList } from '@/App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import useUiStore from '@/store/uiStore';
import { useSaveSleepRecord, useSleepRecord } from '@/services/sleepApi';
import { useQueryClient } from '@tanstack/react-query';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SleepRecordPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isRecordSaved, setIsRecordSaved] = useState(false);
  const [savedDate, setSavedDate] = useState<string | null>(null);
  const { openToast } = useUiStore();
  const queryClient = useQueryClient();

  const saveSleepRecordMutation = useSaveSleepRecord();

  // savedDate가 있을 때만 useSleepRecord 호출
  const shouldFetchData = !!savedDate && isRecordSaved;

  const {
    data: sleepData,
    isLoading: isLoadingData,
    error: sleepDataError,
    refetch,
  } = useSleepRecord(savedDate || '');

  // savedDate가 변경될 때마다 데이터 상태 확인
  useEffect(() => {
    if (savedDate && isRecordSaved) {
      // 간단한 refetch 시도
      setTimeout(() => {
        refetch();
      }, 1000);
    }
  }, [savedDate, isRecordSaved, refetch]);

  const getFeedback = (score: number) => {
    if (score >= 90) {
      return {
        emoji: '🌟',
        title: '최고의 수면!',
        message:
          '완벽한 수면 습관을 가지고 계시는군요! 오늘 하루도 활기차게 시작하세요!',
        color: colors.softBlue,
      };
    }
    if (score >= 70) {
      return {
        emoji: '😊',
        title: '좋은 수면!',
        message:
          '건강한 수면 패턴을 잘 유지하고 계세요. 작은 개선으로 더 완벽해질 수 있어요.',
        color: colors.softBlue,
      };
    }
    if (score >= 50) {
      return {
        emoji: '🤔',
        title: '보통 수면.',
        message: '괜찮지만, 조금 더 신경 쓰면 수면의 질을 높일 수 있어요.',
        color: colors.softBlue,
      };
    }
    return {
      emoji: '🛌',
      title: '개선이 필요한 수면.',
      message: '수면 습관을 점검하고 개선해 보세요.',
      color: colors.red || '#ff6b6b',
    };
  };

  const formatSleepDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  const formatSleepLatency = (latency: number) => {
    switch (latency) {
      case 1:
        return '15분 이하';
      case 2:
        return '15-30분';
      case 3:
        return '30분 초과';
      default:
        return '알 수 없음';
    }
  };

  const formatSubjectiveQuality = (quality: number) => {
    switch (quality) {
      case 5:
        return '매우 개운함';
      case 4:
        return '개운함';
      case 3:
        return '보통';
      case 2:
        return '약간 피곤함';
      case 1:
        return '매우 피곤함';
      default:
        return '알 수 없음';
    }
  };

  const handleSaveRecord = async (recordData: SleepRecordData) => {
    try {
      const result = await saveSleepRecordMutation.mutateAsync(recordData);

      // 상태 업데이트
      setSavedDate(recordData.selectedDate);
      setIsRecordSaved(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '수면 기록 저장에 실패했습니다. 다시 시도해 주세요.';
    }
  };

  const startNewRecord = () => {
    setIsRecordSaved(false);
    setSavedDate(null);
  };

  // 로딩 상태
  if (saveSleepRecordMutation.isPending) {
    return (
      <Layout>
        <View style={styles.loadingContainer}>
          <Text variant="titleMedium" style={styles.loadingText}>
            저장 중입니다...
          </Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {!isRecordSaved ? (
          // 수면 기록 입력 폼
          <SleepRecordForm onSave={handleSaveRecord} />
        ) : (
          // 결과 화면
          <View style={styles.resultSection}>
            {/* 점수 피드백 */}
            {savedDate && isLoadingData ? (
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.softBlue} />
                    <Text variant="bodyMedium" style={styles.loadingText}>
                      수면 점수를 불러오고 있습니다...
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ) : savedDate && sleepData ? (
              <Card
                style={[
                  styles.card,
                  { borderLeftColor: getFeedback(sleepData.score || 0).color },
                ]}
              >
                <Card.Content>
                  <View style={styles.header}>
                    <Text style={styles.emoji}>
                      {getFeedback(sleepData.score || 0).emoji}
                    </Text>
                    <View style={styles.headerText}>
                      <Text
                        variant="titleLarge"
                        style={{
                          color: getFeedback(sleepData.score || 0).color,
                        }}
                      >
                        {getFeedback(sleepData.score || 0).title}
                      </Text>
                      <Text variant="headlineSmall" style={styles.score}>
                        {sleepData.score || 0}점
                      </Text>
                    </View>
                  </View>

                  <Text variant="bodyLarge" style={styles.message}>
                    {getFeedback(sleepData.score || 0).message}
                  </Text>

                  {/* 수면 데이터 요약 */}
                  <View style={styles.summarySection}>
                    <Text variant="titleSmall" style={styles.summaryTitle}>
                      수면 요약 ({sleepData.date}):
                    </Text>
                    <Text variant="bodySmall" style={styles.summaryItem}>
                      • 수면시간:{' '}
                      {formatSleepDuration(sleepData.sleep_duration)}
                    </Text>
                    <Text variant="bodySmall" style={styles.summaryItem}>
                      • 수면 만족도:{' '}
                      {formatSubjectiveQuality(sleepData.subjective_quality)}
                    </Text>
                    <Text variant="bodySmall" style={styles.summaryItem}>
                      • 잠들기까지:{' '}
                      {formatSleepLatency(sleepData.sleep_latency)}
                    </Text>
                    <Text variant="bodySmall" style={styles.summaryItem}>
                      • 야간 각성: {sleepData.wake_count}회
                    </Text>
                    {sleepData.disturb_factors &&
                      sleepData.disturb_factors.length > 0 && (
                        <Text variant="bodySmall" style={styles.summaryItem}>
                          • 방해요인: {sleepData.disturb_factors.join(', ')}
                        </Text>
                      )}
                  </View>

                  {/* AI 분석 버튼 */}
                  <Button
                    title="🤖 AI 맞춤 분석 보기"
                    onPress={() =>
                      navigation.navigate('Insight', {
                        date: sleepData.date,
                        score: sleepData.score || 0,
                      })
                    }
                    style={styles.aiButton}
                  />
                </Card.Content>
              </Card>
            ) : savedDate && sleepDataError ? (
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.loadingContainer}>
                    <Text variant="titleMedium" style={styles.errorText}>
                      수면 기록을 불러올 수 없습니다
                    </Text>
                    <Text variant="bodyMedium" style={styles.loadingText}>
                      오류: {sleepDataError?.message || '알 수 없는 오류'}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ) : null}

            {/* 액션 버튼들 */}
            <View style={styles.actionButtons}>
              {/* 🧪 임시 테스트 버튼 */}
              <Button
                onPress={() => navigation.navigate('SleepTestMain')}
                title="반응속도 테스트"
                style={styles.primaryButton}
              />
              <Button
                onPress={() => navigation.navigate('History')}
                title="기록 목록 보기"
                variant="outline"
                style={styles.secondaryButton}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultSection: {
    paddingBottom: 32,
  },
  card: {
    marginVertical: 16,
    borderLeftWidth: 4,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 36,
    lineHeight: 40,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  score: {
    fontWeight: 'bold',
    color: colors.softBlue,
  },
  message: {
    marginBottom: 16,
    lineHeight: 22,
  },
  summarySection: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  summaryTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: colors.deepNavy || '#2c3e50',
  },
  summaryItem: {
    marginBottom: 2,
    color: colors.textColor || '#333',
  },
  aiButton: {
    backgroundColor: colors.softBlue,
    marginTop: 8,
  },
  actionButtons: {
    gap: 12,
    marginBottom: 24,
    marginTop: 16,
  },
  primaryButton: {
    paddingVertical: 12,
    backgroundColor: colors.softBlue,
  },
  secondaryButton: {
    paddingVertical: 12,
    borderColor: colors.softBlue,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: colors.textColor,
    textAlign: 'center',
    marginTop: 12,
  },
  errorText: {
    color: colors.red || '#e74c3c',
    fontWeight: 'bold',
  },
});
