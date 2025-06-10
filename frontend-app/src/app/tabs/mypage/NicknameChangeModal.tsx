import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Modal as RNModal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useAuthStore } from '@/store/authStore';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { colors } from '@/constants/colors';

interface Props {
  visible: boolean;
  onClose: () => void;
  initialValue?: string;
}

const NicknameChangeModal: React.FC<Props> = ({
  visible,
  onClose,
  initialValue = '',
}) => {
  const [nickname, setNickname] = useState(initialValue);
  const nicknamevalidity = /^[가-힣a-zA-Z0-9]{2,20}$/;
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    setNickname(initialValue);
  }, [initialValue]);

  const isValid = nicknamevalidity.test(nickname);

  const handleSubmit = () => {
    if (!user) {
      Toast.show({
        type: 'error',
        text1: '유저 정보가 없습니다.',
        text2: '현재 Mockup기능만 구현 되어있습니다. ',
      });
      return;
    }

    if (!isValid) {
      return;
    }

    setUser({ ...user, nickname });

    Toast.show({
      type: 'success',
      text1: '정상적으로 변경되었습니다.',
    });

    onClose();
  };

  return (
    <RNModal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant="titleMedium" style={styles.title}>닉네임 변경</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={[
              styles.input,
              !isValid && nickname ? styles.inputError : null,
            ]}
            placeholder="새 닉네임을 입력하세요"
            placeholderTextColor={colors.mediumGray}
            value={nickname}
            onChangeText={setNickname}
          />

          {!isValid && nickname.length > 0 && (
            <Text variant="bodySmall" style={styles.warning}>
              한글, 영문, 숫자 2~20자 입력 가능
            </Text>
          )}

          <Button
            title="변경 완료"
            variant="primary"
            onPress={handleSubmit}
            disabled={!isValid}
            style={styles.button}
          />
        </View>
      </View>
    </RNModal>
  );
};

export default NicknameChangeModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.mediumGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.deepNavy,
    padding: 24,
    borderRadius: 12,
    width: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: colors.textColor,
  },
  input: {
    backgroundColor: colors.midnightBlue,
    color: colors.textColor,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 8,
  },
  inputError: {
    borderColor: colors.softOrange,
    borderWidth: 1,
  },
  warning: {
    color: colors.softOrange,
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});
