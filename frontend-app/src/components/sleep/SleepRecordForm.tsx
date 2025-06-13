import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { colors } from '@/constants/colors';

interface SleepRecordData {
  selectedDate: string;
  sleepDuration: string;
  sleepQuality: string;
  fallAsleepTime: string;
  nightWakeCount: string;
  sleepDisruptors: string[];
  totalScore: number;
  scoreBreakdown: {
    durationScore: number;
    qualityScore: number;
    sleepEfficiencyScore: number;
    environmentScore: number;
  };
}

interface SleepRecordFormProps {
  onSave: (data: SleepRecordData) => void;
}

interface DropdownItem {
  label: string;
  value: string;
  score: number;
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
        transparent
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalOverlay}>
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
        </View>
      </Modal>
    </View>
  );
};

export const SleepRecordForm: React.FC<SleepRecordFormProps> = ({ onSave }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const [sleepDuration, setSleepDuration] = useState<string | null>(null);
  const [sleepQuality, setSleepQuality] = useState<string | null>(null);
  const [fallAsleepTime, setFallAsleepTime] = useState<string | null>(null);
  const [nightWakeCount, setNightWakeCount] = useState<string | null>(null);

  const [sleepDisruptors, setSleepDisruptors] = useState<{
    [key: string]: boolean;
  }>({
    electronics: false,
    caffeine: false,
    environment: false,
    alcohol: false,
    exercise: false,
  });

  const [totalScore, setTotalScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({
    durationScore: 0,
    qualityScore: 0,
    sleepEfficiencyScore: 0,
    environmentScore: 0,
  });

  const sleepDurationItems = [
    { label: '4시간 이하', value: '04:00-', score: 0 },
    { label: '4시간 30분', value: '04:30', score: 0 },
    { label: '5시간', value: '05:00', score: 5 },
    { label: '5시간 30분', value: '05:30', score: 10 },
    { label: '6시간', value: '06:00', score: 15 },
    { label: '6시간 30분', value: '06:30', score: 20 },
    { label: '7시간', value: '07:00', score: 25 },
    { label: '7시간 30분', value: '07:30', score: 25 },
    { label: '8시간', value: '08:00', score: 25 },
    { label: '8시간 30분', value: '08:30', score: 25 },
    { label: '9시간', value: '09:00', score: 25 },
    { label: '9시간 30분', value: '09:30', score: 20 },
    { label: '10시간', value: '10:00', score: 15 },
    { label: '10시간 30분', value: '10:30', score: 10 },
    { label: '11시간', value: '11:00', score: 5 },
    { label: '11시간 30분', value: '11:30', score: 0 },
    { label: '12시간 이상', value: '12:00+', score: 0 },
  ];

  const sleepQualityItems = [
    { label: '매우 개운함', value: 'excellent', score: 30 },
    { label: '개운함', value: 'good', score: 25 },
    { label: '보통', value: 'fair', score: 20 },
    { label: '약간 피곤함', value: 'poor', score: 10 },
    { label: '매우 피곤함', value: 'very_poor', score: 0 },
  ];

  const fallAsleepItems = [
    { label: '15분 이하', value: 'under_15', score: 15 },
    { label: '15분 ~ 30분', value: '15_30', score: 10 },
    { label: '30분 초과', value: 'over_30', score: 0 },
  ];

  const wakeCountItems = [
    { label: '0번', value: '0', score: 10 },
    { label: '1~2번', value: '1_2', score: 5 },
    { label: '3번 이상', value: '3_more', score: 0 },
  ];

  const disruptorOptions = [
    {
      key: 'electronics',
      label: '늦은 시간(잠들기 1시간 전 이내) 스마트폰/TV 등 전자기기 사용',
      penalty: 4,
    },
    {
      key: 'caffeine',
      label: '오후 4시 이후 카페인 음료(커피, 에너지 드링크 등) 섭취',
      penalty: 4,
    },
    {
      key: 'environment',
      label: '불편한 잠자리 환경 (너무 덥거나 추움, 주변 소음, 밝은 빛 등)',
      penalty: 4,
    },
    {
      key: 'alcohol',
      label: '잠들기 2시간 이내 음주',
      penalty: 4,
    },
    {
      key: 'exercise',
      label: '잠들기 2시간 이내 격렬한 운동 (숨이 많이 차거나 땀이 많이 나는 운동)',
      penalty: 4,
    },
  ];

  const calculateScore = () => {
    let durationScore = 0;
    let qualityScore = 0;
    let sleepEfficiencyScore = 0;
    let environmentScore = 20;

    if (sleepDuration) {
      const durationItem = sleepDurationItems.find(
        item => item.value === sleepDuration,
      );
      durationScore = durationItem?.score || 0;
    }

    if (sleepQuality) {
      const qualityItem = sleepQualityItems.find(
        item => item.value === sleepQuality,
      );
      qualityScore = qualityItem?.score || 0;
    }

    if (fallAsleepTime) {
      const fallAsleepItem = fallAsleepItems.find(
        item => item.value === fallAsleepTime,
      );
      sleepEfficiencyScore += fallAsleepItem?.score || 0;
    }
    if (nightWakeCount) {
      const wakeCountItem = wakeCountItems.find(
        item => item.value === nightWakeCount,
      );
      sleepEfficiencyScore += wakeCountItem?.score || 0;
    }

    Object.entries(sleepDisruptors).forEach(([key, isSelected]) => {
      if (isSelected) {
        const disruptor = disruptorOptions.find(opt => opt.key === key);
        environmentScore -= disruptor?.penalty || 0;
      }
    });
    environmentScore = Math.max(0, environmentScore);

    const total = Math.min(
      100,
      Math.max(
        0,
        durationScore + qualityScore + sleepEfficiencyScore + environmentScore,
      ),
    );

    setScoreBreakdown({
      durationScore,
      qualityScore,
      sleepEfficiencyScore,
      environmentScore,
    });
    setTotalScore(total);
  };

  useEffect(() => {
    calculateScore();
  }, [
    sleepDuration,
    sleepQuality,
    fallAsleepTime,
    nightWakeCount,
    sleepDisruptors,
  ]);

  const handleDisruptorToggle = (key: string) => {
    setSleepDisruptors(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    const recordData: SleepRecordData = {
      selectedDate,
      sleepDuration: sleepDuration || '',
      sleepQuality: sleepQuality || '',
      fallAsleepTime: fallAsleepTime || '',
      nightWakeCount: nightWakeCount || '',
      sleepDisruptors: Object.entries(sleepDisruptors)
        .filter(([_, isSelected]) => isSelected)
        .map(([key, _]) => key),
      totalScore,
      scoreBreakdown,
    };
    onSave(recordData);
  };

  const isFormValid =
    sleepDuration && sleepQuality && fallAsleepTime && nightWakeCount;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          1. 어젯밤 총 몇 시간 주무셨나요?
        </Text>
        <CustomDropdown
          items={sleepDurationItems}
          value={sleepDuration}
          onSelect={setSleepDuration}
          placeholder="수면 시간을 선택하세요"
        />
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          2. 아침에 기상했을 때 느낀 주관적인 수면의 질은 어떠셨나요?
        </Text>
        <CustomDropdown
          items={sleepQualityItems}
          value={sleepQuality}
          onSelect={setSleepQuality}
          placeholder="수면의 질을 선택하세요"
        />
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          3. 잠드는 데 걸린 시간과 밤새 깬 횟수는 어떻게 되시나요?
        </Text>

        <View style={styles.subQuestion}>
          <Text variant="bodyMedium" style={styles.subQuestionTitle}>
            A. 잠드는 데 걸린 시간
          </Text>
          <CustomDropdown
            items={fallAsleepItems}
            value={fallAsleepTime}
            onSelect={setFallAsleepTime}
            placeholder="선택하세요"
          />
        </View>

        <View style={styles.subQuestion}>
          <Text variant="bodyMedium" style={styles.subQuestionTitle}>
            B. 수면시간 내 깬 횟수
          </Text>
          <CustomDropdown
            items={wakeCountItems}
            value={nightWakeCount}
            onSelect={setNightWakeCount}
            placeholder="선택하세요"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          4. 어젯밤, 다음 중 수면에 방해가 될 만한 요인이 있었나요?
        </Text>
        <Text variant="bodySmall" style={styles.subtitle}>
          해당하는 항목을 모두 선택해주세요.
        </Text>

        {disruptorOptions.map(option => (
          <TouchableWithoutFeedback
            key={option.key}
            onPress={() => handleDisruptorToggle(option.key)}
          >
            <View style={styles.checkboxItem}>
              <View style={styles.checkbox}>
                {sleepDisruptors[option.key] && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text variant="bodyMedium" style={styles.checkboxLabel}>
                {option.label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>

      <Button
        onPress={handleSave}
        title="수면 기록 저장"
        disabled={!isFormValid}
        style={styles.saveButton}
        variant="primary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  subtitle: {
    marginBottom: 12,
    color: colors.mediumGray,
  },
  subQuestion: {
    marginBottom: 16,
  },
  subQuestionTitle: {
    marginBottom: 8,
    fontWeight: '500',
    color: colors.midnightBlue,
  },
  // 커스텀 드롭다운 스타일
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
  // 모달 스타일
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
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.softBlue,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  checkmark: {
    color: colors.softBlue,
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxLabel: {
    flex: 1,
    lineHeight: 20,
    color: colors.deepNavy,
  },
  saveButton: {
    marginTop: 24,
    paddingVertical: 12,
  },
});