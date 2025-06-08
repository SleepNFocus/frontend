import ResultChart from '@/components/chart/ResultChart';
import { Button } from '@/components/common/Button';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SleepTestResult() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.root}></View>
      <View style={styles.root}>
        <View style={styles.container}>
          <Text style={styles.mainTitle}> 수면 테스트 측정 완료 </Text>
          <ResultChart />
          {/* 반응 속도 */}
          <View style={styles.rowBox}>
            <View style={styles.textBox}>
              <Text style={styles.boldText}>반응 속도 </Text>
              <Text style={styles.mainText}>
                평균 반응 시간 : [**점수 가져오기]
              </Text>
            </View>
            <View style={styles.roundScore}>
              {/* 원형 점수 넣기 */}
              <Text style={styles.scoreText}> 80 </Text>
            </View>
          </View>
          {/* 처리 속도 */}
          <View style={styles.rowBox2}>
            <View style={styles.textBox}>
              <Text style={styles.boldText}>처리 속도 </Text>
              <Text style={styles.mainText}>맞춘 개수 : [**점수 가져오기]</Text>
              <Text style={styles.mainText}>
                평균 반응 속도 : [**점수 가져오기]
              </Text>
              <Text style={styles.mainText}>정확도 : [**점수 가져오기] </Text>
            </View>
            <View style={styles.roundScore}>
              {/* 원형 점수 넣기 */}
              <Text style={styles.scoreText}> 90 </Text>
            </View>
          </View>
          {/* 패턴 기억 */}
          <View style={styles.rowBox}>
            <View style={styles.textBox}>
              <Text style={styles.boldText}>패턴 기억 </Text>
              <Text style={styles.mainText}>
                기억력 점수 : [**점수 가져오기]
              </Text>
            </View>
            <View style={styles.roundScore}>
              {/* 원형 점수 넣기 */}
              <Text style={styles.scoreText}> 100 </Text>
            </View>
          </View>
          <View style={styles.rowText}>
            <Text style={styles.subTitle}> 평균 점수 : </Text>
            {/* 점수 받아오기 */}
            <Text style={styles.mainScore}> 80점 </Text>
          </View>
          <Text style={styles.description}>
            초기 인지 능력 측정이 완료되었습니다. {'\n'}
            {'\n'} 이제 대시보드에서 당신의 프로필을 확인하고, 매일의 컨디션
            변화를 기록해보세요.
          </Text>
          <Button
            title="대시보드로 이동"
            variant="outline"
            onPress={() => {
              router.replace('/(tabs)/DashboardMain' as any);
            }}
          ></Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    maxWidth: 500,
    maxHeight: 1000,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
    paddingHorizontal: 20,
    gap: 40,
    shadowColor: '#aaa',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  mainText: {
    color: '#6c6c6c',
    fontSize: 12,
  },
  mainScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8888ff',
  },
  scoreText: {
    textAlign: 'center',
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: 370,
    height: 60,
    gap: 40,
  },
  rowBox2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: 370,
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
    backgroundColor: '#ccc',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
});
