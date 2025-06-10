import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { colors } from '@/constants/colors';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>닉네임 변경</Text>
      </View>

      <Text style={styles.label}>새로운 닉네임을 입력해주세요</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            !isValid && nickname ? styles.inputError : null,
          ]}
          placeholder="닉네임 입력..."
          placeholderTextColor="#999"
          value={nickname}
          onChangeText={setNickname}
        />
        {nickname.length > 0 && (
          <TouchableOpacity onPress={() => setNickname('')}>
            <Ionicons name="close-circle" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {!isValid && nickname.length > 0 && (
        <Text style={styles.warning}>
          닉네임은 한글, 영문, 숫자만 입력 가능합니다.
        </Text>
      )}

      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        disabled={!isValid}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>변경 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NicknameEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.deepNavy,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  title: {
    color: colors.textColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    color: colors.textColor,
    fontSize: 14,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.midnightBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    color: colors.textColor,
    fontSize: 14,
  },
  inputError: {
    borderColor: colors.softOrange,
    borderWidth: 1,
  },
  warning: {
    color: colors.softOrange,
    fontSize: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.softBlue,
    padding: 12,
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: colors.mediumGray,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
