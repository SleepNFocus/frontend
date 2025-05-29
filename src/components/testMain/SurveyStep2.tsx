import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { sleepQuestion2 } from "src/mockup/surveyMockup";
import { TestSurveyStackParamList } from "./Navigation";

export default function SurveyStep2 () {

    const navigation = useNavigation<NativeStackNavigationProp<TestSurveyStackParamList>>()
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (option: string) => {
        setSelected(option);
        };

    return (
          <View style={styles.container}>
            {/* 기존 제목 삭제 후 로고 (서비스명) 등록 */}
            <Text style={styles.title}> Focuz </Text>
            {/* user.nmae 값 API 연동 시 받아오기 - 소셜 자동 연동 */}
            <Text style={styles.question}> (user)님, {sleepQuestion2.text}</Text>
    
            {sleepQuestion2.options.map((option) => (
                <Pressable
                    key={option.value}
                    onPress={() => handleSelect(option.value)}
                    style={styles.optionWrapper}
                >
                    <View style={styles.radioCircle}>
                    {selected === option.value && <View style={styles.radioInnerCircle} />}
                    </View>
                    <Text style={styles.optionText}>{option.label}</Text>
                </Pressable>
                ))}

            <Pressable
              style={[
                styles.button,
                !selected && styles.buttonDisabled
              ]}
              disabled={!selected}
            //   onPress={() => navigation.navigate('SurveyStep3')}
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
    optionWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioCircle: {
      height: 14,
      width: 14,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#6C7BFF',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    radioInnerCircle: {
      height: 7,
      width: 7,
      borderRadius: 5,
      backgroundColor: '#6C7BFF',
    },
    optionText: {
      fontSize: 14,
      color: '#333',
    },
    button: {
      backgroundColor: '#6C7BFF',
      paddingVertical: 12,
      marginTop: 20,
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