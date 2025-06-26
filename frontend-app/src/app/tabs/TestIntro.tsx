import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Layout } from '@/components/common/Layout';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';
import { GlassCard } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { TouchableOpacity } from 'react-native';
import { RootStackParamList } from '@/App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import WarningText from '@/components/common/WarningText';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TestIntro() {
  const navigation = useNavigation<NavigationProp>();

  const handleKakaoLogin = () => {
    // console.log('카카오 로그인 버튼 클릭');
    navigation.navigate('KakaoLoginWebView');
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <GlassCard style={styles.card}>
          <Text style={styles.heading}>인지 기능 테스트 안내</Text>

          <View style={styles.imageContainer}>
            <Image
              source={require('@/assets/cognitivetest.png')} // 적절한 이미지로 교체 필요
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.paragraph}>
            인지 테스트는 수면과 관련된 인지 기능의 변화를 측정하기 위한
            검사입니다.{'\n'}총 3종의 테스트를 통해 사용자의 주의력, 기억력,
            처리속도를 분석합니다.
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.subheading}>테스트 종류</Text>
            <Text style={styles.paragraph}>
              <Text variant="titleMedium">1.반응 속도 테스트 (SRT)</Text>
              {'\n'}- 자극에 얼마나 빠르게 반응하는지를 측정합니다.{'\n\n'}
              <Text variant="titleMedium">
                2. 기호-숫자 매칭 테스트 (Symbol)
              </Text>
              {'\n'}- 특정 기호에 대응하는 숫자를 빠르게 찾아 입력하는
              테스트입니다.{'\n\n'}
              <Text variant="titleMedium">
                3. 시각 패턴 기억 테스트 (Pattern)
              </Text>
              {'\n'}- 짧은 시간 동안 제시된 패턴을 기억하고, 정확히 재현하는
              능력을 측정합니다.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.subheading}>점수 산정 방식</Text>
            <Text style={styles.paragraph}>
              각 테스트는 정확도와 속도를 기준으로 점수를 산정하며, 세 가지
              결과는 종합 점수로 통합되어 수면 상태와의 상관관계를 분석하는 데
              활용됩니다.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.subheading}>결과 활용</Text>
            <Text style={styles.paragraph}>
              • 테스트 결과는 수면 기록 점수와 함께 통합 분석되어 종합 리포트를
              제공합니다.{'\n'}• 반복 테스트를 통해 인지 기능의 변화를 추적할 수
              있습니다.
            </Text>
          </View>
          <View style={styles.loginTextBox}>
            <Text variant="titleMedium" style={styles.loginText}>
              {' '}
              로그인하여 시작해보세요 !{' '}
            </Text>
          </View>
          <View style={styles.socialButtonColumn}>
            <TouchableOpacity
              onPress={handleKakaoLogin}
              activeOpacity={0.8}
              style={styles.kakaoButton}
            >
              <Image
                source={require('@/assets/kakao_login_large_wide.png')}
                style={styles.kakaoButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.warning}>
            <WarningText />
          </View>
        </GlassCard>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  card: {
    padding: 20,
    gap: 20,
  },
  heading: {
    fontWeight: 'bold',
    color: colors.deepNavy,
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 25,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
  },
  subheading: {
    fontWeight: 'bold',
    color: colors.softBlue,
    fontSize: 18,
    marginBottom: 8,
  },
  paragraph: {
    color: colors.textColor,
    lineHeight: 22,
    textAlign: 'left',
  },
  infoBox: {
    backgroundColor: '#F6F8FC',
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  socialLoginContainer: {
    width: '100%',
    gap: 12,
  },
  socialLoginTitle: {
    color: colors.mediumGray,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  socialButtonColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  kakaoButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  kakaoButtonImage: {
    width: 260,
    height: 40,
  },
  loginText: {
    textAlign: 'center',
  },
  loginTextBox: {
    margin: 10,
  },
  warning: {
    marginTop: 30,
  },
});
