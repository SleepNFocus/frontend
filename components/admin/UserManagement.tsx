import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, ViewStyle } from 'react-native';
import { Card, Text } from '../../components/common';
import { useTheme } from 'react-native-paper';
import { getResponsiveStyle } from '../../utils/responsive';

// User 타입 정의: 사용자 정보 구조
interface User {
  id: string;         // 사용자 고유 ID
  name: string;       // 이름
  email: string;      // 이메일
  role: 'admin' | 'user'; // 역할(관리자/일반)
  lastLogin: string;  // 마지막 로그인 시간
}

// 임시 사용자 데이터(목업)
const mockUsers: User[] = [
  {
    id: '1',
    name: '홍길동',
    email: 'hong@example.com',
    role: 'admin',
    lastLogin: '2024-03-20 14:30',
  },
  {
    id: '2',
    name: '김철수',
    email: 'kim@example.com',
    role: 'user',
    lastLogin: '2024-03-19 09:15',
  },
];

// UserManagement: 관리자 - 사용자 관리 페이지
export const UserManagement: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // 선택된 사용자

  // 검색어에 따라 사용자 필터링
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 사용자 카드 스타일
  const userCardStyle: ViewStyle = {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.outline,
  };

  // 상세 정보 카드 스타일
  const detailCardStyle: ViewStyle = {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.outline,
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text variant="headlineMedium" style={styles.title}>사용자 관리</Text>
        {/* 사용자 검색 입력창 */}
        <TextInput
          style={[styles.searchInput, { borderColor: theme.colors.outline }]}
          placeholder="사용자 검색..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {/* 사용자 목록 */}
        <View style={styles.userList}>
          {filteredUsers.map(user => (
            <Card
              key={user.id}
              style={userCardStyle}
              onPress={() => setSelectedUser(user)}
            >
              <Text variant="titleMedium">{user.name}</Text>
              <Text variant="bodyMedium">{user.email}</Text>
              <Text variant="bodySmall">역할: {user.role === 'admin' ? '관리자' : '일반 사용자'}</Text>
              <Text variant="bodySmall">마지막 로그인: {user.lastLogin}</Text>
            </Card>
          ))}
        </View>
        {/* 선택된 사용자 상세 정보 */}
        {selectedUser && (
          <Card style={detailCardStyle}>
            <Text variant="titleLarge">사용자 상세 정보</Text>
            <Text variant="bodyLarge">이름: {selectedUser.name}</Text>
            <Text variant="bodyLarge">이메일: {selectedUser.email}</Text>
            <Text variant="bodyLarge">역할: {selectedUser.role === 'admin' ? '관리자' : '일반 사용자'}</Text>
            <Text variant="bodyLarge">마지막 로그인: {selectedUser.lastLogin}</Text>
          </Card>
        )}
      </Card>
    </ScrollView>
  );
};

// 스타일 정의 (Material Design 3 기준)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  userList: {
    gap: 8,
  },
}); 