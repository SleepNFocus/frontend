import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';




const ProfileEdit =  () => {
    const [nickname, setNickname] = useState('');
return (
<View style={styles.container}>
<View style={styles.imageWrap}>
<Image 
source = {{uri: 'https://via.placeholder.com/100'}}
style={styles.profileImage} />
<TouchableOpacity>
<Text style={styles.changeText}>이미지 변경</Text>
</TouchableOpacity>
</View>


<View style={styles.inputWrap}>
    <Text style={styles.label}>닉네임</Text>
    <TextInput style={styles.input}
    placeholder="닉네임을 입력하세요"
    value={nickname}
    onChangeText={(text) => setNickname(text)}
/>
</View>

</View>
);
}



export defalut ProfileEdit;

const styles = StyleSheet.create({
    container: {
      gap: 24,
      padding: 24,
    },
    imageWrap: {
      alignItems: 'center',
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#ccc',
    },
    changeText: {
      color: '#6C7BFF',
      marginTop: 8,
    },
    inputWrap: {
        marginTop: 24,
      },
  });