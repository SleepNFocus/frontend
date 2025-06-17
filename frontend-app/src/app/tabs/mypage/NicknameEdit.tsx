import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useUiStore from '@/store/uiStore';
import { colors } from '@/constants/colors';
import { Text } from '@/components/common/Text';
import { Layout } from '@/components/common/Layout';
import { Card } from '@/components/common/Card';
import { BackButton } from '@/components/common/BackButton';
import { Button } from '@/components/common/Button';

const NicknameEdit = () => {
  const navigation = useNavigation();
  const { openToast } = useUiStore();

  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const [nickname, setNickname] = useState('');
  // 초성(ㄱ-ㅎ), 모음(ㅏ-ㅣ), 완성형 한글(가-힣), 영문, 숫자 허용
  const nicknamevalidity = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,20}$/;
  const isValid = nicknamevalidity.test(nickname);
  const isLengthValid = nickname.length >= 2 && nickname.length <= 20;
  const isCharsetValid = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]*$/.test(nickname);

  let errorMsg = '';
  if (!isLengthValid && nickname.length > 0) {
    errorMsg = '닉네임은 2~20자여야 합니다.';
  } else if (!isCharsetValid && nickname.length > 0) {
    errorMsg = '닉네임은 한글, 영문, 숫자만 입력 가능합니다.';
  }

  const handleSave = () => {
    if (!user) {
      openToast('error', '변경 실패', '닉네임 변경에 실패했어요');
      return;
    }

    if (!isValid) {
      openToast('error', errorMsg || '닉네임이 너무 짧거나 잘못된 형식이에요!', '한글, 영문, 숫자 2~20자만 입력 가능해요.');
      return;
    }

    setUser({ ...user, nickname });

    openToast('success', '닉네임 변경', '닉네임이 변경되었어요!');

    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton color={colors.deepNavy} />
          <Text variant="titleMedium" style={styles.title}>닉네임 변경</Text>
        </View>

        <Card style={styles.card}>
          <Text variant="bodyMedium" style={styles.label}>새로운 닉네임을 입력해주세요</Text>

          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                !isValid && nickname ? styles.inputError : null,
              ]}
              placeholder="닉네임 입력..."
              placeholderTextColor={colors.mediumGray}
              value={nickname}
              onChangeText={setNickname}
            />
            {nickname.length > 0 && (
              <TouchableOpacity onPress={() => setNickname('')}>
                <Ionicons name="close-circle" size={20} color={colors.mediumGray} />
              </TouchableOpacity>
            )}
          </View>

          {!isValid && nickname.length > 0 && (
            <Text variant="bodySmall" style={styles.warning}>
              {errorMsg || '닉네임은 한글, 영문, 숫자만 입력 가능합니다.'}
            </Text>
          )}

          <Button
            title="변경 완료"
            onPress={handleSave}
            variant="primary"
            disabled={!isValid}
            style={styles.button}
          />
        </Card>
      </View>
    </Layout>
  );
};

export default NicknameEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  title: {
    color: colors.deepNavy,
  },
  card: {
    backgroundColor: colors.white,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  label: {
    color: colors.deepNavy,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
  },
  input: {
    flex: 1,
    color: colors.deepNavy,
  },
  inputError: {
    borderColor: colors.softOrange,
  },
  warning: {
    color: colors.softOrange,
  },
  button: {
    marginTop: 12,
  },
});
