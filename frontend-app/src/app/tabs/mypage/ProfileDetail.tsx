import React from 'react';
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

const ProfileDetail = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { openToast } = useUiStore();
  const { resetAuth } = useAuthStore();

  const { data: profile, isLoading, error, refetch } = useProfile();

  // 화면이 포커스될 때마다 프로필 데이터 새로 가져오기
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  // 디버깅용 로그 - 프로필 상세 정보
  console.log('=== ProfileDetail 디버깅 ===');
  console.log('profile 데이터:', profile);
  console.log('isLoading:', isLoading);
  console.log('error:', error);
  console.log('profile?.nickname:', profile?.nickname);
  console.log('profile?.email:', profile?.email);
  console.log('profile?.gender:', profile?.gender);
  console.log('profile?.birth_year:', profile?.birth_year);
  console.log('profile?.mbti:', profile?.mbti);
  console.log('profile?.profile_img:', profile?.profile_img);

  // 이미지 URL 처리: ProfileCard와 동일한 로직
  const processImageUrl = (url: string | null | undefined): any => {
    if (!url) return require('@/assets/profile.png');
    
    try {
      // URL 디코딩
      const decodedUrl = decodeURIComponent(url);
      
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
            return { uri: correctedUrl };
          } else if (kakaoUrl.startsWith('https://')) {
            return { uri: kakaoUrl };
          } else {
            return require('@/assets/profile.png');
          }
        }
      }
      
      // 일반적인 이미지 URL인 경우 그대로 사용
      if (decodedUrl.startsWith('http')) {
        return { uri: decodedUrl };
      }
      
      return require('@/assets/profile.png');
    } catch (error) {
      return require('@/assets/profile.png');
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
    console.log('프로필 에러:', error);
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
                  source={processImageUrl(profile?.profile_img)}
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