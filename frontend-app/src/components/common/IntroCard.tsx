import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';

// Intro: Focuz 전체화면 인트로/랜딩 페이지
export const IntroCard: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  return (
    <LinearGradient
      colors={[colors.lightGray, colors.white]}
      style={styles.root}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.centerBox}>
        <Text style={styles.logo}>FOCUZ</Text>
        <Text style={styles.title}>당신의 잠, 퍼포먼스가 되다.</Text>
        <Text style={styles.desc}>
          어젯밤 수면이 오늘의 당신에게 어떤 영향을 미치는지,{'\n'}간단한
          게임으로 확인하고 관리해보세요.
        </Text>
        <Pressable
          onPress={onStart}
          // @ts-ignore
          style={({ hovered, pressed }) => [
            styles.button,
            (hovered || pressed) && styles.buttonHover,
          ]}
        >
          <Text style={styles.buttonLabel}>시작하기</Text>
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
    maxWidth: 600,
    paddingHorizontal: 16,
  },
  logo: {
    color: colors.softBlue,
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 16,
    letterSpacing: 1,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 24,
    color: colors.deepNavy,
    textAlign: 'center',
  },
  desc: {
    color: colors.midnightBlue,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 36,
    lineHeight: 28,
  },
  button: {
    borderRadius: 10,
    backgroundColor: colors.softBlue,
    paddingHorizontal: 36,
    paddingVertical: 8,
    elevation: 0,
    marginTop: 8,
    alignItems: 'center',
    minWidth: 160,
    alignSelf: 'center',
  },
  buttonHover: {
    backgroundColor: colors.midnightBlue,
  },
  buttonLabel: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
  },
});
