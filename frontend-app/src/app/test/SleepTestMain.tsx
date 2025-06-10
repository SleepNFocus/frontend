import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/common/Button';
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
      colors={[colors.lightGray, colors.white]}
      style={styles.root}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.mainBox}>
        <Text style={styles.title}> Focuz </Text>
        <View style={styles.btnBox}>
          <Text style={styles.mainText}> 수면 테스트를 진행합니다. </Text>
          <Button
            title="테스트 시작하기"
            variant="outline"
            style={styles.button}
            onPress={goToSleepTestDesc}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
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
  title: {
    color: colors.softBlue,
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 16,
    letterSpacing: 1,
    textAlign: 'center',
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 24,
    color: colors.textColor,
    textAlign: 'center',
  },
  button: {
    width: 170,
  },
});
