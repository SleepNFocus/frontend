import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Layout } from '@/components/common/Layout';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { colors } from '@/constants/colors';
import { RootStackParamList } from '@/App';

interface NotFoundPageProps {
  onRetry?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onRetry }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleGoHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // 기본 재시도 동작: 현재 화면 새로고침
      navigation.goBack();
    }
  };

  return (
    <Layout showLogo={false}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name="alert-circle-outline" 
            size={80} 
            color={colors.mediumGray} 
          />
        </View>
        
        <View style={styles.textContainer}>
          <Text variant="displayMedium" style={styles.title}>
            404
          </Text>
          <Text variant="headlineSmall" style={styles.subtitle}>
            페이지를 찾을 수 없습니다
          </Text>
          <Text variant="bodyLarge" style={styles.message}>
            요청하신 페이지가 존재하지 않거나{'\n'}
            일시적으로 사용할 수 없습니다.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="재시도"
            variant="outline"
            onPress={handleRetry}
            style={styles.retryButton}
          />
          <Button
            title="홈으로 돌아가기"
            variant="primary"
            onPress={handleGoHome}
            style={styles.homeButton}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 32,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    color: colors.mediumGray,
    marginBottom: 8,
  },
  subtitle: {
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    color: colors.mediumGray,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 12,
  },
  retryButton: {
    borderColor: colors.softBlue,
  },
  homeButton: {
    backgroundColor: colors.softBlue,
  },
}); 