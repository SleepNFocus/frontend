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
            본 약관은 "FOCUZ" 앱(이하 "회사" 또는 "저희")이 제공하는 수면 및
            인지 능력 개선 서비스(이하 "서비스")를 이용하는 사용자(이하 "회원"
            또는 "사용자")와 회사 간의 권리, 의무 및 책임 사항을 규정함을
            목적으로 합니다.
          </Text>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제1조 (목적)
            </Text>
            <Text variant="bodyMedium" style={styles.sectionContent}>
              본 약관은 회원이 FOCUZ 앱을 이용함에 있어 회사와 회원 간의 권리,
              의무 및 책임사항, 서비스 이용 조건 및 절차 등 기본적인 사항을
              규정함을 목적으로 합니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제2조 (용어의 정의)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * "서비스": FOCUZ 앱을 통해 제공되는 수면 및 인지 능력 개선과
              관련된 모든 기능, 정보 및 콘텐츠
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * "회원": 본 약관에 따라 회사와 이용계약을 체결하고 서비스를
              이용하는 자
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * "계정": 회원이 서비스에 접속하고 이용하기 위하여 설정한 고유
              정보(이메일, 비밀번호 등)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * "콘텐츠": 회사가 서비스 제공을 위해 제작하거나 제휴하여 제공하는
              정보, 이미지, 영상 등
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * "사용자 생성 콘텐츠": 회원이 서비스 이용 중 생성하거나 게시한
              정보 및 자료
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제3조 (약관의 효력 및 변경)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 본 약관은 서비스를 설치하거나 이용함으로써 효력이 발생합니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회사는 관련 법령을 위배하지 않는 범위 내에서 약관을 개정할 수
              있으며, 개정 시 사전 공지합니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회원은 개정 약관에 동의하지 않을 경우 탈퇴할 수 있으며, 계속
              이용 시 개정 약관에 동의한 것으로 간주됩니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제4조 (서비스의 목적 및 고지)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * FOCUZ 앱은 건강한 생활습관 형성을 위한 비의료적 정보 및 도구를
              제공합니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 이 서비스는 의료기기가 아니며 진단, 치료 또는 의학적 조언을
              제공하지 않습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 서비스의 정보는 교육적 목적이며, 건강 문제는 반드시 의료
              전문가와 상담하시기 바랍니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제5조 (계정 생성 및 관리)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회원은 정확한 정보를 입력하여 계정을 생성해야 합니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 계정 정보는 본인이 관리해야 하며, 타인에게 양도하거나 공유해서는
              안 됩니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 계정 정보 유출 또는 부정 사용 발견 시 즉시 회사에 알리고 조치를
              따라야 합니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제6조 (사용자의 의무)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 타인의 개인정보나 계정을 도용하거나 허위 정보를 입력하는 행위
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 타인의 지식재산권 또는 권리를 침해하는 행위
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 서비스 운영을 방해하거나 악성 코드, 스팸 등을 배포하는 행위
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회사의 사전 동의 없이 상업적으로 서비스를 이용하는 행위
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제7조 (사용자 콘텐츠 관련 책임)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회원은 게시한 콘텐츠가 타인의 권리를 침해하지 않음을 보장해야
              합니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회사는 사용자 콘텐츠를 서비스 개선 및 홍보 목적으로 활용할 수
              있는 비독점적 사용권을 가집니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제8조 (서비스의 변경 및 종료)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회사는 서비스의 일부 또는 전부를 사전 고지 후 변경 또는 종료할
              수 있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 기술적 오류나 긴급 상황 시에는 사전 고지 없이 서비스가 일시
              중단될 수 있습니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제9조 (계약 해지 및 탈퇴)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회원은 언제든지 앱 내 탈퇴 기능을 통해 서비스를 해지할 수
              있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 탈퇴 후 일부 정보는 관련 법령에 따라 일정 기간 보관될 수
              있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회사는 이용자의 약관 위반, 불법행위 발생 시 서비스 이용을
              제한하거나 계약을 해지할 수 있습니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제10조 (지적 재산권)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회사가 제작하거나 제공하는 서비스 콘텐츠에 대한 권리는 회사에
              있으며, 법적으로 보호받습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회원은 회사의 서면 동의 없이 콘텐츠를 복제, 배포, 수정, 상업적
              이용할 수 없습니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제11조 (면책 조항)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회사는 서비스 제공 중단이나 오류로 인한 손해에 대해 고의 또는
              중과실이 없는 한 책임을 지지 않습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 서비스 내 정보는 참고용이며, 의학적 판단이나 조치로 사용될 수
              없습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 외부 링크나 제3자 콘텐츠는 회사의 통제 범위를 벗어나며, 관련
              피해에 대한 책임은 지지 않습니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제12조 (책임의 제한)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 사용자의 귀책사유로 인한 서비스 이용 장애
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 회원의 네트워크, 디바이스, 환경 설정 등 외부 요소
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 불가항력, 천재지변 등 예측 불가능한 상황
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제13조 (분쟁 해결 및 준거법)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              * 본 약관은 대한민국 법률에 따르며, 분쟁 발생 시 관할 법원을 통해
              해결합니다.
            </Text>
          </View>

          <Text variant="bodyMedium" style={styles.effectiveDate}>
            부칙: 본 약관은 2025년 6월 18일부터 시행됩니다.
          </Text>
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
  listItem: {
    lineHeight: 22,
    marginBottom: 8,
    color: colors.textColor,
  },
});

export default TermsOfServicePage;
