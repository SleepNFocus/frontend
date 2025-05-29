import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { sleepQuestion1 } from 'src/mockup/surveyMockup';
import DropDownPicker from 'react-native-dropdown-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TestSurveyStackParamList } from './Navigation';

export default function SurveyStep1 () {
    const navigation = useNavigation<NativeStackNavigationProp<TestSurveyStackParamList>>();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const [items, setItems] = useState(
      sleepQuestion1.options.map((opt) => ({
        label: opt.label,
        value: opt.value,
      }))
    );

  return (
    <TouchableWithoutFeedback onPress={() => open && setOpen(false)}>
      <View style={styles.container}>
        {/* 기존 제목 삭제 후 로고 (서비스명) 등록 */}
        <Text style={styles.title}> Focuz </Text>
        {/* user.nmae 값 API 연동 시 받아오기 - 소셜 자동 연동 */}
        <Text style={styles.question}> (user)님, {sleepQuestion1.text}</Text>

        <Pressable style={styles.pressable} onPress={() => open && setOpen(false)}>
        <DropDownPicker
          open={open}
          value={selected}
          items={items}
          setOpen={setOpen}
          setValue={setSelected}
          setItems={setItems}
          placeholder="수면 시간을 선택하세요"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          listMode="SCROLLVIEW"
          dropDownDirection="AUTO"
        />
        </Pressable>

        <Pressable
          style={[
            styles.button,
            !selected && styles.buttonDisabled
          ]}
          disabled={!selected}
          onPress={() => navigation.navigate('SurveyStep2')}
        >
          <Text style={styles.buttonText}>다음</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: { 
      padding: 24, 
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: { 
      fontSize: 40, 
      fontWeight: 'bold', 
      textAlign: 'center', 
      padding: 10
    },
    question: { 
      fontSize: 16, 
      textAlign: 'center', 
      marginBottom: 24 
    },
    pressable: {
      marginBottom: 20,
      zIndex: 1000
    },
    dropdown: {
      width: 250,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
    },
    dropdownContainer: {
      width: 250,
      borderColor: '#ccc',
      borderRadius: 8,
      maxHeight:180
    },
    button: {
      backgroundColor: '#6C7BFF',
      paddingVertical: 12,
      borderRadius: 8,
      width: 100
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
    },
    buttonText: { 
      color: '#fff', 
      textAlign: 'center', 
      fontWeight: 'bold' 
    },
  });