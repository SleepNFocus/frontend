import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout } from '@/components/common/Layout';
import Navbar from '@/components/common/Navbar';
import { Text } from '@/components/common/Text';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/colors';
import { spacing, fontSize } from '@/utils/responsive';

export const HistoryPage: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>아직 기록이 없어요</Text>
          <Text style={styles.sectionLabel}>여기에 수면 및 집중력 테스트 기록이 표시될 거예요</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>수면 기록 목록</Text>
          <Text style={styles.sectionTitle}>테스트 결과 목록</Text>
          <Text style={styles.sectionLabel}>갤러리 뷰 / 리스트 뷰 전환</Text>
        </Card>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: spacing.lg / 2,
    gap: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    shadowColor: colors.textColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  sectionTitle: {
    color: colors.deepNavy,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionLabel: {
    color: colors.midnightBlue,
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default HistoryPage;
