import React from 'react';
import { View, Text } from 'react-native';

const Records = () => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>수면 기록 목록</Text>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>테스트 결과 목록</Text>
      <Text style={{ fontSize: 20 }}>갤러리 뷰 / 리스트 뷰 전환</Text>
    </View>
  );
};

export default Records;
