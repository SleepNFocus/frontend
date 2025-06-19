import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
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
import { useProfile, useUpdateProfile, useUploadProfileImage } from '@/services/mypageApi';
import { NotFoundPage } from '@/components/common/NotFoundPage'
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { GENDER_OPTIONS, AGE_OPTIONS } from '@/constants/constants';

// MBTI 옵션 직접 정의
const MBTI_OPTIONS = [
  { label: 'ISTJ', value: 'ISTJ' },
  { label: 'ISFJ', value: 'ISFJ' },
  { label: 'INFJ', value: 'INFJ' },
  { label: 'INTJ', value: 'INTJ' },
  { label: 'ISTP', value: 'ISTP' },
  { label: 'ISFP', value: 'ISFP' },
  { label: 'INFP', value: 'INFP' },
  { label: 'INTP', value: 'INTP' },
  { label: 'ESTP', value: 'ESTP' },
  { label: 'ESFP', value: 'ESFP' },
  { label: 'ENFP', value: 'ENFP' },
  { label: 'ENTP', value: 'ENTP' },
  { label: 'ESTJ', value: 'ESTJ' },
  { label: 'ESFJ', value: 'ESFJ' },
  { label: 'ENFJ', value: 'ENFJ' },
  { label: 'ENTJ', value: 'ENTJ' },
];

// SurveyPage에서 복사한 CustomDropdown
interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  items: DropdownItem[];
  value: string | null;
  onSelect: (value: string) => void;
  placeholder: string;
}

