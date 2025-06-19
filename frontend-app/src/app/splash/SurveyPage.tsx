import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Text';
import { GENDER_OPTIONS, AGE_OPTIONS } from '@/constants/constants';
import { colors } from '@/constants/colors';
import { Layout } from '@/components/common/Layout';

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
  const [age, setAge] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const checkSurvey = async () => {
//     const survey = await AsyncStorage.getItem('sleepSurvey');
//     if (survey) {
//       navigation.replace('SleepRecord');
//     } else {
//       setLoading(false);
//     }
//   };
//   checkSurvey();
// }, [navigation]);

// if (loading) return null;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // await AsyncStorage.setItem('sleepSurvey', JSON.stringify({ gender, age }));
      navigation.navigate('SleepRecord');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = async () => {
     // await AsyncStorage.setItem('sleepSurvey', 'skipped');
    navigation.navigate('SleepRecord');
  };

  return (
    <Layout showNavbar={false}>
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        간단한 설문에 참여해 주세요
      </Text>
      <Text variant="bodyLarge" style={styles.desc}>
          {`아래 정보는 통계 및 서비스 개선 목적으로만
사용됩니다.`}
      </Text>

      <Text variant="titleMedium" style={styles.label}>성별</Text>
        <CustomDropdown
          items={GENDER_OPTIONS}
          value={gender}
          onSelect={setGender}
          placeholder="성별을 선택하세요"
        />

      <Text variant="titleMedium" style={styles.label}>연령대</Text>
        <CustomDropdown
          items={AGE_OPTIONS}
          value={age}
          onSelect={setAge}
          placeholder="연령대를 선택하세요"
        />

        <View style={styles.buttonRow}>
          <Button
            title="건너뛰기"
            onPress={handleSkip}
            variant="outline"
            style={styles.skipBtn}
          />
        <Button
          title="제출"
          onPress={handleSubmit}
          disabled={!gender || !age || submitting}
          variant="primary"
          style={styles.submitBtn}
        />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    color: colors.deepNavy,
    fontWeight: 'bold',
  },
  desc: {
    textAlign: 'center',
    marginBottom: 24,
    color: colors.textColor,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    color: colors.midnightBlue,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    borderRadius: 8,
    padding: 16,
    backgroundColor: colors.white,
  },
  dropdownButtonText: {
    flex: 1,
    color: colors.textColor,
  },
  placeholderText: {
    color: colors.mediumGray,
  },
  dropdownArrow: {
    fontSize: 12,
    color: colors.mediumGray,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumLightGray,
  },
  modalTitle: {
    color: colors.textColor,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    color: colors.mediumGray,
    padding: 4,
  },
  modalScrollView: {
    maxHeight: 400,
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  selectedItem: {
    backgroundColor: colors.lightGray,
  },
  modalItemText: {
    color: colors.textColor,
  },
  selectedItemText: {
    color: colors.softBlue,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  submitBtn: {
    flex: 1,
  },
  skipBtn: {
    flex: 1,
  },
});

export default SurveyPage; 