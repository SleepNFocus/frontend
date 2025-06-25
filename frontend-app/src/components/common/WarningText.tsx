import { StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { ViewStyle } from 'react-native';

type WarningTextProps = {
  style?: ViewStyle;
};

export default function WarningText({ style }: WarningTextProps) {
  return (
    <View style={[styles.container, style]}>
      <Text variant="bodySmall" style={styles.text}>
        이 앱은 건강 정보를 참고용으로 제공하며, 의학적 진단이나 치료 목적이
        아닙니다.{'\n'}
        건강에 이상이 있다면 전문가와 상담하세요.
      </Text>
      <Text variant="bodySmall" style={styles.text}>
        This app provides general wellness information and is not for medical
        diagnosis or treatment.{'\n'}
        Consult a professional if needed.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    opacity: 0.7,
    textAlign: 'center',
  },
});
