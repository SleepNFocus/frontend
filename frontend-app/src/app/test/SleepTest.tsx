import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/common/Button';
import { colors } from '@/constants/colors';
import { RootStackParamList } from '@/App';
import { useEffect, useRef } from 'react';

export default function SleepTestDesc() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { width: windowWidth } = useWindowDimensions();
  const containerWidth = Math.min(windowWidth * 0.9, 700);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim]);

  function goToSleepTest1Desc() {
    navigation.navigate('SleepTest1Desc');
  }

  return (
    <LinearGradient
      colors={[colors.softBlue, colors.white]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.root}>
        <Image
          source={require('@/assets/focuz_name_logo.png')}
          style={styles.nameLogoImage}
        />
        <View style={[styles.container, { width: containerWidth }]}>
          <Text style={styles.title}> 현재 인지 능력 측정하기 </Text>
          <View style={styles.imageContainer}>
            <Text style={styles.description}>
              이제 당신의 현재 인지 능력을 파악하기 위한
              {`\n`}
              3가지 게임을 진행합니다.
              {`\n`}
              {`\n`}
              평소 플레이하는 것과 동일한 버전이며,
              {`\n`}
              완료까지 약 10~15분 이상 소요될 수 있습니다.
            </Text>
            <Animated.Image
              source={require('@/assets/focuz_logo1.png')}
              style={[styles.logoImage, { transform: [{ scale: scaleAnim }] }]}
            />
          </View>
          <Text style={styles.subTitle}>
            집중할 수 있는 조용한 환경에서 시작해 주시기 바랍니다.
          </Text>
          <Button
            title="측정 시작하기"
            variant="secondary"
            style={styles.button}
            onPress={goToSleepTest1Desc}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    gap: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    marginBottom: 24,
    color: '#0F1C36',
    textAlign: 'center',
    textShadowColor: '#70707050',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 15,
    marginBottom: 24,
    color: colors.textColor,
    textAlign: 'center',
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 24,
    color: '#0F1C36',
    textAlign: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 150,
  },
  nameLogoImage: {
    width: 100,
    height: 20,
    marginBottom: 40,
  },
  button: {
    width: 130,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#3F4F80',
    alignItems: 'center',
    shadowColor: '#909090',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});
