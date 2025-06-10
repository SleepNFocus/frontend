import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors } from '@/constants/colors';
import { Button } from '@/components/common/Button';

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

export const SleepRecordForm: React.FC<SleepRecordFormProps> = ({ onSave }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const [sleepDuration, setSleepDuration] = useState<string | null>(null);
  const [openSleepDuration, setOpenSleepDuration] = useState(false);

  const [sleepQuality, setSleepQuality] = useState<string | null>(null);
  const [openSleepQuality, setOpenSleepQuality] = useState(false);

  const [fallAsleepTime, setFallAsleepTime] = useState<string | null>(null);
  const [nightWakeCount, setNightWakeCount] = useState<string | null>(null);
  const [openFallAsleep, setOpenFallAsleep] = useState(false);
  const [openWakeCount, setOpenWakeCount] = useState(false);

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
      label:
        '잠들기 2시간 이내 격렬한 운동 (숨이 많이 차거나 땀이 많이 나는 운동)',
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

  const closeAllDropdowns = () => {
    setOpenSleepDuration(false);
    setOpenSleepQuality(false);
    setOpenFallAsleep(false);
    setOpenWakeCount(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeAllDropdowns}>
      <View style={styles.container}>
        <View style={styles.scoreSection}>
          <Text variant="headlineSmall" style={styles.scoreTitle}>
            오늘의 수면 점수
          </Text>
          <Text variant="displayMedium" style={styles.totalScore}>
            {totalScore}점
          </Text>
          <View style={styles.scoreBreakdown}>
            <Text variant="bodySmall">
              수면시간: {scoreBreakdown.durationScore}/25
            </Text>
            <Text variant="bodySmall">
              수면질: {scoreBreakdown.qualityScore}/30
            </Text>
            <Text variant="bodySmall">
              수면효율: {scoreBreakdown.sleepEfficiencyScore}/25
            </Text>
            <Text variant="bodySmall">
              수면환경: {scoreBreakdown.environmentScore}/20
            </Text>
          </View>
        </View>

        <View style={[styles.section, { zIndex: 4000 }]}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            1. 어젯밤 총 몇 시간 주무셨나요? (25점)
          </Text>
          <DropDownPicker
            open={openSleepDuration}
            value={sleepDuration}
            items={sleepDurationItems}
            setOpen={setOpenSleepDuration}
            setValue={setSleepDuration}
            placeholder="수면 시간을 선택하세요"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            listMode="SCROLLVIEW"
            maxHeight={200}
          />
        </View>

        <View style={[styles.section, { zIndex: 3000 }]}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            2. 아침에 기상했을 때 느낀 주관적인 수면의 질은 어떠셨나요? (30점)
          </Text>
          <DropDownPicker
            open={openSleepQuality}
            value={sleepQuality}
            items={sleepQualityItems}
            setOpen={setOpenSleepQuality}
            setValue={setSleepQuality}
            placeholder="수면의 질을 선택하세요"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            3. 잠드는 데 걸린 시간과 밤새 깬 횟수는 어떻게 되시나요? (25점)
          </Text>

          <View style={[styles.subQuestion, { zIndex: 2000 }]}>
            <Text variant="bodyMedium" style={styles.subQuestionTitle}>
              A. 잠드는 데 걸린 시간
            </Text>
            <DropDownPicker
              open={openFallAsleep}
              value={fallAsleepTime}
              items={fallAsleepItems}
              setOpen={setOpenFallAsleep}
              setValue={setFallAsleepTime}
              placeholder="선택하세요"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>

          <View style={[styles.subQuestion, { zIndex: 1000 }]}>
            <Text variant="bodyMedium" style={styles.subQuestionTitle}>
              B. 수면시간 내 깬 횟수
            </Text>
            <DropDownPicker
              open={openWakeCount}
              value={nightWakeCount}
              items={wakeCountItems}
              setOpen={setOpenWakeCount}
              setValue={setNightWakeCount}
              placeholder="선택하세요"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            4. 어젯밤, 다음 중 수면에 방해가 될 만한 요인이 있었나요? (20점)
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            해당하는 항목을 모두 선택해주세요. (각 항목당 -4점)
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
          title={`수면 기록 저장 (${totalScore}점)`}
          disabled={!isFormValid}
          style={styles.saveButton}
          variant="primary"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  scoreSection: {
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  scoreTitle: {
    marginBottom: 8,
    color: colors.textColor,
  },
  totalScore: {
    color: colors.textColor,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  scoreBreakdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
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
  dropdown: {
    borderColor: colors.mediumLightGray,
    borderRadius: 8,
  },
  dropdownContainer: {
    borderColor: colors.mediumLightGray,
    borderRadius: 8,
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
    paddingVertical: 8,
  },
});