const CustomDropdown: React.FC<DropdownProps> = ({ items, value, onSelect, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const selectedItem = items.find(item => item.value === value);

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity 
        style={styles.dropdownButton}
        onPress={() => setIsVisible(true)}
      >
        <Text 
          style={!selectedItem 
            ? { ...styles.dropdownButtonText, ...styles.placeholderText, textAlign: 'right' }
            : { ...styles.dropdownButtonText, textAlign: 'right' }
          }
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{placeholder}</Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.modalItem,
                    value === item.value && styles.selectedItem
                  ]}
                  onPress={() => {
                    onSelect(item.value);
                    setIsVisible(false);
                  }}
                >
                  <Text 
                    style={value === item.value 
                      ? { ...styles.modalItemText, ...styles.selectedItemText }
                      : styles.modalItemText
                    }
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const Settings = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { openModal, openToast } = useUiStore();
  const { user, resetAuth, setUser } = useAuthStore();

  // 프로필 이미지 상태
  const [profileImage, setProfileImage] = useState<string | null>(user?.image_url || null);

  // API에서 받아온 프로필 이미지로 동기화
  const { data: profile, isLoading, error, refetch } = useProfile();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { mutateAsync: uploadProfileImage } = useUploadProfileImage();
  useEffect(() => {
    if (profile?.profile_image) {
      setProfileImage(profile.profile_image);
    } else if (user?.image_url) {
      setProfileImage(user.image_url);
    }
  }, [profile?.profile_image, user?.image_url]);

  // 상태 추가
  const [nickname, setNickname] = useState(profile?.nickname || '');
  const [gender, setGender] = useState<string | null>(profile?.gender ?? null);
  const [age, setAge] = useState<string | null>(profile?.birth_year ? String(profile.birth_year) : null);
  const [mbti, setMbti] = useState<string | null>(profile?.mbti ?? null);

  // 닉네임 유효성 검사
  const nicknamevalidity = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,20}$/;
  const isNicknameValid = nicknamevalidity.test(nickname);
  const isLengthValid = nickname.length >= 2 && nickname.length <= 20;
  const isCharsetValid = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]*$/.test(nickname);

  let errorMsg = '';
  if (!isLengthValid && nickname.length > 0) {
    errorMsg = '닉네임은 2~20자여야 합니다.';
  } else if (!isCharsetValid && nickname.length > 0) {
    errorMsg = '닉네임은 한글, 영문, 숫자만 입력 가능합니다.';
  }

  useEffect(() => {
    setNickname(profile?.nickname || '');
    setGender(profile?.gender ?? null);
    setAge(profile?.birth_year ? String(profile.birth_year) : null);
    setMbti(profile?.mbti ?? null);
  }, [profile]);

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
        const selectedImageUri = result.assets[0].uri;
        const uriParts = selectedImageUri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        type RNFile = {
          uri: string;
          type: string;
          name: string;
        };
        const file: RNFile = {
          uri: selectedImageUri,
          type: `image/${fileType}`,
          name: `profile_image.${fileType}`,
        };
        const formData = new FormData();
        formData.append('profile_image', file as any);
        console.log('이미지 FormData:', formData);
        // 아래는 실제 업로드 로직(주석처리)
        // try {
        //   const uploadResult = await uploadProfileImage(selectedImageUri);
        //   setProfileImage(uploadResult.profile_image);
        //   openToast('success', '프로필 변경', '프로필이 변경되었습니다.');
        // } catch (e) {
        //   openToast('error', '변경 실패', '프로필 변경에 실패했어요');
        //   console.error('이미지 업로드 실패:', e);
        // }
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

  // 저장 핸들러
  const handleSave = async () => {
    // 닉네임이 입력되어 있고 유효하지 않은 경우에만 에러 표시
    if (nickname.length > 0 && !isNicknameValid) {
      openToast('error', errorMsg || '닉네임이 너무 짧거나 잘못된 형식이에요!', '한글, 영문, 숫자 2~20자만 입력 가능해요.');
      return;
    }

    try {
      await updateProfile({
        nickname,
        gender: gender || undefined,
        birth_year: age ? Number(age) : undefined,
        mbti: mbti || undefined,
      });
      openToast('success', '저장 완료', '프로필이 저장되었습니다.');
      navigation.goBack();
    } catch (e) {
      openToast('error', '저장 실패', '프로필 저장에 실패했습니다.');
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
    console.log('프로필 에러:', error);
    return <NotFoundPage onRetry={() => refetch()} />;
  }
  return (
    <Layout>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <BackButton color={colors.deepNavy} />
          <Text variant="titleMedium" style={styles.headerTitle}>프로필 수정</Text>
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
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>닉네임</Text>
              <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                placeholder="닉네임을 입력하세요"
                placeholderTextColor={colors.mediumGray}
              />
            </View>
          </Card>
          {!isNicknameValid && nickname.length > 0 && (
            <Text style={styles.errorText}>
              {errorMsg || '닉네임은 한글, 영문, 숫자만 입력 가능합니다.'}
            </Text>
          )}
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>이메일</Text>
              <Text style={styles.emailTextOnly}>{profile?.email || '-'}</Text>
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>성별</Text>
              <CustomDropdown
                items={GENDER_OPTIONS}
                value={gender}
                onSelect={setGender}
                placeholder="성별"
              />
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>연령대</Text>
              <CustomDropdown
                items={AGE_OPTIONS}
                value={age}
                onSelect={setAge}
                placeholder="연령"
              />
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>MBTI</Text>
              <CustomDropdown
                items={MBTI_OPTIONS}
                value={mbti}
                onSelect={setMbti}
                placeholder="MBTI"
              />
            </View>
          </Card>
        </Card>

        <View style={styles.buttonGroup}>
          <Button
            title="저장"
            variant="primary"
            onPress={handleSave}
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
    marginBottom: 24,
  },
  button: {
    width: '100%',
  },
  dropdownContainer: {
    width: '30%',
    alignSelf: 'flex-end',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 2,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    borderRadius: 8,
  },
  dropdownButtonText: {
    color: colors.textColor,
    fontSize: 12,
    flex: 1,
    textAlign: 'right',
  },
  placeholderText: {
    color: colors.mediumGray,
  },
  dropdownArrow: {
    color: colors.mediumGray,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumLightGray,
  },
  modalTitle: {
    color: colors.textColor,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    color: colors.mediumGray,
    padding: 4,
  },
  modalScrollView: {
    maxHeight: 400,
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  selectedItem: {
    backgroundColor: colors.lightGray,
  },
  modalItemText: {
    color: colors.textColor,
  },
  selectedItemText: {
    color: colors.softBlue,
    fontWeight: 'bold',
  },
  input: {
    width: '30%',
    padding: 4,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    borderRadius: 8,
    textAlign: 'right',
  },
  emailTextOnly: {
    color: colors.mediumGray,
    fontSize: 16,
    textAlign: 'right',
    flexShrink: 1,
  },
  errorText: {
    color: colors.softOrange,
    fontSize: 12,
    marginTop: 4,
  },
});