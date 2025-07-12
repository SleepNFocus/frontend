// src/components/sleep/AISleepTipsScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';
import { Button } from '@/components/common/Button';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAIRecommendation } from '@/hooks/useAIInsight';
import { AISleepTips } from '@/components/sleep/AISleepTips';
import { RootStackParamList } from '@/App';
import { useSleepRecord } from '@/services/sleepApi';

// type RootStackParamList = {
//   AISleepTips: { date: string; score: number };
//   SleepRecord: undefined;
// };

// type AISleepTipsRouteProp = RouteProp<RootStackParamList, 'Insight'>;

type AISleepTipsRouteProp = RouteProp<RootStackParamList, 'AISleepTipsScreen'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const route = useRoute<AISleepTipsRouteProp>();

interface AISleepTipsScreenProps {
  date?: string;
  score?: number;
  showNavigation?: boolean;
}

export const AISleepTipsScreen: React.FC<AISleepTipsScreenProps> = ({
  date: propDate,
  score: propScore,
  showNavigation = true,
}) => {
  const navigation = useNavigation<NavigationProp>();
  // const route = useRoute<AISleepTipsRouteProp>();

  // props로 받은 값이 있으면 사용, 없으면 route params 사용
  const date = propDate || new Date().toISOString().split('T')[0];
  const score = propScore;

  // const today = format(new Date(), 'yyyy-MM-dd');
  // const { data: sleepRecordData } = useSleepRecord(date);

  // console.log(sleepRecordData);

  const {
    data: aiData,
    isLoading,
    error,
    refetch,
  } = useAIRecommendation({ date });

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.scoreExcellent || colors.softBlue;
    if (score >= 70) return colors.scoreGood || colors.softBlue;
    if (score >= 50) return colors.scoreNormal || colors.softBlue;
    return colors.scorePoor || colors.red;
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🌟';
    if (score >= 70) return '😊';
    if (score >= 50) return '🤔';
    return '🛌';
  };

  const parseAITips = (recommendation: string): string[] => {
    const tips = recommendation
      .split(/\n+|[0-9]+\.|•/)
      .map(tip => tip.trim())
      .filter(tip => tip.length > 10);

    return tips.length > 0 ? tips : [recommendation];
  };

  // console.log('route.params:', route.params);
  // console.log('propScore:', propScore, 'routeScore:', route.params?.score);
  // console.log('최종 score:',score);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card
            style={[
              styles.headerCard,
              { borderLeftColor: getScoreColor(score || 0) },
            ]}
          >
            <Card.Content>
              <View style={styles.headerContent}>
                <Text style={styles.headerEmoji}>
                  {getScoreEmoji(score || 0)}
                </Text>
                <View style={styles.headerText}>
                  <Text variant="headlineSmall" style={styles.headerTitle}>
                    AI 수면 분석
                  </Text>
                  <Text variant="bodyMedium" style={styles.headerSubtitle}>
                    {date} • {score}점 기반 맞춤 분석
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.loadingCard}>
            <Card.Content>
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.softBlue} />
                <Text variant="titleMedium" style={styles.loadingTitle}>
                  AI가 당신의 수면을 분석하고 있습니다
                </Text>
                <Text variant="bodyMedium" style={styles.loadingSubtitle}>
                  {score}점 수면 기록을 바탕으로 개인화된 인사이트를 생성
                  중입니다...
                </Text>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  }

  // 이 줄 아래에 추가하세요
