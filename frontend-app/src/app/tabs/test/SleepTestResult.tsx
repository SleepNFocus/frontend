import {
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import ResultChart from '@/components/common/ResultChart';
import { useNavigation } from '@react-navigation/native';
import { GlassCard } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Layout } from '@/components/common/Layout';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';
import { RootStackParamList } from '@/App';

type SleepTestResultRouteProp = RouteProp<
  RootStackParamList,
  'SleepTestResult'
>;

export default function SleepTestResult() {
  const route = useRoute<SleepTestResultRouteProp>();
  const basic = route.params.basic;

  const { width: windowWidth } = useWindowDimensions();
  const containerWidth = Math.min(windowWidth * 0.9, 700);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function goToDashboard() {
    navigation.navigate('Dashboard');
  }

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.root}>
          <GlassCard style={[styles.container, { width: containerWidth }]}>
            <Text style={styles.mainTitle}> 수면 테스트 측정 완료 </Text>
            <ResultChart
              data={[
                basic.results[0].detailed_raw_scores.srt.average_score,
                basic.results[0].detailed_raw_scores.symbol.average_score,
                basic.results[0].detailed_raw_scores.pattern.average_score,
              ]}
              labels={['반응 속도', '처리 속도', '패턴 기억']}
            />

            <View style={styles.rowBox}>
              <View style={styles.textBox}>
                <Text style={styles.boldText}>반응 속도 </Text>
                <Text style={styles.mainText}>
                  평균 반응 시간 :{' '}
                  {Math.floor(
                    basic.results[0].detailed_raw_scores.srt.avg_ms,
                  ).toLocaleString()}
                  ms
                </Text>
              </View>
              <View style={styles.roundScore}>
                <Text style={styles.scoreText}>
                  {basic.results[0].detailed_raw_scores.srt.average_score}
                </Text>
              </View>
            </View>

            <View style={styles.rowBox2}>
              <View style={styles.textBox}>
                <Text style={styles.boldText}>처리 속도 </Text>
                <Text style={styles.mainText}>
                  맞춘 개수 :{' '}
                  {basic.results[0].detailed_raw_scores.symbol.correct}개
                </Text>
                <Text style={styles.mainText}>
                  평균 반응 속도 :{' '}
                  {Math.floor(
                    basic.results[0].detailed_raw_scores.symbol.avg_ms,
                  ).toLocaleString()}
                  ms
                </Text>
                <Text style={styles.mainText}>
                  정확도 :{' '}
                  {basic.results[0].detailed_raw_scores.symbol.symbol_accuracy}%
                </Text>
              </View>
              <View style={styles.roundScore}>
                <Text style={styles.scoreText}>
                  {basic.results[0].detailed_raw_scores.symbol.average_score}
                </Text>
              </View>
            </View>

            <View style={styles.rowBox}>
              <View style={styles.textBox}>
                <Text style={styles.boldText}>패턴 기억 </Text>
                <Text style={styles.mainText}>
                  맞춘 개수 :{' '}
                  {basic.results[0].detailed_raw_scores.pattern.correct} / 18개
                </Text>
              </View>
              <View style={styles.roundScore}>
                <Text style={styles.scoreText}>
                  {basic.results[0].detailed_raw_scores.pattern.average_score}
                </Text>
              </View>
            </View>
            <Text style={styles.mainScore}>
              {Math.floor(basic.results[0].average_score)}점
            </Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.description}>
                초기 인지 능력 측정이 완료되었습니다.
              </Text>
              <Text style={styles.pointDescription}>
                이제 대시보드에서 당신의 프로필을 확인하고, {`\n`} 매일의 컨디션
                변화를 기록해보세요.
              </Text>
            </View>
            <Button
              title="오늘의 결과 보기"
              variant="primary"
              style={styles.resultButton}
              onPress={goToDashboard}
            />
          </GlassCard>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 50,
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
    paddingHorizontal: 20,
    gap: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.750)',
  },
  mainTitle: {
    fontSize: 22,
    lineHeight: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.textColor,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.textColor,
  },
  mainText: {
    color: '#0F1C36',
    fontSize: 12,
  },
  mainScore: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: 'bold',
    color: '#5A6EA3',
    textShadowColor: '#70707050',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
  },
  scoreText: {
    textAlign: 'center',
    color: '#ffffff',
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#cbd3df70',
    borderColor: '#5a6da392',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    height: 60,
    gap: 40,
    paddingHorizontal: 20,
  },
  rowBox2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#cbd3df70',
    borderColor: '#5a6da392',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    height: 110,
    gap: 40,
    paddingHorizontal: 20,
  },
  textBox: {
    flex: 1,
    gap: 3,
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  roundScore: {
    borderRadius: 50,
    backgroundColor: colors.softBlue,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#0F1C36',
  },
  pointDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3F4F80',
  },
  descriptionBox: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  resultButton: {
    marginTop: 20,
    width: '100%',
    maxWidth: 320,
  },
});
