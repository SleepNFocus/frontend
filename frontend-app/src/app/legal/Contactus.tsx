import React from 'react';
import { View, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Layout } from '@/components/common/Layout';
import { Text } from '@/components/common/Text';
import { BackButton } from '@/components/common/BackButton';
import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from '@/components/common/Card';

export const Contactus: React.FC = () => {
  const email = 'sleep.focuz@gmail.com';

  const handlePressEmail = () => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <Layout showNavbar={false}>
      <View style={styles.header}>
        <BackButton />
        <Text variant="titleLarge" style={styles.headerTitle}>
          문의하기
        </Text>
      </View>

      <View style={styles.centerContainer}>
        <Card style={styles.card}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="email" size={48} color={colors.midnightBlue} />
          </View>

          <Text variant="bodyLarge" style={styles.description}>
            궁금한 점이나 도움이 필요하시면{'\n'}아래 이메일로 문의해주세요.
          </Text>

          <TouchableOpacity onPress={handlePressEmail} activeOpacity={0.7}>
            <Text variant="titleMedium" style={styles.email}>
              {email}
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    borderRadius: 100,
    padding: 16,
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  email: {
    color: colors.deepNavy,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 18,
  },
});
