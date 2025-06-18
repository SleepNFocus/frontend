import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '@/components/common/Layout';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';
import ProfileCard from './mypage/ProfileCard';
import { Button } from '@/components/common/Button';
import useUiStore from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';

export const MorePage: React.FC = () => {
  const navigation = useNavigation();
  const { openModal, openToast } = useUiStore();
  const { resetAuth } = useAuthStore();

  const handleLogout = () => {
    openToast('success', '로그아웃 완료', '로그아웃 되었습니다.');
    setTimeout(() => {
      resetAuth();
      navigation.navigate('LandingPage' as never);
    }, 3000);
  };

  return (
    <Layout>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard />

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

        <Button
          title="로그아웃"
          onPress={handleLogout}
          variant="primary"
          style={styles.button}
        />
      </ScrollView>
    </Layout>
  );
};

export default MorePage;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 12,
    gap: 12
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
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
    marginBottom: 8,
  },
  subText: {
    color: colors.midnightBlue,
    fontSize: 14,
  },
  linkGroup: {
    marginTop: 8,
  },
  menuItem: {
    paddingVertical: 8,
  },
  button: {
    marginTop: 8,
  },
});
