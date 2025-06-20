import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, 
  // ViewStyle, TextStyle
 } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '@/App';
import { Text } from '@/components/common/Text';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/common/Button';
import { useProfile, useMypageMain } from '@/services/mypageApi';
import { useFocusEffect } from '@react-navigation/native';

const ProfileCard = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<any>>();
  console.log(tabNavigation);
  const user = useAuthStore(state => state.user);
  const { data: profile, refetch: refetchProfile } = useProfile();
  const { data: mypageMain, refetch: refetchMypageMain } = useMypageMain();

  // 화면이 포커스될 때마다 프로필 데이터 새로 가져오기
  useFocusEffect(
    React.useCallback(() => {
      console.log('=== ProfileCard 포커스됨, 데이터 새로고침 ===');
      refetchProfile();
      refetchMypageMain();
    }, [refetchProfile, refetchMypageMain])
  );

  // profile 데이터가 변경될 때마다 로그를 출력하여 리프레시 확인
  useEffect(() => {
    console.log('--- ProfileCard.tsx: profile 데이터 변경 감지 (useEffect) ---');
    console.log('업데이트된 profile.profile_img:', profile?.profile_img);
  }, [profile]);

  // API 데이터를 우선 사용하고, 없으면 로컬 user 데이터 사용
  const displayName = profile?.nickname || user?.nickname || '-';
  
  // 이미지 URL 처리: URL 디코딩 후 카카오 이미지 URL 추출
  const processImageUrl = (url: string | null | undefined): any => {
    console.log('=== processImageUrl 디버깅 ===');
    console.log('입력된 URL:', url);
    
    if (!url) {
      console.log('URL이 없어서 기본 이미지 반환');
      return require('@/assets/icon.png');
    }
    
    try {
      const decodedUrl = decodeURIComponent(url);
      console.log('디코딩된 URL:', decodedUrl);

      // 중첩된 URL 구조 처리: dev.focusz.site/media/http:/k.kakaocdn.net/... 형태
      if (decodedUrl.includes('/media/http:/') || decodedUrl.includes('/media/https:/')) {
        // /media/ 다음의 URL 부분을 추출
        const mediaIndex = decodedUrl.indexOf('/media/');
        if (mediaIndex !== -1) {
          const afterMedia = decodedUrl.substring(mediaIndex + 7); // '/media/' 제거
          console.log('media 이후 부분:', afterMedia);
          
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
            console.log('추출된 실제 URL:', actualUrl);
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
        console.log('추출된 최종 URL:', targetUrl);
        // 캐싱 방지를 위한 타임스탬프와 랜덤 값 추가
        const randomParam = Math.random().toString(36).substring(7);
        return { uri: `${targetUrl}?t=${Date.now()}&r=${randomParam}` };
      }

      // 로컬 파일 URI인지 확인
      if (url.startsWith('file://')) {
        console.log('로컬 파일 URI 감지:', url);
        return { uri: url };
      }
      
      console.log('기본 이미지 사용');
      return require('@/assets/icon.png');
    } catch (error) {
      console.log('URL 처리 에러:', error);
      return require('@/assets/icon.png');
    }
  };
  
  const displayImageSource = processImageUrl(profile?.profile_img || user?.image_url);

  // tracking_days가 없거나 undefined면 1로 표시
  const trackingDays = mypageMain?.tracking_days || 1;

  return (
    <Card style={styles.wrapper}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail')}>
          <MaterialCommunityIcons
            name="account-outline"
            size={24}
            color={colors.textColor}
          />
        </TouchableOpacity>
      </View>

      <Image
        key={profile?.profile_img || user?.image_url}
        source={displayImageSource}
        style={styles.profileImage}
        resizeMode="cover"
      />

      <Text variant="titleMedium" style={styles.welcomeText}>
        <Text variant="titleMedium" style={styles.highlight}>
          반가워요!
        </Text>{' '}
        {displayName} 님
      </Text>

      <Text variant="bodyMedium" style={styles.trackingText}>
        수면과 집중력을 추적한지 벌써{' '}
        <Text variant="bodyMedium" style={styles.days}>
          {trackingDays}일째
        </Text>
      </Text>

      <Card style={styles.announceBox}>
        <TouchableOpacity onPress={() => navigation.navigate('SleepTestMain')}>
          <Text variant="titleSmall" style={styles.announceText}>
            인지테스트 하러가기
          </Text>
        </TouchableOpacity>
        <Text variant="bodySmall" style={styles.announceSubText}>
          (매일 달라지는 유도문구)
        </Text>
        <Text variant="bodySmall" style={styles.announceSubText}>
          게임 완료 시 이 칸이 없어지거나, 그날의 응원문구로 변경됨
        </Text>
      </Card>

      <Card style={styles.sleepSummary}>
        <View style={styles.averageBox}>
          <Text variant="bodyMedium" style={styles.averageLabel}>
            총 수면시간
          </Text>
          <Text variant="titleMedium" style={styles.averageValue}>
            {mypageMain?.total_sleep_hours ?? '-'}시간
          </Text>
        </View>
        <View style={styles.averageBox}>
          <Text variant="bodyMedium" style={styles.averageLabel}>
            평균 점수
          </Text>
          <Text variant="titleMedium" style={styles.averageValue}>
            {mypageMain?.average_sleep_score ?? '-'}점
          </Text>
        </View>
      </Card>

      <Button
        title="나의 기록 보기"
        onPress={() => navigation.navigate('History')}
        variant="outline"
        style={styles.recordButton}
      />
    </Card>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
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
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.softBlue,
  },
  welcomeText: {
    color: colors.textColor,
    marginBottom: 8,
    textAlign: 'center',
  },
  highlight: {
    color: colors.softBlue,
    fontWeight: 'bold',
  },
  trackingText: {
    color: colors.textColor,
    marginBottom: 20,
    textAlign: 'center',
  },
  days: {
    fontWeight: 'bold',
    color: colors.softBlue,
  },
  announceBox: {
    backgroundColor: colors.white,
    padding: 16,
    borderColor: colors.softBlue,
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  announceText: {
    color: colors.textColor,
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  announceSubText: {
    color: colors.mediumGray,
    textAlign: 'center',
    fontSize: 12,
  },
  sleepSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    backgroundColor: colors.white,
    padding: 16,
    borderColor: colors.softBlue,
    borderWidth: 1,
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  averageBox: {
    flex: 1,
    alignItems: 'center',
  },
  averageLabel: {
    color: colors.softBlue,
    marginBottom: 10,
    fontSize: 14,
  },
  averageValue: {
    color: colors.textColor,
    fontWeight: 'bold',
  },
  recordButton: {
    width: '100%',
    marginTop: 8,
  },
});
