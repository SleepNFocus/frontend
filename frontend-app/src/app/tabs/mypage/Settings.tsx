import React, { useState } from 'react';
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
import * as ImagePicker from 'expo-image-picker';

const Settings = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { openModal } = useUiStore();
  const { user, resetAuth } = useAuthStore();

  // 프로필 이미지 상태
  const [profileImage, setProfileImage] = useState(user?.image_url ?? null);

  // 프로필 이미지 변경 함수
  const handleProfileImageChange = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      openModal('error', {
        isOpen: true,
        title: '권한 필요',
        content: '이미지 선택을 위해 갤러리 접근 권한이 필요합니다.',
        confirmText: '확인',
      });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
      // TODO: 서버에 업로드/스토어 반영 등 추가 가능
    }
  };

  const handleLogout = () => {
    openModal('confirm', {
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
        navigation.navigate('LandingPage');
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

        <Card style={styles.profileContainer}>
          <TouchableOpacity onPress={handleProfileImageChange} activeOpacity={0.8} style={styles.profileImageBox}>
            <View style={styles.profileImageWrapper}>
              <Image
                source={profileImage ? { uri: profileImage } : require('@/assets/profile.png')}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.cameraIconWrapper}
                onPress={handleProfileImageChange}
                activeOpacity={0.8}
              >
                <Ionicons name="camera" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('NicknameEdit')}
            style={{ width: '100%' }}
          >
            <Card style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>닉네임</Text>
                <View style={styles.valueRow}>
                  <Text style={styles.value}>{user?.nickname ?? '-'}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>아이디</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>TES@TEST.COM</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>가입일</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>2024.01.01</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>연동된 계정</Text>
              <View style={styles.valueRow}>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.googleText}>Google</Text>
              </View>
            </View>
          </Card>
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
    marginBottom: 12,
  },
  headerTitle: {
    color: colors.deepNavy,
    marginLeft: 10,
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  profileImageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  profileImageWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.lightGray,
  },
  cameraIconWrapper: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  infoCard: {
    width: '100%',
    marginTop: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    alignItems: 'flex-start',
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    color: colors.deepNavy,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    color: colors.textColor,
    fontSize: 16,
  },
  rightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  googleText: {
    color: colors.softBlue,
  },
  googleIcon: {
    color: colors.softBlue,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  buttonGroup: {
    gap: 12,
    marginTop: 12,
  },
  button: {
    width: '100%',
  },
});
