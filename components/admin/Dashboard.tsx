import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Layout } from '../common/Layout';

// AdminDashboard: 관리자 대시보드 페이지
export const AdminDashboard: React.FC = () => {
  return (
    <Layout>
      <ScrollView style={styles.container}>
        {/* 사용자 통계 카드 */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>사용자 통계</Title>
            <Paragraph>총 사용자 수: 0</Paragraph>
            <Paragraph>활성 사용자: 0</Paragraph>
          </Card.Content>
        </Card>
        {/* 테스트 통계 카드 */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>테스트 통계</Title>
            <Paragraph>총 테스트 수: 0</Paragraph>
            <Paragraph>평균 점수: 0</Paragraph>
          </Card.Content>
        </Card>
        {/* 수면 데이터 카드 */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>수면 데이터</Title>
            <Paragraph>평균 수면 시간: 0시간</Paragraph>
            <Paragraph>수면 품질 평균: 0</Paragraph>
          </Card.Content>
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
  card: {
    marginBottom: 16,
  },
}); 