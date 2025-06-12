import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/constants/colors';
import ProfileCard from './ProfileCard';
import { Layout } from '@/components/common/Layout';
import { Card } from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';

const MyPage = () => {
  const navigation = useNavigation();

  const handleNavigate = (route: string) => {
    navigation.navigate(route as never);
  };

  return (
    <Layout>
      <ProfileCard />

      <Card style={styles.infoCard}>
        <Text variant="titleMedium" style={styles.title}>정보</Text>
        <Button
          title="개인정보처리방침"
          variant="outline"
          onPress={() => {}}
          style={styles.menuItem}
        />
        <Button
          title="서비스 이용약관"
          variant="outline"
          onPress={() => {}}
          style={styles.menuItem}
        />
        <Button
          title="문의 하기"
          variant="outline"
          onPress={() => {}}
          style={styles.menuItem}
        />
      </Card>

      <Button
        title="로그아웃"
        variant="primary"
        onPress={() => handleNavigate('SocialLogin')}
        style={styles.logoutBtn}
      />
    </Layout>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  infoCard: {
    marginBottom: 24,
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
    marginBottom: 16,
  },
  menuItem: {
    marginBottom: 12,
  },
  logoutBtn: {
    marginTop: 24,
    marginBottom: 16,
    alignSelf: 'center',
    width: '100%',
  },
});
