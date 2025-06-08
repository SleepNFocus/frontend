import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  // useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { useAuthStore } from '@/store/authStore';

const Settings = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // const { width } = useWindowDimensions();
  // const isMobile = width < 600; 웹에서도 필요하면 추가, 필요 없으면 삭제

  const user = useAuthStore(state => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 정보 수정</Text>
      </View>

      <View style={styles.profileBox}>
        <Image
          source={require('@/assets/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.nickname}>{user?.nickname ?? '-'}</Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.itemRow}
          onPress={() => navigation.navigate('NicknameEdit')}
        >
          <Text style={styles.label}>닉네임</Text>
          <Text style={styles.nickname}>{user?.nickname ?? '-'}</Text>
          <View style={styles.rightWrap}>
            <Text style={styles.value}>{user?.nickname ?? '-'}</Text>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </View>
        </TouchableOpacity>

        <View style={styles.itemRow}>
          <Text style={styles.label}>아이디</Text>
          <Text style={styles.value}>TES@TEST.COM</Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.label}>가입일</Text>
          <Text style={styles.value}>2024.01.01</Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.label}>연동된 계정</Text>
          <View style={styles.rightWrap}>
            <Image
              source={require('@/assets/google.png')}
              style={styles.icon}
            />
            <Text style={[styles.value, { color: '#9EDC7A' }]}>Google</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D2B',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C40',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  nickname: {
    fontSize: 18,
    color: '#fff',
  },
  card: {
    backgroundColor: '#1C1C40',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#34346A',
  },
  label: {
    color: '#fff',
    fontSize: 14,
  },
  value: {
    color: '#ccc',
    fontSize: 14,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  rightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonGroup: {
    gap: 12,
  },
  button: {
    backgroundColor: '#252556',
    padding: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
});
