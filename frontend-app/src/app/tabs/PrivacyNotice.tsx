import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Text, Button, Checkbox, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// PrivacyNotice: 개인정보 안내 및 동의 페이지
export const PrivacyNotice: React.FC<{ onAgree?: () => void }> = ({
  onAgree,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <LinearGradient
      colors={['#e8eafe', '#fff']}
      style={styles.root}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.centerBox}>
        <View style={styles.card}>
          <Text style={styles.title}>소중한 정보, 안전하게 활용됩니다.</Text>
          <Text style={styles.desc}>
            FOCUZ는 사용자가 입력한 수면 데이터와 게임 결과를 수집하여 분석에
            활용합니다. 이는 개인화된 수면-인지 기능 관계 분석과 서비스 개선을
            위해서만 사용됩니다. {'\n'}
            {'\n'}
            수집하는 정보:
          </Text>
          <View style={styles.listBox}>
            <Text style={styles.listItem}>
              • 사용자가 입력한 수면 관련 데이터
            </Text>
            <Text style={styles.listItem}>• 인지 능력 게임의 결과 데이터</Text>
            <Text style={styles.listItem}>• 서비스 사용 패턴</Text>
          </View>
          <Text style={styles.desc}>
            모든 데이터는 암호화되어 안전하게 분리 보관되며, 제3자에게 제공되지
            않습니다.
          </Text>
          <View style={styles.linkBox}>
            <TouchableOpacity onPress={() => Linking.openURL('#')}>
              <Text style={styles.link}>개인정보처리방침</Text>
            </TouchableOpacity>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.agreeBox}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
              color={'#6C7BFF'}
              uncheckedColor={'#bbb'}
            />
            <Text style={styles.agreeText}>
              개인정보 수집 및 이용에 동의합니다.
            </Text>
          </View>
          <Pressable
            onPress={checked ? onAgree : undefined}
            disabled={!checked}
            style={({ pressed }) => [
              styles.button,
              !checked && styles.buttonDisabled,
              pressed && styles.buttonHover,
            ]}
          >
            <Text style={styles.buttonLabel}>동의하고 계속하기</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default PrivacyNotice;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBox: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 28,
    marginBottom: 32,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 18,
    color: '#222',
    textAlign: 'left',
  },
  desc: {
    color: '#444',
    fontSize: 15,
    marginBottom: 10,
    lineHeight: 22,
  },
  listBox: {
    marginBottom: 10,
  },
  listItem: {
    color: '#222',
    fontSize: 15,
    marginBottom: 2,
    marginLeft: 2,
  },
  linkBox: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 4,
    marginBottom: 8,
  },
  link: {
    color: '#6C7BFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  agreeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  agreeText: {
    fontSize: 15,
    color: '#222',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#6C7BFF',
    paddingHorizontal: 36,
    paddingVertical: 8,
    elevation: 0,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 0,
  },
  buttonHover: {
    backgroundColor: '#4B5FFF', // 더 진한 파란색으로 완전히 덮어쓰기
    borderWidth: 0,
    shadowColor: 'transparent',
  },
  buttonDisabled: {
    backgroundColor: '#bfc6f7',
  },
  buttonLabel: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
