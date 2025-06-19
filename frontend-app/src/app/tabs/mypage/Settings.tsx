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

// 연령대를 출생년도로 변환하는 함수
const getBirthYearFromAgeGroup = (ageGroup: string): number | null => {
  const currentYear = new Date().getFullYear();
  
  switch (ageGroup) {
    case '10s':
      return currentYear - 15; // 10대 중간값
    case '20s':
      return currentYear - 25; // 20대 중간값
    case '30s':
      return currentYear - 35; // 30대 중간값
    case '40s':
      return currentYear - 45; // 40대 중간값
    case '50s+':
      return currentYear - 55; // 50대 중간값
    default:
      return null;
  }
};

// 출생년도를 연령대로 변환하는 함수
const getAgeGroupFromBirthYear = (birthYear: number): string | null => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  
  if (age >= 10 && age < 20) return '10s';
  if (age >= 20 && age < 30) return '20s';
  if (age >= 30 && age < 40) return '30s';
  if (age >= 40 && age < 50) return '40s';
  if (age >= 50) return '50s+';
  
  return null;
};

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
  
  // 디버깅용 로그 - Settings 프로필 데이터
  console.log('=== Settings 디버깅 ===');
  console.log('profile 데이터:', profile);
  console.log('isLoading:', isLoading);
  console.log('error:', error);
  console.log('profile?.nickname:', profile?.nickname);
  console.log('profile?.email:', profile?.email);
  console.log('profile?.gender:', profile?.gender);
  console.log('profile?.birth_year:', profile?.birth_year);
  console.log('profile?.mbti:', profile?.mbti);
  console.log('profile?.profile_img:', profile?.profile_img);
  
  useEffect(() => {
    if (profile?.profile_img) {
      setProfileImage(profile.profile_img);
    } else if (user?.image_url) {
      setProfileImage(user.image_url);
    }
  }, [profile?.profile_img, user?.image_url]);

  // profileImage 상태 변경 추적
  useEffect(() => {
    console.log('=== profileImage 상태 변경 ===');
    console.log('새로운 profileImage 값:', profileImage);
  }, [profileImage]);

  // 상태 추가
  const [nickname, setNickname] = useState(profile?.nickname || '');
  const [gender, setGender] = useState<string | null>(profile?.gender ?? null);
  const [age, setAge] = useState<string | null>(profile?.birth_year ? getAgeGroupFromBirthYear(profile.birth_year) : null);
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
    setAge(profile?.birth_year ? getAgeGroupFromBirthYear(profile.birth_year) : null);
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
        
        // 실제 업로드 로직 활성화
        try {
          console.log('이미지 업로드 시작:', selectedImageUri);
          const uploadResult = await uploadProfileImage(selectedImageUri);
          console.log('이미지 업로드 결과:', uploadResult);
          
          // 백엔드에서 새로운 이미지 URL을 반환하지 않는 경우를 대비해 로컬에서 임시 표시
          if (uploadResult.profile_img && uploadResult.profile_img !== profile?.profile_img) {
            console.log('백엔드에서 새로운 이미지 URL 반환:', uploadResult.profile_img);
            setProfileImage(uploadResult.profile_img);
          } else {
            // 백엔드에서 업데이트된 URL을 반환하지 않으면 선택된 이미지를 임시로 표시
            console.log('백엔드에서 새로운 이미지 URL을 반환하지 않아 로컬 이미지 사용');
            console.log('선택된 이미지 URI:', selectedImageUri);
            console.log('현재 profileImage 상태:', profileImage);
            console.log('설정할 새로운 profileImage:', selectedImageUri);
            setProfileImage(selectedImageUri);
            console.log('profileImage 상태 업데이트 완료');
          }
          
          openToast('success', '프로필 변경', '프로필 이미지가 변경되었습니다.');
        } catch (e) {
          openToast('error', '변경 실패', '프로필 변경에 실패했어요');
          console.error('이미지 업로드 실패:', e);
        }
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

    // 저장할 데이터 준비 (undefined 값 제거)
    const updateData: any = {};
    
    if (nickname && nickname.trim()) {
      updateData.nickname = nickname.trim();
    }
    
    if (gender) {
      updateData.gender = gender;
    }
    
    if (age) {
      const birthYear = getBirthYearFromAgeGroup(age);
      if (birthYear) {
        updateData.birth_year = birthYear;
      }
    }
    
    if (mbti) {
      updateData.mbti = mbti;
    }

    // 디버깅용 로그 - 저장할 데이터
    console.log('=== Settings 저장 디버깅 ===');
    console.log('원본 데이터:', { nickname, gender, age, mbti });
    console.log('정제된 저장 데이터:', updateData);
    console.log('birth_year 타입:', typeof updateData.birth_year);

    try {
      await updateProfile(updateData);
      console.log('프로필 업데이트 성공');
      openToast('success', '저장 완료', '프로필이 저장되었습니다.');
      navigation.goBack();
    } catch (e) {
      console.error('프로필 업데이트 실패:', e);
      openToast('error', '저장 실패', '프로필 저장에 실패했습니다.');
    }
  };

  // 이미지 URL 처리: ProfileCard와 동일한 로직
  const processImageUrl = (url: string | null | undefined): any => {
    console.log('=== processImageUrl 디버깅 ===');
    console.log('입력된 URL:', url);
    
    if (!url) {
      console.log('URL이 없어서 기본 이미지 반환');
      return require('@/assets/profile.png');
    }
    
    try {
      // 로컬 파일 URI인지 확인
      if (url.startsWith('file://')) {
        console.log('로컬 파일 URI 감지:', url);
        return { uri: url };
      }
      
      // URL 디코딩
      const decodedUrl = decodeURIComponent(url);
      console.log('디코딩된 URL:', decodedUrl);
      
      // 카카오 이미지 URL이 포함되어 있는지 확인
      if (decodedUrl.includes('k.kakaocdn.net')) {
        // 잘못 디코딩된 http:/ 부분을 http://로 수정
        let fixedUrl = decodedUrl.replace('http:/', 'http://');
        
        // URL에서 k.kakaocdn.net 부분 찾기
        const kakaoDomainIndex = fixedUrl.indexOf('k.kakaocdn.net');
        
        if (kakaoDomainIndex !== -1) {
          // k.kakaocdn.net부터 시작하는 부분 추출
          const kakaoUrl = fixedUrl.substring(kakaoDomainIndex - 8); // 'https://' 부분 포함
          
          // URL이 올바른 형식인지 확인하고 수정
          if (kakaoUrl.startsWith('/http://')) {
            const correctedUrl = kakaoUrl.substring(1); // 앞의 '/' 제거
            console.log('카카오 URL 수정됨:', correctedUrl);
            return { uri: correctedUrl };
          } else if (kakaoUrl.startsWith('https://')) {
            console.log('카카오 URL 그대로 사용:', kakaoUrl);
            return { uri: kakaoUrl };
          } else {
            console.log('예상치 못한 카카오 URL 형식:', kakaoUrl);
            return require('@/assets/profile.png');
          }
        }
      }
      
      // 일반적인 이미지 URL인 경우 그대로 사용
      if (decodedUrl.startsWith('http')) {
        console.log('일반 HTTP URL 사용:', decodedUrl);
        return { uri: decodedUrl };
      }
      
      console.log('기본 이미지 사용');
      return require('@/assets/profile.png');
    } catch (error) {
      console.log('URL 처리 에러:', error);
      return require('@/assets/profile.png');
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
                source={processImageUrl(profileImage)}
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
                value={age ? String(age) : ''}
                onSelect={(value) => setAge(value)}
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