import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Layout } from '@/components/common/Layout';
import { SleepRecordForm } from '@/components/sleep/SleepRecordForm';
import { useNavigation } from '@react-navigation/native';

export const SleepRecordPage: React.FC = () => {
  const navigation = useNavigation();
  const [isRecordSaved, setIsRecordSaved] = useState(false);

  const handleSaveRecord = (recordData: any) => {
    console.log('수면 기록 저장:', recordData);
    setIsRecordSaved(true);
  };

  const navigateToInsights = () => {
    navigation.navigate('SleepInsights' as never);
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          수면 기록
        </Text>
        
        <SleepRecordForm onSave={handleSaveRecord} />
        
        {isRecordSaved && (
          <View style={styles.successSection}>
            <Text variant="bodyLarge" style={styles.successText}>
              수면 기록이 저장되었습니다!
            </Text>
            <Button mode="contained" onPress={navigateToInsights}>
              AI 인사이트 보기
            </Button>
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
  },
  successSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    alignItems: 'center',
  },
  successText: {
    marginBottom: 16,
    color: '#2e7d2e',
  },
});