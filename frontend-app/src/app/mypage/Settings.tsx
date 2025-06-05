import React from 'react';
import { View, Text } from 'react-native';

const Settings = () => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        설정
      </Text>
      <Text>비밀번호 변경</Text>

      <Text>알림 설정</Text>
      <Text>계정 탈퇴</Text>
    </View>
  );
};

export default Settings;
