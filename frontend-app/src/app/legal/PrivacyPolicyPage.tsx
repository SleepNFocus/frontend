// 1. 개인정보처리방침 컴포넌트 생성
// frontend-app/src/app/legal/PrivacyPolicyPage.tsx

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout } from '@/components/common/Layout';
import { Text } from '@/components/common/Text';
import { BackButton } from '@/components/common/BackButton';
import { colors } from '@/constants/colors';
import { Card } from '@/components/common/Card';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <Layout showNavbar={false}>
      <View style={styles.header}>
        <BackButton />
        <Text variant="titleLarge" style={styles.headerTitle}>
          개인정보처리방침
        </Text>
      </View>
      <Card style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text variant="bodyMedium" style={styles.effectiveDate}>
            시행일자: 2025년 6월 18일
          </Text>

          <Text variant="bodyLarge" style={styles.intro}>
            "FOCUZ" 앱(이하 "회사" 또는 "저희")은 사용자의 개인정보를 소중하게
            생각하며, 「개인정보 보호법」 등 관련 법령을 준수하기 위해 최선을
            다하고 있습니다.
          </Text>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제1조 (수집하는 개인정보의 종류 및 수집 방법)
            </Text>
            <Text variant="bodyMedium" style={styles.sectionContent}>
              저희는 서비스 제공 및 개선을 위해 다음과 같은 개인정보를
              수집합니다.
            </Text>
            <Text variant="titleSmall" style={styles.subTitle}>
              1. 회원이 직접 제공하는 정보:
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 계정 정보: 이름, 이메일 주소, 비밀번호 (암호화되어 저장),
              전화번호 (선택 사항)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 프로필 정보: 성별, 연령, 거주 지역, 수면 습관, 수면 목표, 인지
              능력 관련 목표 등
            </Text>
            <Text variant="titleSmall" style={styles.subTitle}>
              2. 서비스 이용 과정에서 자동으로 생성 및 수집되는 정보:
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 기기 및 사용 정보: IP 주소, 기기 식별자, 운영체제 정보 등
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 건강 관련 정보: 수면 관련 정보, 인지 능력 관련 정보, 생체 신호
              정보 등
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제2조 (개인정보의 이용 목적)
            </Text>
            <Text variant="bodyMedium" style={styles.sectionContent}>
              수집한 개인정보는 다음의 목적으로 활용됩니다:
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 서비스 제공 및 운영
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 서비스 개선 및 개발
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 마케팅 및 커뮤니케이션
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 법적 의무 준수 및 권리 보호
            </Text>
          </View>
        </ScrollView>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    color: colors.deepNavy,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  effectiveDate: {
    color: colors.mediumGray,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  intro: {
    color: colors.textColor,
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: colors.deepNavy,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionContent: {
    color: colors.textColor,
    lineHeight: 22,
    marginBottom: 16,
  },
  subTitle: {
    color: colors.midnightBlue,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  listItem: {
    color: colors.textColor,
    lineHeight: 20,
    marginBottom: 4,
    paddingLeft: 8,
  },
  contact: {
    backgroundColor: colors.lightGray,
    padding: 16,
    borderRadius: 8,
    marginBottom: 32,
  },
});
