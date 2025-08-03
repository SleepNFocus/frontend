import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors } from '@/constants/colors';

const ProfileEdit = () => {
  const [nickname, setNickname] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <TouchableOpacity>
          <Text style={styles.changeText}>이미지 변경</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrap}>
        <Text style={styles.label}>닉네임</Text>
        <TextInput
          style={styles.input}
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChangeText={text => setNickname(text)}
        />
      </View>
    </View>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    gap: 24,
    padding: 24,
  },
  imageWrap: {
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.mediumGray,
    marginBottom: 16,
  },
  changeText: {
    color: colors.softBlue,
    marginTop: 8,
  },
  inputWrap: {
    marginTop: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.textColor,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.textColor,
  },
  nickname: {
    color: colors.softBlue,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    color: colors.textColor,
    fontSize: 16,
    marginBottom: 4,
  },
  border: {
    borderColor: colors.mediumLightGray,
    borderWidth: 1,
    marginVertical: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardText: {
    color: colors.textColor,
    fontSize: 16,
  },
});
