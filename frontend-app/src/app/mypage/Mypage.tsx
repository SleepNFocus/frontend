import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '@/components/common/Navbar';
import ProfileCard from './ProfileCard';
// import ProfileEdit from './Profile';
// import Settings from './Settings';
// import Records from './Records';

const MyPage = () => {
  return (
    <LinearGradient
      colors={['#0D0D2B', '#1C1C40', '#34346A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 80,
          gap: 24,
          flexGrow: 1,
        }}
      >
        <Navbar />

        <ProfileCard />

        <View style={styles.card}>
          <Text style={styles.title}>데이터 관리</Text>
          <Text style={styles.subText}>기록 보기 / 테스트 결과 등 요약</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>정보</Text>

          <View style={styles.linkGroup}>
            <Text style={styles.subText}>개인정보처리방침</Text>
            <Text style={styles.subText}>서비스 이용약관</Text>
            <Text style={styles.subText}>문의 하기</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutBtnText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80,
    gap: 24,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
  linkGroup: {
    marginTop: 12,
  },
  logoutBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
