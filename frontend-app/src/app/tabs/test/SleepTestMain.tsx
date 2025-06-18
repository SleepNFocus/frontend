import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '@/components/common/Layout';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/common/Text';
import { RootStackParamList } from '@/App';
import { useEffect } from 'react';

export default function SleepTestMain() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigation.navigate('SleepTestDesc');
    }, 2000);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <Layout showLogo={false}>
      <View style={styles.mainBox}>
        <Text variant="displayMedium" style={styles.title}>
          FOCUZ
        </Text>
        <Text variant="displayMedium" style={styles.mainText}>
          수면 테스트를 진행합니다.
        </Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  mainBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 24,
    color: '#3F4F80',
    textAlign: 'center',
    // textShadow 효과 제거 (deprecated 경고 해결)
  },
});