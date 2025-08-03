import { RootStackParamList } from '@/App';
import LogoAnimation from '@/components/common/LogoAnimation';
import { colors } from '@/constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { View } from 'react-native';
import { Text } from '@/components/common/Text';

export default function LandingPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigation.navigate('IntroCard'); // IntroCard로 이동
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [navigation]);

  return (
    <View style={styles.root}>
      <Image 
        source={require('@/assets/focuz_name_logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text variant="titleLarge" style={styles.subTitle}>
        당신의 잠, 퍼포먼스가 되다.
      </Text>
      <View style={styles.rowBox}>
        <Text variant="titleMedium" style={styles.pointText}>
          서울대학교 의학박사
        </Text>
        <Text variant="titleMedium">이자 </Text>
        <Text variant="titleMedium" style={styles.pointText}>
          뇌과학 전문가
        </Text>
        <Text variant="titleMedium">가 만든 수면 & 생산성 관리 앱입니다.</Text>
      </View>
            <LogoAnimation />
      <Text style={styles.loadingText}>앱을 준비하고 있습니다...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    backgroundColor: '#DFE3EA',
  },
  logo: {
    width: 200,
    height: 60,
  },
  subTitle: {
    fontWeight: 'bold',
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  pointText: {
    fontWeight: 'bold',
    color: colors.midnightBlue,
  },
  loadingText: {
    opacity: 0.4,
  },
});
