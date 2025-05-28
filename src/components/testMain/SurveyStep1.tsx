import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function SurveyStep1 () {
    const navigation = useNavigation();
    const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
      {/* user 값 API 연동 시 받아오기 */}
      <Text style={styles.title}> (user)님의 평소 수면 습관을 알려주세요 ! <br/> (1/4)</Text>
      <Text style={styles.question}>평소 몇 시간 정도 주무시는 편인가요?</Text>

      {/* 선택지 */}
      <View style={styles.options}>
        <Text>① 5시간 미만</Text>
        <Text>② 5-6시간</Text>
        <Text>③ 6-7시간</Text>
        <Text>④ 7-8시간</Text>
        <Text>⑤ 8시간 이상</Text>
      </View>

      {/* 다음 버튼 */}
      <Pressable
        style={styles.button}
        // onPress={() => navigation.navigate('SurveyStep2')}
      >
        <Text style={styles.buttonText}>다음</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
      padding: 24, 
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20
    },
    title: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      textAlign: 'center', 
      marginBottom: 20
    },
    question: { 
      fontSize: 16, 
      textAlign: 'center', 
      marginBottom: 24 
    },
    options: { 
      gap: 12, 
      marginBottom: 24 
    },
    button: {
      backgroundColor: '#A9B8FF',
      paddingVertical: 12,
      borderRadius: 8,
      width: 100
    },
    buttonText: { 
      color: '#fff', 
      textAlign: 'center', 
      fontWeight: 'bold' 
    },
  });