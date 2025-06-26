import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/common/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { Button } from '@/components/common/Button';

interface CheckinCardProps {
  onCheckin?: () => void;
}

// 오늘의 체크인 카드 (버튼)
export const CheckinCard: React.FC<CheckinCardProps> = ({ onCheckin }) => {
  return (
    <LinearGradient
      colors={[colors.deepNavy, colors.softBlue]}
      style={styles.root}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>오늘의 체크인</Text>
      <Text style={styles.desc}>
        지금 2분만 투자하여 오늘의 컨디션을 체크해보세요.
      </Text>
      <Button
        onPress={onCheckin ?? (() => {})}
        title="오늘의 컨디션 체크 & 게임 시작"
        variant="primary"
        style={{ backgroundColor: colors.white }}
        textStyle={{ color: colors.textColor }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    borderRadius: 8,
    padding: 20,
    alignItems: 'stretch',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.white,
    marginBottom: 8,
    textAlign: 'left',
  },
  desc: {
    fontSize: 15,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 18,
    textAlign: 'left',
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: 8,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    minWidth: 0,
  },
  buttonLabel: {
    fontSize: 17,
    color: colors.softBlue,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
});
