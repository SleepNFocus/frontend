import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  StyleProp,
  ViewStyle,
} from 'react-native';
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
import { logoutUser } from '@/utils/auth/logout';
import { withdrawUser } from '@/utils/auth/withdraw';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProfile, useUpdateProfile } from '@/services/mypageApi';
import { NotFoundPage } from '@/components/common/NotFoundPage';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  GENDER_OPTIONS,
  BIRTH_YEAR_OPTIONS,
  MBTI_OPTIONS,
  COGNITIVE_TYPE_OPTIONS,
  WORK_TIME_OPTIONS,
} from '@/constants/constants';

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
  style?: StyleProp<ViewStyle>;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  items,
  value,
  onSelect,
  placeholder,
  style,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const selectedItem = items.find(item => item.value === value);

  return (
    <View style={[styles.dropdownContainer, style]}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsVisible(true)}
      >
        <Text
          style={
            !selectedItem
              ? {
                  ...styles.dropdownButtonText,
                  ...styles.placeholderText,
                  textAlign: 'right',
                }
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
              {items.map(item => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.modalItem,
                    value === item.value && styles.selectedItem,
                  ]}
                  onPress={() => {
                    onSelect(item.value);
                    setIsVisible(false);
                  }}
                >
                  <Text
                    style={
                      value === item.value
                        ? {
                            ...styles.modalItemText,
                            ...styles.selectedItemText,
                          }
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

  // API에서 받아온 프로필 이미지로 동기화
  const { data: profile, isLoading, error, refetch } = useProfile();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

  // profile 데이터가 변경될 때마다 로그를 출력하여 리프레시 확인
  useEffect(() => {
    if (profile?.profile_img) {
      if (profile.profile_img.startsWith('http')) {
        setProfileImageUri(profile.profile_img);
      }
    }
  }, [profile]);

  // 상태 추가
  const [nickname, setNickname] = useState(profile?.nickname || '');
  const [gender, setGender] = useState<string | null>(profile?.gender ?? null);
  const [birthYear, setBirthYear] = useState<string | null>(
    profile?.birth_year ? String(profile.birth_year) : null,
  );
  const [mbti, setMbti] = useState<string | null>(profile?.mbti ?? null);
  const [cognitiveType, setCognitiveType] = useState<string | null>(
    profile?.cognitive_type_out ?? null,
  );
  const [workTimePattern, setWorkTimePattern] = useState<string | null>(
    profile?.work_time_pattern_out ?? null,
  );

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
    setBirthYear(profile?.birth_year ? String(profile.birth_year) : null);
    setMbti(profile?.mbti ?? null);
    setCognitiveType(profile?.cognitive_type_out ?? null);
    setWorkTimePattern(profile?.work_time_pattern_out ?? null);
  }, [profile]);

  const handleProfileImageChange = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        openToast(
          'error',
          '권한 필요',
          '이미지 선택을 위해 갤러리 접근 권한이 필요합니다.',
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        setProfileImageUri(selectedImageUri); // 미리보기 URI를 상태에 저장

        // // 서버 업로드 로직 주석 처리
        // try {
        //   await uploadProfileImage(selectedImageUri);

        //   openToast('success', '프로필 변경', '프로필 이미지가 변경되었습니다.');

        //   // 백엔드가 이미지 URL을 업데이트할 시간을 주기 위해 약간의 딜레이 추가
        //   await new Promise(resolve => setTimeout(resolve, 500));

        //   await refetch();

        // } catch (e) {
        //   openToast('error', '변경 실패', '프로필 변경에 실패했어요');
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
      openToast('error', '탈퇴 완료', '계정이 삭제되었습니다.');
      setTimeout(() => {
        resetAuth();
        navigation.reset({
          index: 0,
          routes: [{ name: 'LandingPage' }],
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
      openToast(
        'error',
        errorMsg || '닉네임이 너무 짧거나 잘못된 형식이에요!',
        '한글, 영문, 숫자 2~20자만 입력 가능해요.',
      );
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

    if (birthYear) {
      updateData.birth_year = parseInt(birthYear);
    }

    if (mbti) {
      updateData.mbti = mbti;
    }

    if (cognitiveType) {
      updateData.cognitive_type = cognitiveType;
    }
    if (workTimePattern) {
      updateData.work_time_pattern = workTimePattern;
    }

    // 새 이미지가 선택된 경우, 데이터 객체에 추가
    if (profileImageUri) {
      updateData.profile_image_uri = profileImageUri;
    }

    try {
      // 모든 데이터를 한 번에 전송
      await updateProfile(updateData);

      setProfileImageUri(null); // 전송 후 임시 이미지 URI 초기화

      openToast('success', '저장 완료', '프로필 정보가 저장되었습니다.');
      refetch();
    } catch (e) {
      openToast('error', '저장 실패', '프로필 정보 저장에 실패했습니다.');
      console.error('Save error:', e);
    }
  };

  // 이미지 URL 처리: ProfileCard와 동일한 로직
  const processImageUrl = (url: string | null | undefined): any => {
    if (!url) {
      return require('@/assets/icon.png');
    }

    try {
      const decodedUrl = decodeURIComponent(url);

      // 중첩된 URL 구조 처리: dev.focusz.site/media/http:/k.kakaocdn.net/... 형태
      if (
        decodedUrl.includes('/media/http:/') ||
        decodedUrl.includes('/media/https:/')
      ) {
        // /media/ 다음의 URL 부분을 추출
        const mediaIndex = decodedUrl.indexOf('/media/');
        if (mediaIndex !== -1) {
          const afterMedia = decodedUrl.substring(mediaIndex + 7); // '/media/' 제거

          // http:/ 또는 https:/ 다음의 실제 URL 추출
          const protocolIndex = afterMedia.indexOf('http:/');
          const secureProtocolIndex = afterMedia.indexOf('https:/');

          let actualUrl = '';
          if (secureProtocolIndex !== -1) {
            actualUrl = afterMedia.substring(secureProtocolIndex);
          } else if (protocolIndex !== -1) {
            actualUrl = afterMedia.substring(protocolIndex);
          }

          if (actualUrl) {
            // http:/ -> http:// 로 수정
            actualUrl = actualUrl
              .replace('http:/', 'http://')
              .replace('https:/', 'https://');
            // 더 강력한 캐시 방지를 위해 랜덤 값도 추가
            const randomParam = Math.random().toString(36).substring(7);
            return { uri: `${actualUrl}?t=${Date.now()}&r=${randomParam}` };
          }
        }
      }

      // 정규식을 사용하여 http 또는 https로 시작하는 전체 URL 추출
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const extractedUrls = decodedUrl.match(urlRegex);

      // 카카오 CDN URL을 우선적으로 찾습니다.
      let targetUrl = extractedUrls?.find(u => u.includes('k.kakaocdn.net'));

      // 카카오 URL이 없으면 첫 번째 추출된 URL을 사용합니다.
      if (!targetUrl && extractedUrls && extractedUrls.length > 0) {
        // dev.focusz.site/media/ 다음의 http URL을 찾습니다.
        const nestedUrl = extractedUrls.find(
          u => u.startsWith('http') && decodedUrl.includes(`/media/${u}`),
        );
        if (nestedUrl) {
          targetUrl = nestedUrl;
        } else {
          // 가장 마지막 URL을 사용 (가장 안쪽 URL일 가능성이 높음)
          targetUrl = extractedUrls[extractedUrls.length - 1];
        }
      }

      if (targetUrl) {
        // 캐싱 방지를 위한 타임스탬프와 랜덤 값 추가
        const randomParam = Math.random().toString(36).substring(7);
        return { uri: `${targetUrl}?t=${Date.now()}&r=${randomParam}` };
      }

      // 로컬 파일 URI인지 확인
      if (url.startsWith('file://')) {
        return { uri: url };
      }

      return require('@/assets/icon.png');
    } catch (error) {
      return require('@/assets/icon.png');
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <BackButton color={colors.deepNavy} />
          <Text variant="titleMedium" style={styles.headerTitle}>
            프로필 수정
          </Text>
        </View>
        {/* <Image source={{ uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffocuz-app-3f8f6d71-8a65-423a-afa2-302759104c40/ImagePicker/6e1347b6-c0e6-48a1-8a90-7c39dfede22e.jpeg' }} style={{ width: 200, height: 200 }} /> */}
        <Card style={styles.profileContainer}>
          <TouchableOpacity
            onPress={handleProfileImageChange}
            activeOpacity={0.8}
            style={styles.profileImageBox}
          >
            <View style={styles.profileImageWrapper}>
              <Image
                source={
                  profileImageUri
                    ? { uri: profileImageUri }
                    : processImageUrl(profile?.profile_img) ||
                      require('@/assets/icon.png')
                }
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
              <Text style={styles.label}>출생년도</Text>
              <CustomDropdown
                items={BIRTH_YEAR_OPTIONS}
                value={birthYear}
                onSelect={setBirthYear}
                placeholder="출생년도"
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
          <Card style={styles.infoCard}>
            <View style={styles.infoRowColumn}>
              {' '}
              {/* 새 스타일 */}
              <Text style={styles.label}>인지 유형</Text>
              <CustomDropdown
                items={COGNITIVE_TYPE_OPTIONS}
                value={cognitiveType}
                onSelect={setCognitiveType}
                placeholder="인지 유형"
                style={{ width: '100%' }}
              />
            </View>
          </Card>
          <Card style={styles.infoCard}>
            <View style={styles.infoRowColumn}>
              <Text style={styles.label}>근무 시간 패턴</Text>
              <CustomDropdown
                items={WORK_TIME_OPTIONS}
                value={workTimePattern}
                onSelect={setWorkTimePattern}
                placeholder="근무 시간 패턴"
                style={{ width: '100%' }}
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
    width: '40%', // 기존 30%에서 전체 너비 사용
    alignSelf: 'stretch',
    marginTop: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10, // ✅ 패딩 늘림
    paddingHorizontal: 10, // ✅ 좌우 패딩
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  dropdownButtonText: {
    color: colors.textColor,
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  dropdownArrow: {
    color: colors.mediumGray,
    fontSize: 16,
    paddingLeft: 8, // ✅ 화살표 여유
    paddingRight: 4,
  },
  placeholderText: {
    color: colors.mediumGray,
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
    width: '40%',
    paddingVertical: 10, // 드롭다운 버튼과 패딩 일치
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    borderRadius: 8,
    textAlign: 'right',
    backgroundColor: colors.white,
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
  infoRowColumn: {
    width: '100%',
    flexDirection: 'column',
    gap: 8,
  },
});
