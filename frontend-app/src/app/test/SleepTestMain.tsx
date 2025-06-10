import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/common/Button';
import { colors } from '@/constants/colors';
import { RootStackParamList } from '@/App';
import { colors } from '@/constants/colors';

export default function SleepTestMain() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function goToSleepTestDesc() {
    navigation.navigate('SleepTestDesc');
  }

  return (
    <LinearGradient
<<<<<<< HEAD
      colors={[colors.lightGray, colors.white]}
      style={styles.root}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
=======
      colors={[colors.softBlue, colors.white]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
>>>>>>> 7309cd4d (design: 수면 테스트 메인 및 시작 페이지 UI 디자인 수정)
    >
      <View style={styles.mainBox}>
        {/* <Text style={styles.title}> Focuz </Text> */}
        <Image
          source={require('@/assets/focuz_text_logo.png')}
          style={styles.textLogoImage}
        />
        <View style={styles.btnBox}>
          <Text style={styles.mainText}> 수면 테스트를 진행합니다. </Text>
          <Button
            title="시작"
            variant="primary"
            style={styles.button}
            onPress={goToSleepTestDesc}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 70,
  },
  btnBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
<<<<<<< HEAD
  title: {
    color: colors.softBlue,
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 16,
    letterSpacing: 1,
    textAlign: 'center',
  },
=======
  // title: {
  //   color: '#0F1C36',
  //   fontWeight: 'bold',
  //   fontSize: 40,
  //   marginBottom: 16,
  //   letterSpacing: 1,
  //   textAlign: 'center',
  // },
>>>>>>> 7309cd4d (design: 수면 테스트 메인 및 시작 페이지 UI 디자인 수정)
  mainText: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 24,
<<<<<<< HEAD
    color: colors.textColor,
=======
    color: '#3F4F80',
>>>>>>> 7309cd4d (design: 수면 테스트 메인 및 시작 페이지 UI 디자인 수정)
    textAlign: 'center',
    textShadowColor: '#B0B0B0',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 2,
  },
  button: {
    width: 100,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#909090',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  textLogoImage: {
    width: 230,
    height: 60,
  },
});
