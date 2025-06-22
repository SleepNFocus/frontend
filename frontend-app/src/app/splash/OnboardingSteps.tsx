import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { colors } from '@/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { Layout } from '@/components/common/Layout';

// OnboardingSteps: 잠과 퍼포먼스의 연결고리 찾기 안내 페이지
export const OnboardingSteps: React.FC<{ onNext?: () => void }> = ({
  onNext,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const step = useRef(0);

  // 현재는 순서대로 PrivacyNotice → Survey → SleepRecord로 이동
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      // console.log('PrivacyNotice로 이동');
      navigation.navigate('PrivacyNotice');
    }
  };

  return (
    <Layout showNavbar={false}>
      <ScrollView contentContainerStyle={styles.root}>
        <View style={styles.centerBox}>
          <Text style={styles.title}>잠과 퍼포먼스의 연결고리 찾기</Text>
          {/* 1단계 */}
          <View style={styles.stepCard}>
            <Text style={styles.stepNum}>1</Text>
            <Text style={styles.stepTitle}>
              먼저, 당신의 평소 수면 습관과 현재 인지 능력을 측정해요.
            </Text>
            <Text style={styles.stepDesc}>
              초기 설정을 통해 기준점을 만들어요
            </Text>
          </View>
          {/* 2단계 */}
          <View style={styles.stepCard}>
            <Text style={styles.stepNum}>2</Text>
            <Text style={styles.stepTitle}>
              매일 간단한 수면 체크 후, 미니 게임을 플레이해요.
            </Text>
            <Text style={styles.stepDesc}>
              단 2분만에 수면과 인지 능력을 기록해요
            </Text>
          </View>
          {/* 3단계 */}
          <View style={styles.stepCard}>
            <Text style={styles.stepNum}>3</Text>
            <Text style={styles.stepTitle}>
              수면과 게임 결과의 관계를 확인하고 맞춤 조언을 받으세요.
            </Text>
            <Text style={styles.stepDesc}>
              당신만의 패턴을 발견하고 개선해요
            </Text>
          </View>

          <Button
            title="다음"
            onPress={handleNext}
            variant="primary"
            style={styles.nextButton}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBox: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 32,
    color: colors.textColor,
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 30,
  },
  stepCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    elevation: 2,
  },
  stepNum: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightGray,
    color: colors.softBlue,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 8,
  },
  stepTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: colors.textColor,
    textAlign: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  stepDesc: {
    color: colors.midnightBlue,
    fontSize: 14,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  nextButton: {
    width: '100%',
    marginTop: 8,
    backgroundColor: colors.softBlue,
  },
});

export default OnboardingSteps;
