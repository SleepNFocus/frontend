import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { ScoreBreakdown } from '@/app/types/sleep';
import { colors } from '@/constants/colors';
import { Button } from '@/components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  SleepRecord: undefined;
  SleepTest: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ScoreFeedbackProps {
  score: number;
  scoreBreakdown: ScoreBreakdown;
}

export const ScoreFeedback: React.FC<ScoreFeedbackProps> = ({
  score,
  scoreBreakdown,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const getFeedback = (score: number) => {
    if (score >= 90) {
      return {
        emoji: '🌟',
        title: '최고의 수면!',
        message:
          '완벽한 수면 습관을 가지고 계시는군요! 오늘 하루도 활기차게 시작하세요!',
        color: colors.scoreExcellent,
      };
    }
    if (score >= 70) {
      return {
        emoji: '😊',
        title: '좋은 수면!',
        message:
          '건강한 수면 패턴을 잘 유지하고 계세요. 작은 개선으로 더 완벽해질 수 있어요.',
        color: colors.scoreGood,
      };
    }
    if (score >= 50) {
      return {
        emoji: '🤔',
        title: '보통 수면.',
        message: '괜찮지만, 조금 더 신경 쓰면 수면의 질을 높일 수 있어요.',
        color: colors.scoreNormal,
      };
    }
    return {
      emoji: '🛌',
      title: '개선이 필요한 수면.',
      message:
        '수면 습관을 점검하고 개선해 보세요. 가장 점수가 낮은 부분부터 시작해보세요.',
      color: colors.scorePoor,
    };
  };

  const getImprovementSuggestions = (scoreBreakdown: ScoreBreakdown) => {
    const suggestions = [];

    if (scoreBreakdown.durationScore < 20) {
      suggestions.push('🕐 수면 시간을 7-9시간 사이로 조절해보세요');
    }
    if (scoreBreakdown.qualityScore < 20) {
      suggestions.push('😴 수면 환경을 더 편안하게 만들어보세요');
    }
    if (scoreBreakdown.sleepEfficiencyScore < 15) {
      suggestions.push('⏰ 규칙적인 수면 루틴을 만들어보세요');
    }
    if (scoreBreakdown.environmentScore < 15) {
      suggestions.push('📱 잠들기 전 전자기기 사용을 줄여보세요');
    }

    return suggestions;
  };

  const feedback = getFeedback(score);
  const suggestions = getImprovementSuggestions(scoreBreakdown);

  return (
    <Card style={[styles.card, { borderLeftColor: feedback.color }]}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.emoji}>{feedback.emoji}</Text>
          <View style={styles.headerText}>
            <Text
              variant="titleLarge"
              style={[styles.title, { color: feedback.color }]}
            >
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
  title: {
    fontWeight: 'bold',
  },
  score: {
    fontWeight: 'bold',
    color: colors.softBlue,
  },
  message: {
    marginBottom: 16,
    lineHeight: 22,
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
  button: {
    marginTop: 24,
  },
});
