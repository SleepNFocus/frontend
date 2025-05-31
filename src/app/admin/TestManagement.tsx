import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout } from '../../components/common/Layout';
import { Card } from '../../components/common/Card';
import { Text } from '../../components/common/Text';
import { colors } from '../../constants/colors';

// TestManagement: 관리자 - 테스트 관리 페이지
export const TestManagement: React.FC = () => {
  return (
    <Layout>
      <ScrollView style={styles.container}>
        {/* 테스트 관리 타이틀 */}
        <Card style={styles.card}>
          <Text variant="headlineMedium" style={styles.title}>테스트 관리</Text>
          <View style={styles.content}>
            {/* 테스트 목록 및 관리 기능 구현 예정 */}
            <Text style={styles.placeholderText}>
              테스트 관리 기능이 곧 추가될 예정입니다.
            </Text>
          </View>
        </Card>
      </ScrollView>
    </Layout>
  );
};

// 스타일 정의 (Material Design 3 기준)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  card: {
    margin: 16,
    padding: 16,
  },
  title: {
    color: colors.textColor,
    marginBottom: 16,
  },
  content: {
    padding: 8,
  },
  placeholderText: {
    color: colors.mediumGray,
    textAlign: 'center',
    marginTop: 24,
  },
}); 