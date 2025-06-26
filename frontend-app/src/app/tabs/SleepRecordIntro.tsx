import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Layout } from '@/components/common/Layout';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';
import { GlassCard } from '@/components/common/Card';
import WarningText from '@/components/common/WarningText';
import { Button } from '@/components/common/Button';
import { RootStackParamList } from '@/App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SleepRecordIntro() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <GlassCard style={styles.card}>
          <Text style={styles.heading}>수면 기록 기능 안내</Text>

          <View style={styles.imageContainer}>
            <Image
              source={require('@/assets/result.png')}
              style={styles.resultImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.paragraph1}>
            수면 기록은 사용자의 전날 밤 수면 상태를 손쉽게 기록하고, 이를
            기반으로 <Text style={styles.bold}>수면 건강 점수</Text>를 산출하는
            기능입니다.{'\n'}이 점수는 수면 패턴 분석 및 개선 가이드를 제공하는
            데 활용됩니다.
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.subheading}>점수 계산 방식</Text>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreText}>총 100점</Text>
              <Text style={styles.scoreText}>{''}</Text>
              <Text style={styles.scoreText}>• 수면 시간 (최대 25점)</Text>
              <Text style={styles.scoreText}>• 수면 질 (최대 30점)</Text>
              <Text style={styles.scoreText}>• 수면 효율 (최대 25점)</Text>
              <Text style={styles.scoreText}>• 수면 환경 (최대 20점)</Text>
            </View>
            <Text style={styles.paragraph}>
              수면 방해 요인을 선택할 경우 환경 점수가 감점됩니다.{'\n'}
              점수는 실시간으로 계산되어 화면 하단에 표시되며, 수면 패턴 추이를
              확인할 수 있습니다.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.subheading}>기록 항목</Text>
            <Text style={styles.paragraph}>
              1. 총 수면 시간{'\n'}
              2. 수면의 질 (주관적){'\n'}
              3. 잠드는 데 걸린 시간과 깬 횟수{'\n'}
              4. 수면 방해 요인 선택
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.subheading}>기록 결과 활용</Text>
            <Text style={styles.paragraph}>
              기록된 수면 데이터는 다음 기능에 활용됩니다:{'\n\n'}• 수면 점수
              변화 추적{'\n'}• 주간/월간 패턴 시각화{'\n'}• 맞춤형 수면 개선
              가이드 제공{'\n'}• 인지 기능 테스트와 연계한 통합 분석
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.subheading}>왜 중요한가요?</Text>
            <Text style={styles.paragraph}>
              수면은 집중력, 기억력, 감정 조절 등과 밀접한 관련이 있습니다.
              {'\n'}
              정기적인 수면 기록은 본인의 수면 습관을 점검하고, 더 건강한 삶을
              위한 기반이 됩니다.
            </Text>
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              title="다음"
              onPress={() => {
                navigation.navigate('TestIntro');
              }}
            />
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
  resultImage: {
    width: 120,
    height: 120,
  },
  subheading: {
    fontWeight: 'bold',
    color: colors.softBlue,
    fontSize: 18,
    marginBottom: 8,
  },
  paragraph1: {
    color: colors.textColor,
    lineHeight: 22,
    textAlign: 'center',
  },
  paragraph: {
    color: colors.textColor,
    lineHeight: 22,
    textAlign: 'left',
  },
  bold: {
    fontWeight: 'bold',
    color: colors.softBlue,
  },
  infoBox: {
    backgroundColor: '#F6F8FC',
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  scoreBox: {
    backgroundColor: '#EAF2FF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    gap: 6,
  },
  scoreText: {
    fontSize: 14,
    color: colors.textColor,
  },
  warning: {
    marginTop: 30,
  },
  buttonWrapper: {
    marginTop: 20,
  },
});
