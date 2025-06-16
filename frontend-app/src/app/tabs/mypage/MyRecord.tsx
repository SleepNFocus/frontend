import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { colors } from '@/constants/colors';
import { GlassCard } from '@/components/common/Card';
import RecordList from '@/components/record/RecordList';
import RecordCalendar from '@/components/record/RecordCalendar';
import Navbar from '@/components/common/Navbar';
import { Layout } from '@/components/common/Layout';


const MyRecord = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [filter, setFilter] = useState<'day' | 'week' | 'month'>('month');
  const [selectedDate, setSelectedDate] = useState<string>('2025-06-01');

  const dummyRecords = [
    { date: '2025-06-01', sleepTime: '6시간 20분', score: 85 },
    { date: '2025-06-02', sleepTime: '7시간 5분', score: 92 },
  ];

  const markedDates = {
    '2025-06-01': { marked: true, dotColor: '#5C6BC0' },
    '2025-06-02': { marked: true, dotColor: '#5C6BC0' },
  };

  const hasRecords = dummyRecords.length > 0;

  return (
    <Layout>
    <View style={styles.container}>
 
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={20} color={colors.deepNavy} />
        <Text style={styles.backText}>나의 기록 보기</Text>
      </TouchableOpacity>

      <View style={styles.controlBar}>
        <View style={styles.filterGroup}>
          {['day', 'week', 'month'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterBtn,
                filter === type && styles.activeFilter,
              ]}
              onPress={() => setFilter(type as typeof filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === type && styles.activeFilterText,
                ]}
              >
                {type === 'day' ? '일' : type === 'week' ? '주' : '월'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() =>
            setViewMode(prev => (prev === 'list' ? 'calendar' : 'list'))
          }
        >
          <Ionicons
            name={viewMode === 'list' ? 'calendar-outline' : 'list-outline'}
            size={24}
            color={colors.deepNavy}
          />
        </TouchableOpacity>
      </View>

      
      {viewMode === 'list' ? (
        hasRecords ? (
          <RecordList data={dummyRecords} />
        ) : (
          <GlassCard style={styles.card}>
            <Text style={styles.title}>아직 기록이 없어요</Text>
            <Text style={styles.subText}>
              여기에 수면 및 집중력 테스트 기록이 표시될 거예요
            </Text>
          </GlassCard>
        )
      ) : (
        <RecordCalendar
        filter={filter}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        records={dummyRecords}
        markedDates={markedDates} 
      />
      )}
      <Navbar />
    </View>
    </Layout>
  );
};

export default MyRecord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F6',
    paddingHorizontal: 20,
    paddingTop: Platform.select({ ios: 80, android: 60 }),
    paddingBottom: 90,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  backText: {
    color: colors.deepNavy,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 6,
  },
  controlBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.mediumGray,
  },
  filterText: {
    fontSize: 14,
    color: colors.deepNavy,
  },
  activeFilter: {
    backgroundColor: colors.softBlue,
    borderColor: colors.softBlue,
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderColor: 'rgba(200,200,200,0.4)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    marginTop: 20,
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
