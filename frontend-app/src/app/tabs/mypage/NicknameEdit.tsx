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
import Toast from 'react-native-toast-message';
import { colors } from '@/constants/colors';
import { Text } from '@/components/common/Text';
import { Layout } from '@/components/common/Layout';
import { Card } from '@/components/common/Card';
import { BackButton } from '@/components/common/BackButton';
import { Button } from '@/components/common/Button';

const NicknameEdit = () => {
  const navigation = useNavigation();

  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const [nickname, setNickname] = useState('');
  const nicknamevalidity = /^[가-힣a-zA-Z0-9]{2,20}$/;

  const isValid = nicknamevalidity.test(nickname);

  const handleSave = () => {
    if (!user) {
      Toast.show({
        type: 'error',
        text1: '유저 정보가 없습니다.',
        text2: '로그인이 필요합니다.',
      });
      return;
    }

    if (!isValid) {
      Toast.show({
        type: 'error',
        text1: '닉네임이 너무 짧거나 잘못된 형식이에요!',
        text2: '한글, 영문, 숫자 2~20자만 입력 가능해요.',
      });
      return;
    }

    setUser({ ...user, nickname });

    Toast.show({
      type: 'success',
      text1: '닉네임이 변경되었어요!',
    });

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
              닉네임은 한글, 영문, 숫자만 입력 가능합니다.
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
    marginBottom: 24,
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
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
  },
});
