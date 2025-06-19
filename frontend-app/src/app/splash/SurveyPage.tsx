import React, { useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Text';
import {
  GENDER_OPTIONS,
  BIRTH_YEAR_OPTIONS,
  MBTI_OPTIONS,
  COGNITIVE_TYPE_OPTIONS,
  WORK_TIME_OPTIONS
} from '@/constants/constants';
import { colors } from '@/constants/colors';
import { Layout } from '@/components/common/Layout';
import { BASE_URL } from '@/constants/api';
// import { useAuthStore } from '@/store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosLib from 'axios';

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  items: DropdownItem[];
  value: string | null;
  onSelect: (value: string) => void;
  placeholder: string;
}

const CustomDropdown: React.FC<DropdownProps> = ({ items, value, onSelect, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const selectedItem = items.find(item => item.value === value);

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity 
        style={styles.dropdownButton}
        onPress={() => setIsVisible(true)}
      >
        <Text 
          variant="bodyMedium" 
          style={!selectedItem 
            ? { ...styles.dropdownButtonText, ...styles.placeholderText }
            : styles.dropdownButtonText
          }
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text variant="titleMedium" style={styles.modalTitle}>
                {placeholder}
              </Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.modalItem,
                    value === item.value && styles.selectedItem
                  ]}
                  onPress={() => {
                    onSelect(item.value);
                    setIsVisible(false);
                  }}
                >
                  <Text 
                    variant="bodyMedium" 
                    style={value === item.value 
                      ? { ...styles.modalItemText, ...styles.selectedItemText }
                      : styles.modalItemText
                    }
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export const SurveyPage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [gender, setGender] = useState<string | null>(null);
  const [birthYear, setBirthYear] = useState<string | null>(null);
  const [mbti, setMbti] = useState<string | null>(null);
  const [cognitiveType, setCognitiveType] = useState<string | null>(null);
  const [workTimePattern, setWorkTimePattern] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('accessToken:', token);

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const basicPayload = {
        gender,
        birth_year: birthYear,
        mbti,
      };

      const jobPayload = {
        cognitive_type: cognitiveType,
        work_time_pattern: workTimePattern,
      };

      console.log('basic payload:', basicPayload);
      console.log('job payload:', jobPayload);

      await axios.post(`${BASE_URL}/users/onboarding/basic/`, basicPayload, { headers });
      await axios.post(`${BASE_URL}/users/onboarding/job/`, jobPayload, { headers });

      console.log('온보딩 성공!');
      navigation.navigate('SleepRecord');
    } catch (err) {
      if (axiosLib.isAxiosError(err)) {
        console.error('온보딩 전송 실패 (AxiosError):', err.response?.data || err.message);
      } else {
        console.error('온보딩 전송 실패 (Unknown):', err);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout showNavbar={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          간단한 설문에 참여해 주세요
        </Text>
        <Text variant="bodyLarge" style={styles.desc}>
          {`아래 정보는 통계 및 서비스 개선 목적으로만\n사용됩니다.`}
        </Text>

        <Text variant="titleMedium" style={styles.label}>성별</Text>
        <CustomDropdown items={GENDER_OPTIONS} value={gender} onSelect={setGender} placeholder="성별을 선택하세요" />

        <Text variant="titleMedium" style={styles.label}>출생년도</Text>
        <CustomDropdown items={BIRTH_YEAR_OPTIONS} value={birthYear} onSelect={setBirthYear} placeholder="출생년도를 선택하세요" />

        <Text variant="titleMedium" style={styles.label}>MBTI</Text>
        <CustomDropdown items={MBTI_OPTIONS} value={mbti} onSelect={setMbti} placeholder="MBTI를 선택하세요" />

        <Text variant="titleMedium" style={styles.label}>당신의 일은 어떤 특성에 가깝나요?</Text>
        {COGNITIVE_TYPE_OPTIONS.map(option => (
          <TouchableOpacity
            key={option.value}
            onPress={() => setCognitiveType(option.value)}
            style={[styles.checkboxItem, cognitiveType === option.value && styles.checkboxSelected]}
          >
            <Text>{option.label}</Text>
          </TouchableOpacity>
        ))}

        <Text variant="titleMedium" style={styles.label}>보통 언제 활동하거나 일하시나요?</Text>
        {WORK_TIME_OPTIONS.map(option => (
          <TouchableOpacity
            key={option.value}
            onPress={() => setWorkTimePattern(option.value)}
            style={[styles.checkboxItem, workTimePattern === option.value && styles.checkboxSelected]}
          >
            <Text>{option.label}</Text>
          </TouchableOpacity>
        ))}

        <Button
          title="제출"
          onPress={handleSubmit}
          disabled={!gender || !birthYear || !mbti || !cognitiveType || !workTimePattern || submitting}
          variant="primary"
          style={styles.submitBtn}
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 80 },
  title: { textAlign: 'center', marginBottom: 16, color: colors.deepNavy, fontWeight: 'bold' },
  desc: { textAlign: 'center', marginBottom: 24, color: colors.textColor },
  label: { marginTop: 16, marginBottom: 8, color: colors.midnightBlue, fontWeight: 'bold' },
  dropdownContainer: { marginBottom: 8 },
  dropdownButton: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: colors.mediumLightGray, borderRadius: 8, padding: 16,
    backgroundColor: colors.white,
  },
  dropdownButtonText: { flex: 1, color: colors.textColor },
  placeholderText: { color: colors.mediumGray },
  dropdownArrow: { fontSize: 12, color: colors.mediumGray },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '70%' },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, borderBottomWidth: 1, borderBottomColor: colors.mediumLightGray,
  },
  modalTitle: { color: colors.textColor, fontWeight: 'bold' },
  closeButton: { fontSize: 18, color: colors.mediumGray, padding: 4 },
  modalScrollView: { maxHeight: 400 },
  modalItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: colors.lightGray },
  selectedItem: { backgroundColor: colors.lightGray },
  modalItemText: { color: colors.textColor },
  selectedItemText: { color: colors.softBlue, fontWeight: 'bold' },
  submitBtn: { alignSelf: 'center', marginTop: 24, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  checkboxItem: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.mediumGray, marginBottom: 8 },
  checkboxSelected: { backgroundColor: colors.softBlue, borderColor: colors.deepNavy },
});

export default SurveyPage;
