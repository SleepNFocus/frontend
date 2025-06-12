import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { Text } from '@/components/common/Text';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';

const ProfileCard = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useAuthStore(state => state.user);

  return (
    <Card style={styles.wrapper}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={22} color={colors.mediumGray} />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={styles.profileImage}
      />

      <Text variant="titleMedium" style={styles.welcomeText}>
        <Text variant="titleMedium" style={styles.highlight}>반가워요!</Text> {user?.nickname ?? '-'} 님
      </Text>

      <Text variant="bodyMedium" style={styles.trackingText}>
        수면과 집중력을 추적한지 벌써 <Text variant="bodyMedium" style={styles.days}>__일째</Text>
      </Text>

      <Card style={styles.announceBox}>
        <Text variant="titleSmall" style={styles.announceText}>인지테스트 하러가기</Text>
        <Text variant="bodySmall" style={styles.announceSubText}>(매일 달라지는 유도문구)</Text>
        <Text variant="bodySmall" style={styles.announceSubText}>
          게임 완료 시 이 칸이 없어지거나, 그날의 응원문구로 변경됨
        </Text>
      </Card>

      <Card style={styles.sleepSummary}>
        <View style={styles.averageBox}>
          <Text variant="bodyMedium" style={styles.averageLabel}>총 수면시간</Text>
          <Text variant="titleMedium" style={styles.averageValue}>6시간 40분</Text>
        </View>
        <View style={styles.averageBox}>
          <Text variant="bodyMedium" style={styles.averageLabel}>평균 점수</Text>
          <Text variant="titleMedium" style={styles.averageValue}>84점</Text>
        </View>
      </Card>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    marginBottom: 24,
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
    marginBottom: 24,
    backgroundColor: colors.white,
    padding: 16,
    borderColor: colors.mediumLightGray,
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
    color: colors.mediumGray,
    marginBottom: 8,
    fontSize: 14,
  },
  averageValue: {
    color: colors.textColor,
    fontWeight: 'bold',
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
});