if (!score || !aiData?.recommendation) {
  const todayStr = new Date().toISOString().split('T')[0];
  const isToday = date === todayStr;

  if (isToday) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.headerCard}>
            <Card.Content>
              <View style={styles.headerContent}>
                <Text style={styles.headerEmoji}>🛌</Text>
                <View style={styles.headerText}>
                  <Text variant="headlineSmall" style={styles.headerTitle}>
                    AI 수면 분석
                  </Text>
                  <Text variant="bodyMedium" style={styles.headerSubtitle}>
                    {date} • 수면 데이터 없음
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.errorCard}>
            <Card.Content>
              <View style={styles.errorContainer}>
                <Text variant="titleMedium" style={styles.errorTitle}>
                  오늘의 수면 기록이 없습니다
                </Text>
                <Text variant="bodyMedium" style={styles.errorMessage}>
                  수면 기록을 남기면 AI가 분석을 시작할 수 있어요.
                </Text>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

  if (error || !aiData) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card
            style={[
              styles.headerCard,
              { borderLeftColor: getScoreColor(score || 0) },
            ]}
          >
            <Card.Content>
              <View style={styles.headerContent}>
                <Text style={styles.headerEmoji}>
                  {getScoreEmoji(score || 0)}
                </Text>
                <View style={styles.headerText}>
                  <Text variant="headlineSmall" style={styles.headerTitle}>
                    AI 수면 분석
                  </Text>
                  <Text variant="bodyMedium" style={styles.headerSubtitle}>
                    {date} • {score}점 기반 맞춤 분석
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.errorCard}>
            <Card.Content>
              <View style={styles.errorContainer}>
                <Text variant="titleMedium" style={styles.errorTitle}>
                  🤖 AI 분석을 불러올 수 없습니다
                </Text>
                <Text variant="bodyMedium" style={styles.errorMessage}>
                  네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.
                </Text>
                <Button
                  title="다시 시도"
                  onPress={() => refetch()}
                  style={styles.retryButton}
                />
              </View>
            </Card.Content>
          </Card>

          <AISleepTips
            tips={[
              '규칙적인 수면 시간을 유지하세요',
              '잠들기 1시간 전에는 전자기기 사용을 중단하세요',
              '침실을 시원하고 어둡게 유지하세요',
              '카페인은 오후 2시 이후 피하세요',
            ]}
          />
        </ScrollView>
      </View>
    );
  }

  const aiTips = parseAITips(aiData.recommendation);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card
          style={[
            styles.headerCard,
            { borderLeftColor: getScoreColor(score || 0) },
          ]}
        >
          <Card.Content>
            <View style={styles.headerContent}>
              <Text style={styles.headerEmoji}>
                {getScoreEmoji(score || 0)}
              </Text>
              <View style={styles.headerText}>
                <Text variant="headlineSmall" style={styles.headerTitle}>
                  AI 수면 분석
                </Text>
                <Text variant="bodyMedium" style={styles.headerSubtitle}>
                  {date} • {score}점 기반 맞춤 분석
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.aiAnalysisCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.aiAnalysisTitle}>
              🎯 맞춤형 수면 인사이트
            </Text>
            <View style={styles.aiAnalysisContent}>
              <Text variant="bodyMedium" style={styles.aiAnalysisText}>
                {aiData.recommendation}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
    backgroundColor: '#ffffff',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 32,
    marginRight: 12,
    lineHeight: 40,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: colors.deepNavy,
    marginBottom: 4,
  },
  headerSubtitle: {
    color: colors.midnightBlue,
    opacity: 0.7,
  },

  aiAnalysisCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.softBlue,
    backgroundColor: '#ffffff',
  },
  aiAnalysisTitle: {
    color: colors.deepNavy,
    marginBottom: 12,
  },
  aiAnalysisContent: {
    borderRadius: 12,
    padding: 16,
  },
  aiAnalysisText: {
    color: colors.textColor,
    lineHeight: 24,
  },

  loadingCard: {
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingTitle: {
    marginTop: 16,
    marginBottom: 8,
    color: colors.deepNavy,
    textAlign: 'center',
  },
  loadingSubtitle: {
    color: colors.midnightBlue,
    textAlign: 'center',
    opacity: 0.7,
  },

  errorCard: {
    marginBottom: 16,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  errorTitle: {
    color: colors.red,
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    color: colors.midnightBlue,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    marginTop: 8,
  },

  buttonContainer: {
    marginTop: 24,
  },
  actionButton: {
    marginTop: 8,
  },
});
