import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Checkbox } from 'react-native-paper';

interface PrivacyNoticeProps {
  onAgree: () => void;
}

export const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({ onAgree }) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text variant="headlineMedium" style={styles.title}>
          개인정보 수집 및 이용 동의
        </Text>
        <Text style={styles.content}>
          Focuz는 다음과 같이 개인정보를 수집하고 이용합니다.
        </Text>
        <Text style={styles.content}>
          1. 수집하는 개인정보 항목
          - 필수항목: 이메일, 이름
          - 선택항목: 생년월일, 성별
        </Text>
        <Text style={styles.content}>
          2. 개인정보의 수집 및 이용목적
          - 서비스 제공 및 계약의 이행
          - 회원 관리
          - 마케팅 및 광고에의 활용
        </Text>
        <Text style={styles.content}>
          3. 개인정보의 보유 및 이용기간
          - 회원 탈퇴 시까지
        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <Checkbox.Item
          label="개인정보 수집 및 이용에 동의합니다"
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
          style={styles.checkbox}
        />
        <Button
          mode="contained"
          onPress={onAgree}
          disabled={!checked}
          style={styles.button}
        >
          동의하고 계속하기
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  content: {
    marginBottom: 16,
    lineHeight: 24,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  checkbox: {
    marginBottom: 16,
  },
  button: {
    width: '100%',
  },
}); 