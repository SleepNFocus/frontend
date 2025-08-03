import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
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
import { useSleepRecordList } from '@/services/recordListApi';
import { DayRecord } from '@/types/history';

const ProfileCard = () => {

  
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<any>>();
  const { isLogin, user } = useAuthStore();
  const { data: profile, refetch: refetchProfile } = useProfile();
  const { data: mypageMain, refetch: refetchMypageMain } = useMypageMain();
  const now = new Date();
const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
const today = kst.toISOString().slice(0, 10);

  useFocusEffect(
    useCallback(() => {
      refetchMypageMain();
      refetchProfile();
    }, [refetchMypageMain, refetchProfile])
  );

  const { data: dayRecordData } = useSleepRecordList('day');
  const hasTodayRecord = (dayRecordData?.results as DayRecord[])?.some(
    item => item.date === today,
  );

  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

  useEffect(() => {
      if (profile?.profile_img) {
        if (profile.profile_img.startsWith('http')) {
          setProfileImageUri(profile.profile_img);
        }
      }
    }, [profile]);

  // API 데이터를 우선 사용하고, 없으면 로컬 user 데이터 사용
  const displayName = profile?.nickname || user?.nickname || '-';

  // tracking_days가 없거나 undefined면 1로 표시
  const trackingDays =
    mypageMain?.tracking_days != null && mypageMain.tracking_days > 1
      ? mypageMain.tracking_days - 1
      : 1;

  const imageSource = useMemo(() => {
    return profile?.profile_img
      ? { uri: profile.profile_img }
      : require('@/assets/icon.png');
  }, [profileImageUri]);


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
        // key={profile?.profile_img || user?.image_url}
        // source={user?.image_url ? { uri: user.image_url } : require('@/assets/icon.png')}
        source={imageSource}
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

      {!hasTodayRecord && (
        <Card style={styles.announceBox}>
          <View>
            <Text variant="titleMedium" style={styles.announceText}>
              오늘의 인지테스트
            </Text>
          </View>
          <Text variant="bodySmall" style={styles.announceSubText}>
            당신의 뇌는 얼마나 깨어있을까요?
          </Text>
          <Text variant="bodySmall" style={styles.announceSubText}>
            테스트로 확인해보세요!
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SleepTestMain')}
            style={styles.testButton}
          >
            <Text style={styles.testButtonText}>인지테스트 하러가기</Text>
          </TouchableOpacity>
        </Card>
      )}

      <Card style={styles.sleepSummary}>
        <Text variant='titleMedium'> 나의 누적 수면 요약 </Text>
        <View style={styles.sleepSummary1}>
        <View style={styles.averageBox}>
          <Text variant="bodyMedium" style={styles.averageLabel}>
            수면시간
          </Text>
          <Text variant="titleMedium" style={styles.averageValue}>
            {mypageMain?.total_sleep_hours ?? '-'}시간
          </Text>
        </View>
        <View style={styles.averageBox}>
          <Text variant="bodyMedium" style={styles.averageLabel}>
            수면 점수
          </Text>
          <Text variant="titleMedium" style={styles.averageValue}>
            {mypageMain?.average_sleep_score != null
              ? Math.floor(mypageMain.average_sleep_score) + '점'
              : '-'}
          </Text>
        </View>
        <View style={styles.averageBox}>
          <Text variant="bodyMedium" style={styles.averageLabel}>
            인지 점수
          </Text>
          <Text variant="titleMedium" style={styles.averageValue}>
            {mypageMain?.average_cognitive_score != null
              ? Math.floor(mypageMain.average_cognitive_score) + '점'
              : '-'}
          </Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  announceText: {
    color: colors.textColor,
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  announceSubText: {
    // color: colors.mediumGray,
    textAlign: 'center',
    fontSize: 12,
  },
  sleepSummary: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    gap: 20
  },
  sleepSummary1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  testButton: {
    backgroundColor: colors.softBlue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: 200,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
