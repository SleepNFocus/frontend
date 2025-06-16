import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

type RecordCalendarProps = {
  filter: 'day' | 'week' | 'month';
  selectedDate: string;
  onSelectDate: (date: string) => void;
  records: {
    date: string;
    sleepTime: string;
    score: number;
  }[];
  markedDates: {
    [key: string]: {
      marked?: boolean;
      selected?: boolean;
      dotColor?: string;
      selectedColor?: string;
    };
  };
};

const RecordCalendar = ({
  // filter,
  selectedDate,
  onSelectDate,
  // records,
  markedDates,
}: RecordCalendarProps) => {
  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        markedDates={markedDates}
        onDayPress={day => {
          console.log('선택한 날짜:', day.dateString);
          onSelectDate(day.dateString); 
        }}
        theme={{
          todayTextColor: '#5C6BC0',
          selectedDayBackgroundColor: '#5C6BC0',
          selectedDayTextColor: '#ffffff',
          dotColor: '#5C6BC0',
        }}
      />
    </View>
  );
};

export default RecordCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});
