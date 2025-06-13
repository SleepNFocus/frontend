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
import useUiStore from '@/store/uiStore';

export const SleepRecordPage: React.FC = () => {
  const navigation = useNavigation();
  const navigation2 =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isRecordSaved, setIsRecordSaved] = useState(false);
  const [savedRecordData, setSavedRecordData] =
    useState<SleepRecordData | null>(null);
  const { openModal } = useUiStore();

  const handleSaveRecord = async (recordData: SleepRecordData) => {
    try {
      // TODO: 실제 API 호출로 데이터 저장
      // 예시: const response = await api.save(recordData);
      // 임시로 항상 성공 처리 (실패 테스트는 isSuccess = false로 변경)
      const isSuccess = true;
      if (isSuccess) {
        openModal('success', {
          isOpen: true,
          title: '저장 완료',
          content: '수면 기록이 성공적으로 저장되었습니다.',
          confirmText: '확인',
          onConfirm: () => {
            // 모달이 닫힌 후에 상태 변경
            setTimeout(() => {
              setSavedRecordData(recordData);
              setIsRecordSaved(true);
            }, 100);
          },
        });
      } else {
        openModal('error', {
          isOpen: true,
          title: '저장 실패',
          content: '수면 기록 저장에 실패했습니다. 다시 시도해 주세요.',
          confirmText: '확인',
          onConfirm: () => {},
        });
      }
    } catch (e) {
      openModal('error', {
        isOpen: true,
        title: '저장 실패',
        content: '수면 기록 저장에 실패했습니다. 다시 시도해 주세요.',
        confirmText: '확인',
        onConfirm: () => {},
      });
    }
  };

  const startNewRecord = () => {
    setIsRecordSaved(false);
    setSavedRecordData(null);
  };

  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
    color: colors.deepNavy,
    fontSize: 24,
    fontWeight: 'bold',
  },
  resultSection: {
    paddingBottom: 32,
  },
  scoreSection: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
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