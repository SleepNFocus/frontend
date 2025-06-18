import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { Button, Text } from 'react-native-paper';
import IntroScreen from './IntroScreen';
import KakaoLoginWebView from './KakaoLoginWebView';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/App';

export const SocialLogin: React.FC = () => {
  console.log('SocialLogin 컴포넌트 렌더링');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  console.log('navigation 확인:', navigation);

  const [isStarted, setIsStarted] = useState(false);
  const [showKakaoWebView, setShowKakaoWebView] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isStarted) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isStarted]);

  const handleSocialLogin = (provider: string) => {
    if (provider === '구글') {
      alert('구글 로그인은 아직 구현되지 않았습니다.');
    }
  };

  if (!isStarted) {
    return (
      <View style={{ flex: 1 }}>
        <IntroScreen onNext={() => setIsStarted(true)} />
      </View>
    );
  }

  if (showKakaoWebView) {
    return (
      <View style={{ flex: 1 }}>
        <KakaoLoginWebView />
      </View>
    );
  }

  return (
    <View style={styles.outer}>
      <View style={styles.card}>
        <Text variant="headlineSmall" style={styles.title}>
        소셜 로그인
        </Text>
  
        <Animated.View style={[styles.buttonGroup, { opacity: fadeAnim }]}>
          <Button
            mode="contained"
            icon={() => (
              <Image
                source={{ uri: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/kakaotalk_logo_icon_169195.png' }}
                style={styles.icon}
              />
            )}
            onPress={() => setShowKakaoWebView(true)}
            style={[styles.socialButton, { backgroundColor: '#FEE500' }]}
            labelStyle={{ color: '#3C1E1E', fontWeight: 'bold' }}
            contentStyle={{ paddingVertical: 10 }}
          >
            카카오로 로그인
          </Button>
  
          <Button
            mode="contained"
            icon={() => (
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
                style={styles.icon}
              />
            )}
            onPress={() => handleSocialLogin('구글')}
            style={[styles.socialButton, styles.googleButton]}
            labelStyle={{ color: '#222', fontWeight: 'bold' }}
            contentStyle={{ paddingVertical: 10 }}
          >
            구글로 로그인
          </Button>
        </Animated.View>
      </View>
    </View>
  );
}

  const styles = StyleSheet.create({
    outer: {
      flex: 1,
      backgroundColor: '#F7F9FC',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    card: {
      backgroundColor: '#fff',
      padding: 32,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 6,
      width: '100%',
      maxWidth: 360,
    },
    title: {
      marginBottom: 32,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#1F2937',
    },
    buttonGroup: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialButton: {
      flexDirection: 'row',
      borderRadius: 12,
      width: '100%',
      marginBottom: 16,
      elevation: 2,
    },
    googleButton: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
    },
    icon: {
      height: 24,
      width: 24,
      marginRight: 8,
      resizeMode: 'contain',
    },
  });
  
