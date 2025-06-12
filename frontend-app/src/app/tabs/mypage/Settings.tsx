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
import { Layout } from '@/components/common/Layout';
import useUiStore from '@/store/uiStore';

const Settings = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { openModal } = useUiStore();
  const { user, resetAuth } = useAuthStore();

  const handleLogout = () => {
    openModal('info', {
      isOpen: true,
      title: '로그아웃',
      content: '로그아웃 하시겠습니까?',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        resetAuth();
        openModal('success', {
          isOpen: true,
          title: '로그아웃 완료',
          content: '로그아웃 되었습니다.',
          confirmText: '확인',
        });
      },
    });
  };

  const handleWithdrawal = () => {
    openModal('error', {
      isOpen: true,
      title: '회원 탈퇴',
      content: '정말로 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제됩니다.',
      confirmText: '탈퇴하기',
      cancelText: '취소',
      onConfirm: () => {
        resetAuth();
        openModal('success', {
          isOpen: true,
          title: '탈퇴 완료',
          content: '탈퇴되었습니다.',
          confirmText: '확인',
        });
      },
    });
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton color={colors.deepNavy} />
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
            variant="primary"
            onPress={handleLogout}
            style={styles.button}
          />
          <Button
            title="회원탈퇴"
            variant="primary"
            onPress={handleWithdrawal}
            style={styles.button}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    color: colors.deepNavy,
    marginLeft: 12,
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  nickname: {
    color: colors.deepNavy,
  },
  card: {
    backgroundColor: colors.white,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
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
    color: colors.deepNavy,
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
    width: '100%',
  },
  googleText: {
    color: colors.softBlue,
  },
});
