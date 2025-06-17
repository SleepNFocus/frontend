import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';
import { Button } from '@/components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSleepRecord } from '@/services/sleepApi';
import { calculateScoreBreakdown, formatSleepDuration, formatSleepLatency } from '@/utils/scoreCalculation';

type RootStackParamList = {
  SleepRecord: undefined;
  SleepTest: undefined;
  AISleepTips: { date: string; score: number }; // AI 팁 페이지에 날짜와 점수 전달
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ScoreFeedbackProps {
  recordId: number;
}

export const ScoreFeedback: React.FC<ScoreFeedbackProps> = ({ recordId }) => {
  const navigation = useNavigation<NavigationProp>();
  const { data: sleepData, isLoading, error, refetch } = useSleepRecord(recordId);

  const getFeedback = (score: number) => {
    if (score >= 90) {
      return {
        emoji: '🌟',
        title: '최고의 수면!',
        message: '완벽한 수면 습관을 가지고 계시는군요! 오늘 하루도 활기차게 시작하세요!',
        color: colors.scoreExcellent || colors.softBlue,
      };
    }
    if (score >= 70) {
      return {
        emoji: '😊',
        title: '좋은 수면!',
        message: '건강한 수면 패턴을 잘 유지하고 계세요. 작은 개선으로 더 완벽해질 수 있어요.',
        color: colors.scoreGood || colors.softBlue,
      };
    }
    if (score >= 50) {
      return {
        emoji: '🤔',
        title: '보통 수면.',
        message: '괜찮지만, 조금 더 신경 쓰면 수면의 질을 높일 수 있어요.',
        color: colors.scoreNormal || colors.softBlue,
      };
    }
    return {
      emoji: '🛌',
      title: '개선이 필요한 수면.',
      message: '수면 습관을 점검하고 개선해 보세요. 가장 점수가 낮은 부분부터 시작해보세요.',
      color: colors.scorePoor || colors.red,
    };
  };

  const getImprovementSuggestions = (sleepData: any) => {
    const suggestions = [];
    const scoreBreakdown = calculateScoreBreakdown(sleepData);

    if (scoreBreakdown.durationScore < 20) {
      const hours = sleepData.sleep_duration / 60;
      if (hours < 7) {
        suggestions.push('🕐 수면 시간을 늘려서 7-9시간 사이로 조절해보세요');
      } else {
        suggestions.push('🕐 수면 시간을 줄여서 7-9시간 사이로 조절해보세요');
      }
    }
    
    if (scoreBreakdown.qualityScore < 25) {
      suggestions.push('😴 수면 환경을 더 편안하게 만들어보세요');
    }
    
    if (scoreBreakdown.sleepEfficiencyScore < 20) {
      if (sleepData.sleep_latency > 15) {
        suggestions.push('⏰ 잠들기까지 시간을 단축하는 루틴을 만들어보세요');
      }
      if (sleepData.wake_count >= 2) {
        suggestions.push('🌙 야간 각성을 줄이는 방법을 찾아보세요');
      }
    }
    
    if (scoreBreakdown.environmentScore < 15) {
      suggestions.push('📱 수면 방해요소를 제거해보세요');
    }

    return suggestions;
  };

  if (isLoading) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.softBlue} />
            <Text variant="bodyMedium" style={styles.loadingText}>
              수면 점수를 계산하고 있습니다...
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
              수면 기록이 없거나 데이터를 가져오는 중 오류가 발생했습니다.
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

  const score = sleepData.score || 0;
  const scoreBreakdown = calculateScoreBreakdown(sleepData);
  const feedback = getFeedback(score);
  const suggestions = getImprovementSuggestions(sleepData);

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
            • 수면 만족도: {sleepData.subjective_quality}/5점
          </Text>
          <Text variant="bodySmall" style={styles.summaryItem}>
            • 잠들기까지: {formatSleepLatency(sleepData.sleep_latency)}
          </Text>
          <Text variant="bodySmall" style={styles.summaryItem}>
            • 야간 각성: {sleepData.wake_count}회
          </Text>
        </View>

        {suggestions.length > 0 && (
          <View style={styles.suggestionsSection}>
            <Text variant="titleMedium" style={styles.suggestionsTitle}>
              개선 제안:
            </Text>
            {suggestions.map((suggestion, index) => (
              <Text key={index} variant="bodyMedium" style={styles.suggestion}>
                • {suggestion}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.scoreDetails}>
          <Text variant="titleSmall" style={styles.detailsTitle}>
            세부 점수:
          </Text>
          <View style={styles.scoreGrid}>
            <View style={styles.scoreItem}>
              <Text variant="bodySmall">수면시간</Text>
              <Text variant="bodyMedium" style={styles.scoreValue}>
                {scoreBreakdown.durationScore}/25
              </Text>
            </View>
            <View style={styles.scoreItem}>
              <Text variant="bodySmall">수면질</Text>
              <Text variant="bodyMedium" style={styles.scoreValue}>
                {scoreBreakdown.qualityScore}/30
              </Text>
            </View>
            <View style={styles.scoreItem}>
              <Text variant="bodySmall">수면효율</Text>
              <Text variant="bodyMedium" style={styles.scoreValue}>
                {scoreBreakdown.sleepEfficiencyScore}/25
              </Text>
            </View>
            <View style={styles.scoreItem}>
              <Text variant="bodySmall">수면환경</Text>
              <Text variant="bodyMedium" style={styles.scoreValue}>
                {scoreBreakdown.environmentScore}/20
              </Text>
            </View>
          </View>
        </View>

        {/* 액션 버튼들 */}
        <View style={styles.buttonContainer}>
          <Button
            title="🤖 AI 맞춤 분석 보기"
            onPress={() => navigation.navigate('AISleepTips', { 
              date: sleepData.date, 
              score: score 
            })}
            style={{ 
              marginTop: 8, 
              backgroundColor: colors.softBlue 
            }}
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
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  summaryTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: colors.deepNavy,
  },
  summaryItem: {
    marginBottom: 2,
    color: colors.textColor,
  },
  suggestionsSection: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  suggestionsTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: colors.softBlue,
  },
  suggestion: {
    marginBottom: 4,
    lineHeight: 20,
  },
  scoreDetails: {
    marginTop: 8,
  },
  detailsTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  scoreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  scoreItem: {
    flex: 1,
    minWidth: 80,
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 6,
  },
  scoreValue: {
    fontWeight: 'bold',
    color: colors.softBlue,
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    marginTop: 8,
  },
  aiButton: {
    backgroundColor: colors.softBlue,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    color: colors.midnightBlue,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorTitle: {
    color: colors.red,
    marginBottom: 8,
  },
  errorMessage: {
    color: colors.midnightBlue,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    marginTop: 8,
  },
});