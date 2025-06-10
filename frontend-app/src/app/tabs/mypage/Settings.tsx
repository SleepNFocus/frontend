import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { useAuthStore } from '@/store/authStore';
import { BackButton } from '@/components/common/BackButton';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/colors';

const Settings = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const user = useAuthStore(state => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton color={colors.white} />
        <Text variant="titleMedium" style={styles.headerTitle}>내 정보 수정</Text>
      </View>

      <View style={styles.profileBox}>
        <Image
          source={require('@/assets/profile.png')}
          style={styles.profileImage}
        />
        <Text variant="titleMedium" style={styles.nickname}>{user?.nickname ?? '-'}</Text>
      </View>

      <Card style={styles.card}>
        <TouchableOpacity
          style={styles.itemRow}
          onPress={() => navigation.navigate('NicknameEdit')}
        >
          <Text variant="bodyMedium" style={styles.label}>닉네임</Text>
          <View style={styles.rightWrap}>
            <Text variant="bodyMedium" style={styles.value}>{user?.nickname ?? '-'}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.mediumGray} />
          </View>
        </TouchableOpacity>

        <View style={styles.itemRow}>
          <Text variant="bodyMedium" style={styles.label}>아이디</Text>
          <Text variant="bodyMedium" style={styles.value}>TES@TEST.COM</Text>
        </View>

        <View style={styles.itemRow}>
          <Text variant="bodyMedium" style={styles.label}>가입일</Text>
          <Text variant="bodyMedium" style={styles.value}>2024.01.01</Text>
        </View>

        <View style={styles.itemRow}>
          <Text variant="bodyMedium" style={styles.label}>연동된 계정</Text>
          <View style={styles.rightWrap}>
            <Image
              source={require('@/assets/google.png')}
              style={styles.icon}
            />
            <Text variant="bodyMedium" style={styles.googleText}>Google</Text>
          </View>
        </View>
      </Card>

      <View style={styles.buttonGroup}>
        <Button
          title="로그아웃"
          variant="outline"
          onPress={() => {}}
          style={styles.button}
        />
        <Button
          title="회원탈퇴"
          variant="outline"
          onPress={() => {}}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default Settings;

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
  },
  headerTitle: {
    color: colors.textColor,
    marginLeft: 12,
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.midnightBlue,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  nickname: {
    color: colors.textColor,
  },
  card: {
    backgroundColor: colors.midnightBlue,
    padding: 12,
    marginBottom: 24,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumLightGray,
  },
  label: {
    color: colors.textColor,
  },
  value: {
    color: colors.mediumGray,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  rightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonGroup: {
    gap: 12,
  },
  button: {
    backgroundColor: colors.midnightBlue,
  },
  googleText: {
    color: colors.softBlue,
  },
});
