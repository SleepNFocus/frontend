import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { sleepQuestion3 } from 'src/mockup/surveyMockup';
import { TestSurveyStackParamList } from './Navigation';

export default function SurveyStep3 (){
    const navigation = useNavigation<NativeStackNavigationProp<TestSurveyStackParamList>>();

    const [selected, setSelected] = useState<{ [key: string]: string | null }>({
        fallAsleep: null,
        wakeCount: null,
      });

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleSelect = (questionId: string, value: string | null) => {
        setSelected((prev) => ({
            ...prev,
            [questionId]: value,
        }));
        };
      
    return(
        <TouchableWithoutFeedback onPress={() => openDropdown && setOpenDropdown(null)}>
            <View style={styles.container}>
                {/* 기존 제목 삭제 후 로고 (서비스명) 등록 */}
                <Text style={styles.title}> Focuz </Text>
                {/* user.nmae 값 API 연동 시 받아오기 - 소셜 자동 연동 */}
                <Text style={styles.question}> (user)님, {sleepQuestion3.text}</Text>

                {sleepQuestion3.subQuestions.map((q, index) => (
                <View key={q.id} 
                    style={[
                        styles.pressable,
                        { zIndex: sleepQuestion3.subQuestions.length - index }
                ]}>
                <Text style={styles.question}>{q.label}</Text>
                <DropDownPicker
                    open={openDropdown === q.id}
                    value={selected[q.id]}
                    items={q.options.map((opt) => ({
                    label: opt.label,
                    value: opt.value,
                    }))}
                    setOpen={(callback: boolean | ((prev: boolean) => boolean)) => {
                        const result = typeof callback === 'function' ? callback(openDropdown === q.id) : callback;
                        setOpenDropdown(result ? q.id : null);
                    }}
                    setValue={(callback) => {
                    const newValue = callback(selected[q.id]);
                    handleSelect(q.id, newValue);
                    }}
                    placeholder="선택하세요"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    zIndex={q.id === 'fallAsleep' ? 9000 : 1000}
                />
                </View>
                ))}

                <Pressable
                style={[
                    styles.button,
                    Object.values(selected).some((val) => !val) && styles.buttonDisabled
                ]}
                disabled={Object.values(selected).some((val) => !val)}
                //   onPress={() => navigation.navigate('SurveyStep4')}
                >
                <Text style={styles.buttonText}>다음</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: { 
      padding: 24, 
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'visible',
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
    //   zIndex: 1000,
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