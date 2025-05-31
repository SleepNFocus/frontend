import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

interface SleepRecordData {
  selectedDate: string;
  sleepDuration: string;
  wakeUpCondition: number;
  nightWakeCount: string;
  memo: string;
}

interface SleepRecordFormProps {
  onSave: (data: SleepRecordData) => void;
}

export const SleepRecordForm: React.FC<SleepRecordFormProps> = ({ onSave }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [sleepDuration, setSleepDuration] = useState<string | null>(null);
  const [wakeUpCondition, setWakeUpCondition] = useState<number>(3);
  const [nightWakeCount, setNightWakeCount] = useState<string | null>(null);
  const [memo, setMemo] = useState('');

  const [openSleepDuration, setOpenSleepDuration] = useState(false);
  const [openWakeCount, setOpenWakeCount] = useState(false);

  const sleepDurationItems = [];
  for (let hours = 0; hours <= 12; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 30) {
      if (hours === 12 && minutes > 0) break;
      const timeString = `${hours}시간 ${minutes === 0 ? '' : `${minutes}분`}`.trim();
      sleepDurationItems.push({
        label: timeString,
        value: `${hours}:${minutes.toString().padStart(2, '0')}`,
      });
    }
  }

  const wakeCountItems = [
    { label: '0번', value: '0' },
    { label: '1번', value: '1' },
    { label: '2번', value: '2' },
    { label: '3번', value: '3' },
    { label: '4번 이상', value: '4+' },
  ];

  const handleSave = () => {
    const recordData: SleepRecordData = {
      selectedDate,
      sleepDuration: sleepDuration || '',
      wakeUpCondition,
      nightWakeCount: nightWakeCount || '',
      memo,
    };
    onSave(recordData);
  };

  const isFormValid = sleepDuration && nightWakeCount;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          날짜 선택
        </Text>
        <Text variant="bodyLarge">{selectedDate}</Text>
      </View>

      <View style={[styles.section, { zIndex: 3000 }]}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          총 수면 시간
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

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          기상 시 컨디션 (1-5점)
        </Text>
        <View style={styles.conditionButtons}>
          {[1, 2, 3, 4, 5].map((score) => (
            <Button
              key={score}
              mode={wakeUpCondition === score ? 'contained' : 'outlined'}
              onPress={() => setWakeUpCondition(score)}
              style={styles.conditionButton}
            >
              {score}
            </Button>
          ))}
        </View>
      </View>

      <View style={[styles.section, { zIndex: 2000 }]}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          밤중에 깬 횟수
        </Text>
        <DropDownPicker
          open={openWakeCount}
          value={nightWakeCount}
          items={wakeCountItems}
          setOpen={setOpenWakeCount}
          setValue={setNightWakeCount}
          placeholder="횟수를 선택하세요"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          메모 (선택사항)
        </Text>
        <Text variant="bodyMedium" style={styles.placeholder}>
          수면에 관한 특이사항을 기록해보세요
        </Text>
      </View>

      <Button
        mode="contained"
        onPress={handleSave}
        disabled={!isFormValid}
        style={styles.saveButton}
      >
        저장
      </Button>
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
  },
  dropdown: {
    borderColor: '#ddd',
    borderRadius: 8,
  },
  dropdownContainer: {
    borderColor: '#ddd',
    borderRadius: 8,
  },
  conditionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  conditionButton: {
    flex: 1,
  },
  placeholder: {
    color: '#888',
    fontStyle: 'italic',
  },
  saveButton: {
    marginTop: 24,
    paddingVertical: 8,
  },
});