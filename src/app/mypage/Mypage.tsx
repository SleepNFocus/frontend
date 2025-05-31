import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Navbar from '@/components/common/Navbar';
import ProfileEdit from './Profile';
import Settings from './Settings';

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('프로필 관리');

  const renderContent = () => {
    switch (selectedMenu) {
      case '프로필 관리':
        return <ProfileEdit />;

      case '설정':
        return <Settings />;
      case '기록 보기':
        return <Text style={styles.contentText}>기록 리스트 연동</Text>;
      case '과거 비교':
        return <Text style={styles.contentText}>과거랑 현재 비교등등 </Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.mainContent}>
        <View style={styles.menu}>
          {['프로필 관리', '설정', '기록 보기', '과거 비교'].map(item => (
            <TouchableOpacity key={item} onPress={() => setSelectedMenu(item)}>
              <Text style={styles.menuItem}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>{renderContent()}</View>
      </View>
    </View>
  );
};
export default MyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f4f1fd',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 48,
    paddingVertical: 32,
  },
  menu: {
    width: 200,
    justifyContent: 'flex-start',
    gap: 20,
  },
  menuItem: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingLeft: 48,
    justifyContent: 'flex-start',
  },
  contentText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '400',
  },
});
