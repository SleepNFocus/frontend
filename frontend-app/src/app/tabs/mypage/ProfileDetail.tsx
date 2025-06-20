import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { BackButton } from '@/components/common/BackButton';
import { Text } from '@/components/common/Text';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/colors';
import { Layout } from '@/components/common/Layout';
import { useProfile } from '@/services/mypageApi';
import { NotFoundPage } from '@/components/common/NotFoundPage';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '@/components/common/Button';
import useUiStore from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { logoutUser } from '@/app/auth/logout';
import { withdrawUser } from '@/app/auth/withdraw';
import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';

const ProfileDetail = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { openToast } = useUiStore();
  const { resetAuth } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error, refetch } = useProfile();

  // 화면이 포커스될 때마다 프로필 데이터 새로 가져오기
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  // profile 데이터가 변경될 때마다 로그를 출력하여 리프레시 확인
  useEffect(() => {
  }, [profile]);

  // 이미지 URL 처리: ProfileCard와 동일한 로직
  const processImageUrl = (url: string | null | undefined): any => {
    
    if (!url) {
      return require('@/assets/icon.png');
    }
    
    try {
      const decodedUrl = decodeURIComponent(url);

      // 중첩된 URL 구조 처리: dev.focusz.site/media/http:/k.kakaocdn.net/... 형태
      if (decodedUrl.includes('/media/http:/') || decodedUrl.includes('/media/https:/')) {
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
            actualUrl = actualUrl.replace('http:/', 'http://').replace('https:/', 'https://');
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
        const nestedUrl = extractedUrls.find(u => u.startsWith('http') && decodedUrl.includes(`/media/${u}`));
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

  const processedImageSource = processImageUrl(profile?.profile_img);

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      openToast('success', '로그아웃 완료', '로그아웃 되었습니다.');
      queryClient.clear();
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
      queryClient.clear();
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
          <Text variant="titleMedium" style={styles.headerTitle}>프로필 상세정보</Text>
          <View style={{ width: 30 }} />
        </View>

        <Card style={styles.wrapper}>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.8}
          >
            <Ionicons name="settings-outline" size={24} color={colors.textColor} />
          </TouchableOpacity>

          <View style={styles.profileContainer}>
            <View style={styles.profileImageBox}>
              <View style={styles.profileImageWrapper}>
                <Image
                  key={profile?.profile_img}
                  source={processedImageSource}
                  style={styles.profileImage}
                />
              </View>
            </View>

            <Card style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>닉네임</Text>
                <View style={styles.valueRow}>
                  <Text style={styles.value}>{profile?.nickname ?? '-'}</Text>
                </View>
              </View>
            </Card>
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
                <Text style={styles.label}>연령대</Text>
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
                <Text style={styles.label}>인지 유형</Text>
                <View style={styles.valueRow}>
                  <Text style={styles.value}>
                    {profile?.cognitive_type_label ?? profile?.cognitive_type_out ?? '-'}
                  </Text>
                </View>
              </View>
            </Card>
            <Card style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>업무 시간 패턴</Text>
                <View style={styles.valueRow}>
                  <Text style={styles.value}>
                    {profile?.work_time_pattern_label ?? profile?.work_time_pattern_out ?? '-'}
                  </Text>
                </View>
              </View>
            </Card>
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
      </ScrollView>
    </Layout>
  );
};

export default ProfileDetail;

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
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: {
    color: colors.deepNavy,
    marginLeft: 10,
    flex: 1,
    textAlign: 'left',
  },
  wrapper: {
    padding: 24,
    alignItems: 'center',
    borderColor: colors.mediumLightGray,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  settingsButton: {
    position: 'absolute',
    right: 24,
    top: 24,
    padding: 8,
    zIndex: 2,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
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
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.softBlue,
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
  buttonGroup: {
    gap: 12,
    marginTop: 12,
    marginBottom: 24,
  },
  button: {
    width: '100%',
  },
}); 