import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';
import { Button } from '@/components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSleepRecord } from '@/services/sleepApi';

type RootStackParamList = {
  SleepRecord: undefined;
  SleepTest: undefined;
  AISleepTips: { date: string; score: number };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ScoreFeedbackProps {
  recordId: number;
}

export const ScoreFeedback: React.FC<ScoreFeedbackProps> = ({ recordId }) => {
  const navigation = useNavigation<NavigationProp>();
  const { data: sleepData, isLoading, error, refetch } = useSleepRecord(recordId);

  // 디버깅 로그 추가
  console.log('🔍 ScoreFeedback - recordId:', recordId);
  console.log('🔍 ScoreFeedback - isLoading:', isLoading);
  console.log('🔍 ScoreFeedback - error:', error);
  console.log('🔍 ScoreFeedback - sleepData:', sleepData);

  const getFeedback = (score: number) => {
    if (score >= 90) {
      return {
        emoji: '🌟',
        title: '최고의 수면!',
        message: '완벽한 수면 습관을 가지고 계시는군요! 오늘 하루도 활기차게 시작하세요!',
        color: colors.softBlue,
      };
    }
    if (score >= 70) {
      return {
        emoji: '😊',
        title: '좋은 수면!',
        message: '건강한 수면 패턴을 잘 유지하고 계세요. 작은 개선으로 더 완벽해질 수 있어요.',
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

  // 수면 시간을 시간:분 형식으로 변환
  const formatSleepDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  // 잠들기까지 걸린 시간 변환
  const formatSleepLatency = (latency: number) => {
    switch(latency) {
      case 1: return '15분 이하';
      case 2: return '15-30분';
      case 3: return '30분 초과';
      default: return '알 수 없음';
    }
  };

  // 주관적 수면 질 변환
  const formatSubjectiveQuality = (quality: number) => {
    switch(quality) {
      case 5: return '매우 개운함';
      case 4: return '개운함';
      case 3: return '보통';
      case 2: return '약간 피곤함';
      case 1: return '매우 피곤함';
      default: return '알 수 없음';
    }
  };

  if (isLoading) {
    return (
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
    );
  }

  if (error || !sleepData) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.errorContainer}>
            <Text variant="titleMedium" style={styles.errorTitle}>
              수면 기록을 불러올 수 없습니다
            </Text>
            <Text variant="bodyMedium" style={styles.errorMessage}>
              오류: {error?.message || '알 수 없는 오류'}
            </Text>
            <Button 
              title="다시 시도" 
              onPress={() => refetch()}
              style={styles.retryButton}
            />
          </View>
        </Card.Content>
      </Card>
    );
  }

  // 서버에서 받은 점수 사용
  const score = sleepData.score || 0;
  const feedback = getFeedback(score);

  return (
    <Card style={[styles.card, { borderLeftColor: feedback.color }]}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.emoji}>{feedback.emoji}</Text>
          <View style={styles.headerText}>
            <Text variant="titleLarge" style={{ color: feedback.color }}>
              {feedback.title}
            </Text>
            <Text variant="headlineSmall" style={styles.score}>
              {score}점
            </Text>
          </View>
        </View>

        <Text variant="bodyLarge" style={styles.message}>
          {feedback.message}
        </Text>

        {/* 수면 데이터 요약 */}
        <View style={styles.summarySection}>
          <Text variant="titleSmall" style={styles.summaryTitle}>
            수면 요약 ({sleepData.date}):
          </Text>
          <Text variant="bodySmall" style={styles.summaryItem}>
            • 수면시간: {formatSleepDuration(sleepData.sleep_duration)}
          </Text>
          <Text variant="bodySmall" style={styles.summaryItem}>
            • 수면 만족도: {formatSubjectiveQuality(sleepData.subjective_quality)}
          </Text>
          <Text variant="bodySmall" style={styles.summaryItem}>
            • 잠들기까지: {formatSleepLatency(sleepData.sleep_latency)}
          </Text>
          <Text variant="bodySmall" style={styles.summaryItem}>
            • 야간 각성: {sleepData.wake_count}회
          </Text>
          {sleepData.disturb_factors && sleepData.disturb_factors.length > 0 && (
            <Text variant="bodySmall" style={styles.summaryItem}>
              • 방해요인: {sleepData.disturb_factors.join(', ')}
            </Text>
          )}
        </View>

        {/* 액션 버튼들 */}
        <View style={styles.buttonContainer}>
          <Button
            title="🤖 AI 맞춤 분석 보기"
            onPress={() => navigation.navigate('AISleepTips', { 
              date: sleepData.date, 
              score: score 
            })}
            style={styles.aiButton}
          />
          <Button
            title="새 수면 기록 추가"
            onPress={() => navigation.navigate('SleepRecord')}
            style={styles.button}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 32,
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
    backgroundColor: colors.lightGray || '#f5f5f5',
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
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    marginTop: 8,
  },
  aiButton: {
    backgroundColor: colors.softBlue,
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    color: colors.midnightBlue || '#34495e',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorTitle: {
    color: colors.red || '#e74c3c',
    marginBottom: 8,
  },
  errorMessage: {
    color: colors.midnightBlue || '#34495e',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    marginTop: 8,
  },
});