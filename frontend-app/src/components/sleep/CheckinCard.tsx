import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

interface CheckinCardProps {
  onCheckin?: () => void;
}

// 오늘의 체크인 카드 (버튼)
export const CheckinCard: React.FC<CheckinCardProps> = ({ onCheckin }) => {
  return (
    <LinearGradient
      colors={['#5B6CFF', '#6C7BFF', '#8B5CF6']}
      style={styles.root}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>오늘의 체크인</Text>
      <Text style={styles.desc}>
        지금 2분만 투자하여 오늘의 컨디션을 체크해보세요.
      </Text>
      <Pressable
        onPress={onCheckin}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonLabel}>오늘의 컨디션 체크 & 게임 시작</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'stretch',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'left',
  },
  desc: {
    fontSize: 15,
    color: '#e6e6ff',
    marginBottom: 18,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'center',
    minWidth: 0,
    marginTop: 8,
    height: 44,
    justifyContent: 'center',
    shadowColor: 'transparent',
    elevation: 0,
  },
  buttonPressed: {
    backgroundColor: '#f3f4ff',
  },
  buttonLabel: {
    fontSize: 17,
    color: '#8B5CF6',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
});
