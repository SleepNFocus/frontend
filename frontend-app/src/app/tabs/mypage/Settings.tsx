import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
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
import { logoutUser } from '@/app/auth/logout';
import { withdrawUser } from '@/app/auth/withdraw';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProfile } from '@/services/mypageApi';
import { NotFoundPage } from '@/components/common/NotFoundPage';

const Settings = () => {
   useEffect(() => {
    const checkAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('🧪 useEffect 내부 accessToken:', token);

      const allKeys = await AsyncStorage.getAllKeys();
      console.log('📦 저장된 키 목록:', allKeys);

      const allValues = await AsyncStorage.multiGet(allKeys);
      console.log('🔍 저장된 값:', allValues);
    };

    checkAccessToken();
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { openModal, openToast } = useUiStore();
  const { user, resetAuth, setUser } = useAuthStore();

  // 프로필 이미지 상태
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // API에서 받아온 프로필 이미지로 동기화
  const { data: profile, isLoading, error, refetch } = useProfile();
  useEffect(() => {
    if (profile?.profile_image) {
      setProfileImage(profile.profile_image);
    }
  }, [profile?.profile_image]);

  const handleProfileImageChange = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        openToast('error', '권한 필요', '이미지 선택을 위해 갤러리 접근 권한이 필요합니다.');
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
        openToast('success', '프로필 변경', '프로필이 변경되었습니다.');
      }
    } catch (e) {
      openToast('error', '변경 실패', '프로필 변경에 실패했어요');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); 

      openToast('success', '로그아웃 완료', '로그아웃 되었습니다.');

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LandingPage' }],
        });
      }, 1000);
    } catch (error) {
      openToast('error', '로그아웃 실패', '잠시 후 다시 시도해주세요.');
      console.error('로그아웃 실패:', error);
    }
  };

  const handleWithdrawal = async () => {
    try {
      await withdrawUser();
      openToast('success', '탈퇴 완료', '계정이 삭제되었습니다.');
  
      setTimeout(() => {
        resetAuth();
        navigation.reset({
          index: 0, routes: [{ name: 'LandingPage' }],
        });
      }, 1500);
    } catch (error) {
      openToast('error', '탈퇴 실패', '다시 시도해주세요.');
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.softBlue} />
        <Text style={{ marginTop: 12 }}>불러오는 중입니다...</Text>
      </View>
    );
  }
  if (error) {
    return <NotFoundPage onRetry={() => refetch()} />;
  }

  return (
    <Layout>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
                  <Text style={styles.value}>{profile?.nickname ?? '-'}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>이메일</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>{profile?.email ?? '-'}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>성별</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>{profile?.gender ?? '-'}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>출생년도</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>{profile?.birth_year ?? '-'}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>MBTI</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>{profile?.mbti ?? '-'}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>인지유형</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>{profile?.cognitive_type_out_label ?? '-'}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>근무패턴</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>{profile?.work_time_pattern_out_label ?? '-'}</Text>
              </View>
            </View>
          </Card>
          {/* 통계 정보 카드(통계 데이터는 Profile 타입에 없으므로 주석 처리) */}
          {/**
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>가입일</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>{profile?.joined_at ? profile.joined_at.replace(/-/g, '.') : '-'}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>총 기록 일수</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>{profile?.tracking_days ?? '-'}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>총 수면 시간</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>{profile?.total_sleep_hours ? `${profile.total_sleep_hours}시간` : '-'}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>평균 수면 점수</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>{profile?.average_sleep_score ?? '-'}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>평균 인지 점수</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value}>{profile?.average_cognitive_score ?? '-'}</Text>
              </View>
            </View>
          </Card>
          */}
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
      </ScrollView>
    </Layout>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
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