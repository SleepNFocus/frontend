import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileCard = () => {
  return (
    <View style={styles.wrapper}>
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={styles.profileImage}
      />

      <Text style={styles.welcomeText}>
        <Text style={styles.highlight}>반가워요!</Text> TEST 님
      </Text>

      <Text style={styles.trackingText}>
        수면과 집중력을 추적한지 벌써 <Text style={styles.days}>__일째</Text>
      </Text>

      <View style={styles.announceBox}>
        <Text style={styles.announceText}>인지테스트 하러가기</Text>
        <Text style={styles.announceSubText}>(매일 달라지는 유도문구)</Text>
        <Text style={styles.announceSubText}>
          게임 완료 시 이 칸이 없어지거나, 그날의 응원문구로 변경됨
        </Text>
      </View>

      <View style={styles.sleepSummary}>
        <View style={styles.averageBox}>
          <Text style={styles.averageLabel}>총 수면시간</Text>
          <Text style={styles.averageValue}>6시간 40분</Text>
        </View>
        <View style={styles.averageBox}>
          <Text style={styles.averageLabel}>평균 점수</Text>
          <Text style={styles.averageValue}>84점</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.recordBtn}>
        <Text style={styles.recordBtnText}>나의 기록 확인하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 18,
    color: '#F2F2FF',
    fontWeight: '600',
    marginBottom: 4,
  },
  highlight: {
    color: '#BFAFF2',
  },
  trackingText: {
    fontSize: 14,
    color: '#D8D6E8',
    marginBottom: 16,
  },
  days: {
    fontWeight: 'bold',
    color: '#D3C1FF',
  },

  announceBox: {
    backgroundColor: 'rgba(214, 236, 243, 0.1)',
    padding: 12,
    borderRadius: 12,
    borderColor: '#CFE7EF',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
  },
  announceText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 2,
  },
  announceSubText: {
    fontSize: 12,
    color: '#FFFFFF',
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
    fontSize: 14,
    color: '#CFCFFF',
    marginBottom: 6,
  },
  averageValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  recordBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  recordBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
