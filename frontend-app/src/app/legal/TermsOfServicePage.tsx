// 2. 서비스 이용약관 컴포넌트 생성
// frontend-app/src/app/legal/TermsOfServicePage.tsx

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout } from '@/components/common/Layout';
import { Text } from '@/components/common/Text';
import { BackButton } from '@/components/common/BackButton';
import { colors } from '@/constants/colors';
import { Card } from '@/components/common/Card';

export const TermsOfServicePage: React.FC = () => {
  return (
    <Layout showNavbar={false}>

        <View style={styles.header}>
          <BackButton />
          <Text variant="titleLarge" style={styles.headerTitle}>
            서비스 이용약관
          </Text>
        </View>
        <Card style={styles.container}>  
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text variant="bodyMedium" style={styles.effectiveDate}>
            시행일자: 2025년 6월 18일
          </Text>
          
          <Text variant="bodyLarge" style={styles.intro}>
            본 약관은 "FOCUZ" 앱이 제공하는 수면 및 인지 능력 개선 서비스를 
            이용하는 사용자와 회사 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
          </Text>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제1조 (목적)
            </Text>
            <Text variant="bodyMedium" style={styles.sectionContent}>
              본 약관은 회원이 "FOCUZ" 앱을 이용함에 있어 회사와 회원 간의 권리, 
              의무 및 책임사항, 서비스 이용 조건 및 절차 등 기본적인 사항을 
              규정함을 목적으로 합니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제2조 (용어의 정의)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • "서비스": 수면 및 인지 능력 개선 관련 제반 서비스
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • "회원": 본 약관에 따라 서비스를 이용하는 자
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • "유료 서비스": 유료로 제공되는 각종 콘텐츠 및 제반 서비스
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제4조 (서비스 이용)
            </Text>
            <Text variant="titleSmall" style={styles.subTitle}>
              1. 서비스 목적 및 비의료적 고지:
            </Text>
            <Text variant="bodyMedium" style={styles.importantNotice}>
              본 서비스는 의료 기기가 아니며, 의료적 진단, 치료, 조언 또는 
              처방을 제공하지 않습니다. 건강 관련 문제가 있는 경우 반드시 
              전문 의료기관을 방문하여 상담하시기 바랍니다.
            </Text>
          </View>

          {/* 추가 조항들... */}
        </ScrollView>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    margin: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  headerTitle: {
    marginLeft: 16,
    color: colors.deepNavy,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  effectiveDate: {
    fontSize: 12,
    color: colors.mediumGray,
    marginBottom: 20,
    textAlign: 'right',
  },
  intro: {
    lineHeight: 24,
    marginBottom: 24,
    color: colors.textColor,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.deepNavy,
  },
  sectionContent: {
    lineHeight: 22,
    color: colors.textColor,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 8,
    color: colors.midnightBlue,
  },
  listItem: {
    lineHeight: 22,
    marginBottom: 8,
    color: colors.textColor,
  },
  importantNotice: {
    backgroundColor: colors.lightGray,
    padding: 16,
    borderRadius: 8,
    lineHeight: 22,
    color: colors.deepNavy,
    borderLeftWidth: 4,
    borderLeftColor: colors.softBlue,
  },
});

export default TermsOfServicePage;
