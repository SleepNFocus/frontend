import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Layout } from '@/components/common/Layout';
import { SleepRecordForm } from '@/components/sleep/SleepRecordForm';
import { ScoreFeedback } from '@/components/sleep/ScoreFeedback';
import { useNavigation } from '@react-navigation/native';
import { SleepRecordData } from '@/app/types/sleep';

export const SleepRecordPage: React.FC = () => {
  const navigation = useNavigation();
  const [isRecordSaved, setIsRecordSaved] = useState(false);
  const [savedRecordData, setSavedRecordData] = useState<SleepRecordData | null>(null);

  const handleSaveRecord = (recordData: SleepRecordData) => {
    console.log('수면 기록 저장:', recordData);
    
    // TODO: 실제 API 호출로 데이터 저장
    
    setSavedRecordData(recordData);
    setIsRecordSaved(true);
  };

const navigateToInsights = () => {
  (navigation as any).navigate('SleepInsights', { 
    recordData: savedRecordData 
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
            {savedRecordData && (
              <ScoreFeedback 
                score={savedRecordData.totalScore} 
                scoreBreakdown={savedRecordData.scoreBreakdown} 
              />
            )}
            
            <View style={styles.actionButtons}>
              <Button 
                mode="contained" 
                onPress={navigateToInsights}
                style={styles.primaryButton}
                icon="lightbulb-outline"
              >
                AI 인사이트 보기
              </Button>
              
              <Button 
                mode="outlined" 
                onPress={startNewRecord}
                style={styles.secondaryButton}
              >
                새로운 기록 입력
              </Button>
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
    color: '#6C7BFF',
  },
  resultSection: {
    paddingBottom: 32,
  },
  actionButtons: {
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    paddingVertical: 6,
  },
  secondaryButton: {
    paddingVertical: 6,
  },
  savedInfo: {
    padding: 16,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    alignItems: 'center',
  },
  savedInfoText: {
    color: '#2e7d2e',
    fontWeight: '500',
    marginBottom: 4,
  },
  savedDate: {
    color: '#5e7e5e',
  },
});