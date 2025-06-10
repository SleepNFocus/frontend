import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import NicknameChangeModal from './NicknameChangeModal';
import { useAuthStore } from '@/store/authStore';
import { Card } from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { colors } from '@/constants/colors';

const ProfileCard = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const user = useAuthStore(state => state.user);
  const nickname = user?.nickname ?? '-';
  const [modalVisible, setModalVisible] = useState(false);

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

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text variant="titleMedium" style={styles.welcomeText}>
          <Text style={styles.highlight}>반가워요!</Text> {nickname} 님
        </Text>
      </TouchableOpacity>

      <Text variant="bodyMedium" style={styles.trackingText}>
        수면과 집중력을 추적한지 벌써 <Text style={styles.days}>__일째</Text>
      </Text>

      <View style={styles.announceBox}>
        <Text variant="titleSmall" style={styles.announceText}>인지테스트 하러가기</Text>
        <Text variant="bodySmall" style={styles.announceSubText}>(매일 달라지는 유도문구)</Text>
        <Text variant="bodySmall" style={styles.announceSubText}>
          게임 완료 시 이 칸이 없어지거나, 그날의 응원문구로 변경됨
        </Text>
      </View>

      <View style={styles.sleepSummary}>
        <View style={styles.averageBox}>
          <Text variant="bodyMedium" style={styles.averageLabel}>총 수면시간</Text>
          <Text variant="titleMedium" style={styles.averageValue}>6시간 40분</Text>
        </View>
        <View style={styles.averageBox}>
          <Text variant="bodyMedium" style={styles.averageLabel}>평균 점수</Text>
          <Text variant="titleMedium" style={styles.averageValue}>84점</Text>
        </View>
      </View>

      <NicknameChangeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </Card>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.lightGray,
    padding: 24,
    alignItems: 'center',
    borderColor: colors.mediumLightGray,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    marginBottom: 16,
  },
  welcomeText: {
    color: colors.textColor,
    marginBottom: 4,
  },
  highlight: {
    color: colors.softBlue,
  },
  trackingText: {
    color: colors.textColor,
    marginBottom: 16,
  },
  days: {
    fontWeight: 'bold',
    color: colors.softBlue,
  },
  announceBox: {
    backgroundColor: colors.lightGray,
    padding: 12,
    borderRadius: 12,
    borderColor: colors.softBlue,
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
  },
  announceText: {
    color: colors.textColor,
    textAlign: 'center',
    marginBottom: 2,
  },
  announceSubText: {
    color: colors.textColor,
    textAlign: 'center',
  },
  sleepSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  averageBox: {
    flex: 1,
    alignItems: 'center',
  },
  averageLabel: {
    color: colors.textColor,
    marginBottom: 6,
  },
  averageValue: {
    color: colors.textColor,
  },
  recordBtn: {
    backgroundColor: colors.lightGray,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
});
