import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, Card, Text } from '../common';

// TestManagement: 관리자 - 테스트 관리 페이지
export const TestManagement: React.FC = () => {
  return (
    <Layout>
      <ScrollView style={styles.container}>
        {/* 테스트 관리 타이틀 */}
        <Card>
          <Text variant="headlineMedium">테스트 관리</Text>
          {/* 테스트 목록 및 관리 기능 구현 예정 */}
        </Card>
      </ScrollView>
    </Layout>
  );
};

// 스타일 정의 (Material Design 3 기준)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 