import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ResultChart from '@/components/chart/ResultChart';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useNavigation } from 'expo-router';
import { colors } from '@/constants/colors';
import { RootStackParamList } from '@/App';

export default function SleepTestResult() {
  const { width: windowWidth } = useWindowDimensions();
  const containerWidth = Math.min(windowWidth * 0.9, 700);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // API 연결 후 Zustand 상태로 점수 받아오기
  const baseScore = 80;

  function goToDashboard() {
    navigation.navigate('Dashboard');
  }

  return (
    <LinearGradient
      colors={[colors.softBlue, colors.white]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <View style={styles.root}></View> */}
        <View style={styles.root}>
          <GlassCard style={[styles.container, { width: containerWidth }]}>
            <Text style={styles.mainTitle}> 수면 테스트 측정 완료 </Text>
            <ResultChart />

            <View style={styles.rowBox}>
              <View style={styles.textBox}>
                <Text style={styles.boldText}>반응 속도 </Text>
                <Text style={styles.mainText}>
                  평균 반응 시간 : [**점수 가져오기]
                </Text>
              </View>
              <View style={styles.roundScore}>
                <Text style={styles.scoreText}>{baseScore}</Text>
              </View>
            </View>

            <View style={styles.rowBox2}>
              <View style={styles.textBox}>
                <Text style={styles.boldText}>처리 속도 </Text>
                <Text style={styles.mainText}>
                  맞춘 개수 : [**점수 가져오기]
                </Text>
                <Text style={styles.mainText}>
                  평균 반응 속도 : [**점수 가져오기]
                </Text>
                <Text style={styles.mainText}>정확도 : [**점수 가져오기] </Text>
              </View>
              <View style={styles.roundScore}>
                <Text style={styles.scoreText}>{baseScore}</Text>
              </View>
            </View>

            <View style={styles.rowBox}>
              <View style={styles.textBox}>
                <Text style={styles.boldText}>패턴 기억 </Text>
                <Text style={styles.mainText}>
                  기억력 점수 : [**점수 가져오기]
                </Text>
              </View>
              <View style={styles.roundScore}>
                <Text style={styles.scoreText}>{baseScore}</Text>
              </View>
            </View>
            <Text style={styles.mainScore}>{baseScore}점</Text>
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
              title="대시보드로 이동"
              variant="primary"
              style={styles.button}
              onPress={goToDashboard}
            />
          </GlassCard>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 200,
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
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.textColor,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F1C36',
    textAlign: 'center',
    textShadowColor: '#70707050',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 2,
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
    color: '#0F1C36',
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#cbd3df70',
    borderColor: '#5a6da392',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    height: 60,
    gap: 40,
  },
  rowBox2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#cbd3df70',
    borderColor: '#5a6da392',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    height: 100,
    gap: 40,
  },
  textBox: {
    gap: 3,
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  rowText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    width: 130,
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
});
