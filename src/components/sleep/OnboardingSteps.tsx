import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// OnboardingSteps: 잠과 퍼포먼스의 연결고리 찾기 안내 페이지
export const OnboardingSteps: React.FC<{ onNext?: () => void }> = ({ onNext }) => {
  return (
    <LinearGradient
      colors={['#e8eafe', '#fff']}
      style={styles.root}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
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
        <Pressable
          onPress={onNext}
          // @ts-ignore
          style={({ hovered, pressed }) => [
            styles.button,
            (hovered || pressed) && styles.buttonHover,
          ]}
        >
          <Text style={styles.buttonLabel}>다음</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
    fontSize: 28,
    marginBottom: 32,
    color: '#222',
    textAlign: 'center',
  },
  stepCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 2,
  },
  stepNum: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e8eafe',
    color: '#6C7BFF',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 8,
  },
  stepTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
    textAlign: 'center',
    marginBottom: 6,
  },
  stepDesc: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#6C7BFF',
    paddingHorizontal: 36,
    paddingVertical: 8,
    elevation: 0,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
    minWidth: 160,
    alignSelf: 'center',
  },
  buttonHover: {
    backgroundColor: '#AFC3FF',
  },
  buttonLabel: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
}); 