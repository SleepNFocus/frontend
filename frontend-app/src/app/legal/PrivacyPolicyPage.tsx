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
            다하고 있습니다. 본 개인정보처리방침은 "FOCUZ" 앱 서비스(이하
            "서비스")를 이용하는 사용자(이하 "회원" 또는 "사용자")의 개인정보를
            어떻게 수집, 이용, 보관, 공유 및 파기하는지 명확히 설명합니다.
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
              능력 관련 목표, 명상 경험 유무, 기분 상태, 스트레스 수준, 신체적
              특성(키, 몸무게) 등
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 상담 정보: 고객 문의 및 피드백 과정에서 제공하는 정보
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 결제 정보: 유료 서비스 이용 시 결제 수단에 따라 신용카드 정보
              (부분적/암호화), 휴대폰 번호, 은행 계좌 정보 등. 단, 결제는 주로
              제3자 결제대행업체를 통해 이루어지므로, 저희는 결제에 필요한
              최소한의 정보만을 취급하며 결제 관련 민감 정보는 해당 업체에서
              직접 처리합니다.
            </Text>

            <Text variant="titleSmall" style={styles.subTitle}>
              2. 서비스 이용 과정에서 자동으로 생성 및 수집되는 정보:
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 기기 및 사용 정보: IP 주소, 기기 식별자 (UDID, IMEI 등),
              운영체제 정보, 브라우저 종류, 앱 버전, 서비스 이용 기록 (접속
              시간, 방문 기록, 앱 내 활동 기록, 클릭 패턴 등), 쿠키 및 유사 기술
            </Text>

            <Text variant="titleSmall" style={styles.subTitle}>
              3. 건강 관련 정보 (민감정보 포함):
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 수면 관련 정보: 기기 센서(가속도계, 마이크 등)를 통한 수면 중
              움직임, 코골이 등 소음, 수면 시간, 기상 시간, 수면 단계 (깊은
              수면, 얕은 수면, 렘수면), 수면 효율성 등
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 인지 능력 관련 정보: 인지 훈련 게임 점수, 훈련 시간, 학습 진도,
              특정 과제 수행 능력 등
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 생체 신호 정보: 특정 기기 연동 시 심박수, 호흡수, 산소 포화도 등
              (선택 사항이며, 명시적인 동의가 있을 경우에만 수집)
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 위치 정보: 서비스 제공을 위한 필수적인 경우(예: 수면 환경 분석)
              또는 사용자가 동의한 경우에 한하여 위치 정보가 수집될 수 있습니다.
            </Text>

            <Text variant="titleSmall" style={styles.subTitle}>
              4. 제3자로부터 제공받는 정보:
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 소셜 로그인 정보: 회원이 소셜 미디어 계정(예: Google, Apple,
              Kakao 등)을 통해 로그인하거나 계정을 생성할 경우, 해당 소셜 미디어
              서비스의 데이터 공유 설정에 따라 이름, 이메일 주소 등 프로필
              정보에 접근할 수 있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 외부 건강 앱 연동 정보: 회원이 Apple HealthKit, Google Fit 등
              다른 건강 앱과의 연동에 동의할 경우, 해당 앱으로부터 수면 시간,
              활동량, 체중 등 건강 관련 정보를 제공받을 수 있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 제휴 및 광고 파트너 정보: 제휴사 또는 광고 파트너로부터 회원
              가입 유도 및 광고 효과 측정을 위한 정보(예: 광고 ID)를 제공받을 수
              있습니다.
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

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제3조 (개인정보의 공유 및 제공)
            </Text>
            <Text variant="bodyMedium" style={styles.sectionContent}>
              저희는 회원의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
              다만, 서비스 제공을 위해 필요하거나 법률에 특별한 규정이 있는
              경우에 한하여 다음과 같이 공유 또는 제공할 수 있습니다.
            </Text>

            <Text variant="titleSmall" style={styles.subTitle}>
              1. 서비스 제공을 위한 제3자 제공:
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 클라우드 호스팅 서비스 (예: AWS, Google Cloud Platform): 데이터
              저장 및 관리
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 결제 처리업체: 유료 서비스 결제 처리
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 데이터 분석 업체 (예: Google Analytics, Amplitude): 서비스 이용
              통계 분석 및 개선
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 광고 및 마케팅 파트너: 맞춤형 광고 제공 및 성과 분석
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 고객 지원 도구 제공업체: 고객 문의 및 불만 처리
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 기술 지원 및 유지보수 업체: 서비스 운영 및 시스템 관리
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              제공된 개인정보는 해당 서비스 제공 목적 외의 용도로 이용되지
              않으며, 계약을 통해 개인정보 보호 의무를 준수하도록 엄격히
              관리합니다.
            </Text>

            <Text variant="titleSmall" style={styles.subTitle}>
              2. 법적 의무 준수 및 권리 보호:
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 법원 명령, 수사기관의 영장, 규제 기관의 요청 등 관련 법률에 따른
              적법한 절차에 의해 요청되는 경우
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 회원 또는 제3자의 생명, 신체, 재산에 대한 긴급한 위험이 있거나
              명백한 위해가 예상되어 회원의 동의를 얻기 불가능한 경우
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 회사의 서비스 이용약관을 위반하거나 불법적인 활동에 연루된
              것으로 합리적으로 판단될 경우, 안전한 서비스 운영을 위해 필요한
              범위 내에서 개인정보를 공개할 수 있습니다.
            </Text>

            <Text variant="titleSmall" style={styles.subTitle}>
              3. 사업 양도 및 합병 등:
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 회사의 영업 전부 또는 일부 양도, 합병, 분할 등 기업 형태 변화가
              발생하는 경우, 서비스 제공 연속성을 위해 법적 절차에 따라
              개인정보를 이전할 수 있습니다. 이 경우 회사는 회원에게 개인정보
              이전 사실 및 변경될 개인정보처리방침에 대해 사전 고지하며, 회원은
              개인정보 이전에 동의하지 않을 권리가 있습니다.
            </Text>

            <Text variant="titleSmall" style={styles.subTitle}>
              4. 익명화 또는 집계된 정보:
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 개인을 식별할 수 없는 형태로 익명화 또는 집계된 데이터는 서비스
              개선, 연구, 통계 분석, 사업 홍보 등의 목적으로 제3자와 공유될 수
              있습니다. 이러한 데이터는 「개인정보 보호법」의 적용을 받지
              않습니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제4조 (개인정보의 파기)
            </Text>
            <Text variant="bodyMedium" style={styles.sectionContent}>
              저희는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체
              없이 파기합니다. 단, 관련 법령에 따라 일정 기간 보존해야 하는
              정보는 해당 기간 동안 보관한 후 파기합니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 파기 절차: 목적 달성 후 내부 정책 및 기타 관련 법령에 따라 일정
              기간 저장된 후 파기됩니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 파기 계획을 수립하고 개인정보 보호책임자의 승인을 받아
              파기합니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 파기 방법: 종이 문서 형태로 저장된 개인정보는 분쇄기로
              분쇄하거나 소각하여 파기합니다. 전자적 파일 형태로 저장된
              개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여
              삭제합니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제5조 (정보주체 및 법정대리인의 권리 행사 방법)
            </Text>
            <Text variant="bodyMedium" style={styles.sectionContent}>
              회원(정보주체) 및 법정대리인은 언제든지 등록되어 있는 자신의
              개인정보를 조회하거나 수정할 수 있으며, 서비스 이용약관에 따라
              계정 삭제 또는 개인정보 처리 정지를 요청할 수 있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 개인정보 열람, 정정, 삭제, 처리정지 요청: 앱 내 "설정" 또는 "내
              정보" 메뉴를 통해 직접 조회 및 수정할 수 있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 개인정보 보호책임자 또는 담당 부서에 서면, 전화, 이메일 등으로
              연락하여 요청할 수 있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 개인정보의 열람 및 처리를 요구할 권리, 오류 정정 요구할 권리,
              삭제 요구할 권리, 처리정지할 권리 등이 있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 권리 행사는 「개인정보 보호법」 등 관련 법령에 따라 제한될 수
              있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 마케팅 수신 거부: 프로모션 이메일 및 푸시 알림 수신을 언제든지
              거부할 수 있습니다. 앱 내 설정 또는 이메일 하단 수신거부 링크 통해
              설정 가능하나, 서비스 제공을 위한 필수 알림(예: 결제 정보, 서비스
              변경 공지)은 수신거부와 관계없이 발송될 수 있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 데이터 이동성 권리: 자신의 개인정보를 구조화되고 일반적으로
              사용되며 기계 판독 가능한 형식으로 받을 권리가 있으며, 기술적 가능
              시 다른 컨트롤러로 전송 요청 가능…
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제6조 (아동의 개인정보 보호)
            </Text>
            <Text variant="bodyMedium" style={styles.sectionContent}>
              저희는 아동의 개인정보를 특별히 보호하기 위해 다음 정책을
              준수합니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • "FOCUZ" 앱은 만 12세 미만의 아동을 대상으로 하지 않습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 만 12세 미만 사용자의 개인정보를 의도적으로 수집하지 않습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 만약 저희가 만 12세 미만의 아동으로부터 개인정보를 수집했음을
              알게 될 경우, 해당 정보를 지체 없이 삭제하기 위한 합리적인 조치를
              취합니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 부모 또는 보호자가 자녀의 개인정보가 실수로 수집되었다고
              판단하는 경우, 본 개인정보처리방침에 명시된 연락처로 즉시 통보해
              주시기 바랍니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제7조 (개인정보의 안전성 확보 조치)
            </Text>
            <Text variant="bodyMedium" style={styles.sectionContent}>
              저희는 회원의 개인정보를 안전하게 관리하기 위해 「개인정보
              보호법」 등 관련 법령에서 요구하는 다음과 같은 기술적, 관리적,
              물리적 조치를 취하고 있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 기술적 조치: 개인정보를 암호화하여 저장 및 전송하고 있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 보안 프로그램 설치 및 주기적 갱신으로 해킹, 바이러스 등에 의한
              유출 방지.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 침입 차단 시스템 설치 및 운영으로 외부 무단 접근 통제.
            </Text>

            <Text variant="bodyMedium" style={styles.listItem}>
              • 관리적 조치: 개인정보 처리 직원을 최소화하고, 정기 교육·보안
              서약·권한 관리 등을 시행하고 있습니다.
            </Text>

            <Text variant="bodyMedium" style={styles.listItem}>
              • 물리적 조치: 개인정보가 저장된 시스템 및 물리적 보관 장소의 출입
              통제 구역 설정 등.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제8조 (개인정보 보호책임자 및 담당 부서)
            </Text>
            <Text variant="bodyMedium" style={styles.sectionContent}>
              저희는 회원의 개인정보를 보호하고 관련 불만을 처리하기 위하여
              아래와 같이 개인정보 보호책임자 및 담당 부서를 지정하고 있습니다.
              회원은 서비스 이용 중 발생하는 개인정보 보호 관련 문의, 불만 처리,
              피해 구제 등에 관해 개인정보 보호책임자 또는 담당 부서로 문의할 수
              있으며, 지체 없이 답변하고 처리할 것입니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • (책임자 이름/부서/연락처 등 기재)
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              제9조 (개인정보처리방침 변경)
            </Text>
            <Text variant="bodyMedium" style={styles.sectionContent}>
              이 개인정보처리방침은 관련 법령 및 지침의 변경, 서비스 내용의 변경
              또는 기술적 변화에 따라 개정될 수 있습니다.
            </Text>
            <Text variant="bodyMedium" style={styles.listItem}>
              • 개인정보처리방침이 변경될 경우, 회사는 개정된 개인정보처리방침의
              시행일로부터 최소 7일 전(다만, 사용자 권리의 중요한 변경이 있을
              경우에는 30일 전)에 웹사이트 또는 앱 내 공지사항을 통해 고지할
              것입니다.
            </Text>
          </View>

          <Text variant="bodyMedium" style={styles.effectiveDate}>
            부칙: 본 개인정보처리방침은 2025년 6월 18일부터 시행됩니다.
          </Text>
          <Text variant="bodyMedium" style={styles.sectionContent}>
            기타 문의 사항은 [이메일 주소] 또는 [전화번호]로 문의하여 주시기
            바랍니다.
          </Text>
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
});

export default PrivacyPolicyPage;
