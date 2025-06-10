import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '@/components/common/Layout';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { SleepRecordForm } from '@/components/sleep/SleepRecordForm';
import { ScoreFeedback } from '@/components/sleep/ScoreFeedback';
import { SleepRecordData } from '@/app/types/sleep';
import { RootStackParamList } from '@/App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';

export const SleepRecordPage: React.FC = () => {
  const navigation = useNavigation();
  const navigation2 =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isRecordSaved, setIsRecordSaved] = useState(false);
  const [savedRecordData, setSavedRecordData] =
    useState<SleepRecordData | null>(null);

  const handleSaveRecord = (recordData: SleepRecordData) => {
    console.log('수면 기록 저장:', recordData);

    // TODO: 실제 API 호출로 데이터 저장

    setSavedRecordData(recordData);
    setIsRecordSaved(true);
  };

  const navigateToInsights = () => {
    (navigation as any).navigate('SleepInsights', {
      recordData: savedRecordData,
    });
  };

  const startNewRecord = () => {
    setIsRecordSaved(false);
    setSavedRecordData(null);
  };

  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text variant="headlineMedium" style={styles.title}>
          수면 기록
        </Text>
        
        {!isRecordSaved ? (
          <SleepRecordForm onSave={handleSaveRecord} />
        ) : (
          <View style={styles.resultSection}>
            {/* 수면 점수는 저장 후에만 표시 */}
            <View style={styles.scoreSection}>
              <Text variant="headlineSmall" style={styles.scoreTitle}>
                오늘의 수면 점수
              </Text>
              <Text variant="displayMedium" style={styles.totalScore}>
                {savedRecordData?.totalScore}점
              </Text>
              <View style={styles.scoreBreakdown}>
                <Text variant="bodySmall">
                  수면시간: {savedRecordData?.scoreBreakdown.durationScore}/25
                </Text>
                <Text variant="bodySmall">
                  수면질: {savedRecordData?.scoreBreakdown.qualityScore}/30
                </Text>
                <Text variant="bodySmall">
                  수면효율: {savedRecordData?.scoreBreakdown.sleepEfficiencyScore}/25
                </Text>
                <Text variant="bodySmall">
                  수면환경: {savedRecordData?.scoreBreakdown.environmentScore}/20
                </Text>
              </View>
            </View>

            {savedRecordData && (
              <ScoreFeedback
                score={savedRecordData.totalScore}
                scoreBreakdown={savedRecordData.scoreBreakdown}
              />
            )}

            <View style={styles.actionButtons}>
              <Button
                onPress={navigateToInsights}
                title="AI 인사이트 보기"
                variant="primary"
                style={styles.primaryButton}
              />

              <Button
                onPress={startNewRecord}
                title="새로운 기록 입력"
                variant="outline"
                style={styles.secondaryButton}
              />
              
              <Button
                onPress={() => {
                  navigation2.navigate('SleepTestMain');
                }}
                title="테스트"
                variant="outline"
                style={styles.secondaryButton}
              />
            </View>

            <View style={styles.savedInfo}>
              <Text variant="bodyMedium" style={styles.savedInfoText}>
                ✅ 수면 기록이 성공적으로 저장되었습니다.
              </Text>
              <Text variant="bodySmall" style={styles.savedDate}>
                저장 날짜: {savedRecordData?.selectedDate}
              </Text>
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
  title: {
    marginBottom: 24,
    textAlign: 'center',
    color: colors.textColor,
  },
  resultSection: {
    paddingBottom: 32,
  },
  scoreSection: {
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  scoreTitle: {
    marginBottom: 8,
    color: colors.textColor,
  },
  totalScore: {
    color: colors.textColor,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  scoreBreakdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  actionButtons: {
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    paddingVertical: 6,
    backgroundColor: colors.softBlue,
  },
  secondaryButton: {
    paddingVertical: 6,
    borderColor: colors.softBlue,
  },
  savedInfo: {
    padding: 16,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    alignItems: 'center',
  },
  savedInfoText: {
    color: colors.textColor,
    fontWeight: '500',
    marginBottom: 4,
  },
  savedDate: {
    color: colors.mediumGray,
  },
});