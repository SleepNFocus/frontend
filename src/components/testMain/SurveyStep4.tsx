import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { sleepQuestion4 } from 'src/mockup/surveyMockup';

export default function SurveyStep4 (){

    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({});

    const toggleOption = (id: string) => {
        setSelectedOptions((prev) => ({
        ...prev,
        [id]: !prev[id],
        }));
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Focuz</Text>
          <Text style={styles.question}>{sleepQuestion4.text}</Text>
    
          {sleepQuestion4.options.map((opt) => (
            <Pressable
              key={opt.id}
              onPress={() => toggleOption(opt.id)}
              style={[
                styles.option,
                selectedOptions[opt.id] && styles.optionSelected
              ]}
            >
              <Text style={styles.optionText}>
                {selectedOptions[opt.id] ? '⬛️' : '⬜'} {opt.label}
              </Text>
            </Pressable>
          ))}
    
          <Pressable
            style={styles.button}
            // onPress={() => navigation.navigate('다음화면')}
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
    },
    title: { fontSize: 40, fontWeight: 'bold', marginBottom: 10 },
    question: { fontSize: 18, marginBottom: 24, textAlign: 'center' },
    option: {
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 12,
      width: '70%',
    },
    optionSelected: {
      backgroundColor: '#e0e0ff',
      borderColor: '#6C7BFF',
    },
    optionText: {
      fontSize: 16,
    },
    score: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 24,
      marginBottom: 24,
    },
    button: {
      backgroundColor: '#6C7BFF',
      padding: 12,
      borderRadius: 8,
      width: 100,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });