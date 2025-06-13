import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { colors } from '@/constants/colors';
import { GlassCard } from '@/components/common/Card';

const MyRecord = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={20} color={colors.deepNavy} />
        <Text style={styles.backText}>나의 기록 보기</Text>
      </TouchableOpacity>

      <GlassCard style={styles.card}>
        <Text style={styles.title}>아직 기록이 없어요</Text>
        <Text style={styles.subText}>
          여기에 수면 및 집중력 테스트 기록이 표시될 거예요
        </Text>
      </GlassCard>
    </ScrollView>
  );
};

export default MyRecord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F6',
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  backText: {
    color: colors.deepNavy,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 6,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderColor: 'rgba(200,200,200,0.4)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.deepNavy,
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: colors.mediumGray,
  },
});
