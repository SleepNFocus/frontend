import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useAuthStore } from '@/store/authStore';

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
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>닉네임 변경</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={[
              styles.input,
              !isValid && nickname ? styles.inputError : null,
            ]}
            placeholder="새 닉네임을 입력하세요"
            placeholderTextColor="#888"
            value={nickname}
            onChangeText={setNickname}
          />

          {!isValid && nickname.length > 0 && (
            <Text style={styles.warning}>
              한글, 영문, 숫자 2~20자 입력 가능
            </Text>
          )}

          <TouchableOpacity
            style={[styles.button, !isValid && styles.buttonDisabled]}
            disabled={!isValid}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>변경 완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NicknameChangeModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1C1C40',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    backgroundColor: '#2A2A5A',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 8,
  },
  inputError: {
    borderColor: '#f66',
    borderWidth: 1,
  },
  warning: {
    color: '#f88',
    fontSize: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#6c5ce7',
    padding: 12,
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#555',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
