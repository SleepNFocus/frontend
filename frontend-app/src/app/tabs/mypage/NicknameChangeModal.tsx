import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Text } from '@/components/common/Text';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/colors';
import { Button } from '@/components/common/Button';

interface NicknameChangeModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (newNickname: string) => void;
}

export default function NicknameChangeModal({
  visible,
  onClose,
  onConfirm,
}: NicknameChangeModalProps) {
  const [nickname, setNickname] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);

    const nicknameSyntax = /^[가-힣a-zA-Z0-9]{2,20}$/;
    if (nicknameSyntax.test(nickname)) {
      onConfirm(nickname);
      setNickname('');
      setIsValid(true);
      setSubmitted(false);
    } else {
      setIsValid(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Card style={styles.container}>
          <View style={styles.header}>
            <Text variant="titleMedium" style={styles.title}>
              닉네임 변경
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={[
              styles.input,
              !isValid && nickname ? styles.inputError : null,
            ]}
            value={nickname}
            onChangeText={setNickname}
            placeholder="새로운 닉네임을 입력하세요"
            placeholderTextColor={colors.mediumGray}
          />

          {!isValid && submitted && (
            <Text variant="bodySmall" style={styles.warning}>
              한글, 영문, 숫자 2~20자 입력 가능
            </Text>
          )}

          <Button
            title="변경하기"
            variant="primary"
            onPress={handleSubmit}
            style={styles.button}
          />
        </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 400,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: colors.deepNavy,
  },
  closeButton: {
    fontSize: 18,
    color: colors.mediumGray,
    padding: 4,
  },
  input: {
    backgroundColor: colors.lightGray,
    color: colors.textColor,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
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
