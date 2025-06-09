import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '@/components/common/Layout';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';
import ProfileCard from './mypage/ProfileCard';

export const MorePage: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigate = (route: string) => {
    navigation.navigate(route as never);
  };

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 80,
          gap: 24,
          flexGrow: 1,
        }}
      >
        <ProfileCard />

        <View style={styles.card}>
          <Text style={styles.title}>데이터 관리</Text>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleNavigate('MyRecord')}
          >
            <Text style={styles.subText}>기록 보기</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleNavigate('Settings')}
          >
            <Text style={styles.subText}>설정</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>정보</Text>
          <View style={styles.linkGroup}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.subText}>개인정보처리방침</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.subText}>서비스 이용약관</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.subText}>문의 하기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={() => handleNavigate('SocialLogin')}
        >
          <Text style={styles.logoutBtnText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    color: colors.deepNavy,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    color: colors.midnightBlue,
    fontSize: 14,
    marginBottom: 8,
  },
  linkGroup: {
    marginTop: 12,
  },
  menuItem: {
    paddingVertical: 8,
  },
  logoutBtn: {
    backgroundColor: colors.softBlue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 12,
    alignSelf: 'center',
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
