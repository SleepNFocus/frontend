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

      <Card>
        <Text variant="titleMedium" style={styles.title}>데이터 관리</Text>
        <Button
          title="설정"
          variant="outline"
          onPress={() => handleNavigate('Settings')}
          style={styles.menuItem}
        />
      </Card>

      <Card>
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
  title: {
    color: colors.deepNavy,
    marginBottom: 10,
  },
  menuItem: {
    marginBottom: 8,
  },
  logoutBtn: {
    marginTop: 12,
    alignSelf: 'center',
  },
});
