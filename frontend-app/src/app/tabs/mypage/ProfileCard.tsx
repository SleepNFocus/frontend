import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ViewStyle, TextStyle } from 'react-native';
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
  const user = useAuthStore(state => state.user);
  const { data: profile, refetch } = useProfile();
  const { data: mypageMain } = useMypageMain();

  // 화면이 포커스될 때마다 프로필 데이터 새로 가져오기
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  // API 데이터를 우선 사용하고, 없으면 로컬 user 데이터 사용
  const displayName = profile?.nickname || user?.nickname || '-';
  const displayImage = profile?.profile_image || user?.image_url || 'https://via.placeholder.com/100';

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
        source={{ uri: displayImage }}
        style={styles.profileImage}
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
        <TouchableOpacity onPress={() => tabNavigation.navigate('SleepRecord')}>
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
