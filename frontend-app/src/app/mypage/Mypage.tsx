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

        <TouchableOpacity style={styles.footer}>
          <Text style={styles.logout}>로그아웃</Text>
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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EAE9F3',
    marginBottom: 6,
  },
  subText: {
    color: '#C7C5D9',
    fontSize: 14,
  },
  logoutWrapper: {
    alignItems: 'center',
    marginTop: 40,
  },
  logout: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  linkGroup: {
    marginTop: 10,
    gap: 6,
  },

  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
});
