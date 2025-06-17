import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Layout } from '@/components/common/Layout';
import Navbar from '@/components/common/Navbar';
import { Text } from '@/components/common/Text';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/colors';
import { spacing, fontSize } from '@/utils/responsive';
import { Ionicons } from '@expo/vector-icons';

export const HistoryPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'gallery'>('list');

  return (
    <Layout>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>수면 기록</Text>
          <View style={styles.recordList}>
            <Card style={styles.recordCard}>
              <Text style={styles.dateText}>2024.03.20</Text>
              <Text style={styles.recordText}>수면 시간: 7시간 30분</Text>
              <Text style={styles.recordText}>수면 점수: 85점</Text>
            </Card>
            <Card style={styles.recordCard}>
              <Text style={styles.dateText}>2024.03.19</Text>
              <Text style={styles.recordText}>수면 시간: 6시간 45분</Text>
              <Text style={styles.recordText}>수면 점수: 78점</Text>
            </Card>
          </View>
        </Card>

        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>인지 테스트 결과</Text>
          <View style={styles.recordList}>
            <Card style={styles.recordCard}>
              <Text style={styles.dateText}>2024.03.20</Text>
              <Text style={styles.recordText}>테스트 유형: 집중력 테스트</Text>
              <Text style={styles.recordText}>점수: 92점</Text>
            </Card>
            <Card style={styles.recordCard}>
              <Text style={styles.dateText}>2024.03.19</Text>
              <Text style={styles.recordText}>테스트 유형: 기억력 테스트</Text>
              <Text style={styles.recordText}>점수: 88점</Text>
            </Card>
          </View>
        </Card>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  pageTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: colors.softBlue + '20',
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.textColor,
    marginBottom: spacing.md,
  },
  recordList: {
    gap: spacing.md,
  },
  recordCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    borderRadius: spacing.md,
  },
  dateText: {
    fontSize: fontSize.sm,
    color: colors.mediumGray,
    marginBottom: spacing.xs,
  },
  recordText: {
    fontSize: fontSize.md,
    color: colors.textColor,
    marginBottom: spacing.xs,
  },
});

export default HistoryPage;
