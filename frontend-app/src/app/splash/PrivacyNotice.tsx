import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { Card } from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { colors } from '@/constants/colors';

// PrivacyNotice: 개인정보 안내 및 동의 페이지
export const PrivacyNotice: React.FC<{ onAgree?: () => void }> = ({
  onAgree,
}) => {
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleAgree = async () => {
    try {
      // 온보딩 완료 상태를 AsyncStorage에 저장
      await AsyncStorage.setItem('onboardingComplete', 'true');
      
      if (onAgree) {
        onAgree();
      } else {
        navigation.navigate('SleepRecord');
      }
    } catch (error) {
      console.log('온보딩 완료 상태 저장 오류:', error);
      // 오류가 발생해도 계속 진행
      if (onAgree) {
        onAgree();
      } else {
        navigation.navigate('SleepRecord');
      }
    }
  };

  return (
    <ErrorBoundary>
      <View style={styles.root}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Card style={styles.mainCard}>
            <Text variant="headlineMedium" style={styles.title}>
              소중한 정보, 안전하게 활용됩니다.
            </Text>
            
            <Text variant="bodyLarge" style={styles.desc}>
              FOCUZ는 사용자가 입력한 수면 데이터와 게임 결과를 수집하여 분석에
              활용합니다. 이는 개인화된 수면-인지 기능 관계 분석과 서비스 개선을
              위해서만 사용됩니다.
            </Text>

            <Card style={styles.infoCard}>
              <Text variant="titleMedium" style={styles.infoTitle}>
                수집하는 정보:
              </Text>
              <View style={styles.listBox}>
                <Text variant="bodyMedium" style={styles.listItem}>
                  • 사용자가 입력한 수면 관련 데이터
                </Text>
                <Text variant="bodyMedium" style={styles.listItem}>
                  • 인지 능력 게임의 결과 데이터
                </Text>
                <Text variant="bodyMedium" style={styles.listItem}>
                  • 서비스 사용 패턴
                </Text>
              </View>
            </Card>

            <Text variant="bodyLarge" style={styles.desc}>
              모든 데이터는 암호화되어 안전하게 분리 보관되며, 제3자에게 제공되지
              않습니다.
            </Text>

            <View style={styles.linkBox}>
              <TouchableOpacity onPress={() => Linking.openURL('#')}>
                <Text variant="bodyMedium" style={styles.link}>
                  개인정보처리방침 전문 보기 →
                </Text>
              </TouchableOpacity>
            </View>
          </Card>

          <Card style={styles.agreeCard}>
            <View style={styles.agreeBox}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
                color={colors.softBlue}
                uncheckedColor={colors.mediumGray}
              />
              <Text variant="bodyLarge" style={styles.agreeText}>
                개인정보 수집 및 이용에 동의합니다.
              </Text>
            </View>
            
            <Button
              title="동의하고 계속하기"
              onPress={handleAgree}
              variant="primary"
              disabled={!checked}
              style={styles.button}
            />
          </Card>
        </ScrollView>
      </View>
    </ErrorBoundary>
  );
};

export default PrivacyNotice;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.mediumLightGray,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 32,
  },
  mainCard: {
    marginBottom: 16,
    padding: 24,
  },
  title: {
    fontWeight: 'bold',
    color: colors.deepNavy,
    textAlign: 'center',
    marginBottom: 24,
  },
  desc: {
    color: colors.midnightBlue,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'left',
  },
  infoCard: {
    backgroundColor: colors.lightGray,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: colors.deepNavy,
    marginBottom: 12,
  },
  listBox: {
    gap: 8,
  },
  listItem: {
    color: colors.textColor,
    lineHeight: 22,
  },
  linkBox: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  link: {
    color: colors.softBlue,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  agreeCard: {
    padding: 24,
    alignItems: 'center',
  },
  agreeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  agreeText: {
    color: colors.textColor,
    marginLeft: 8,
    flex: 1,
  },
  button: {
    width: '100%',
  },
});
