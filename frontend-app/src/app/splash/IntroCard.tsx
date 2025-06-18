import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import { RootStackParamList } from '@/App';
import { useAuthStore } from '@/store/authStore';
// import KakaoWebView from '@/app/auth/KakaoWebView';
// Intro: Focuz 전체화면 인트로/랜딩 페이지
export const IntroCard: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isLogin, user, setLogin, setUser } = useAuthStore();

  // 이미 로그인한 기존 사용자라면 대시보드로 바로 이동
  // useEffect(() => {
  //   const checkUserStatus = async () => {
  //     try {
  //       // 현재 로그인 상태 확인
  //       if (isLogin && user) {
  //         navigation.navigate('Dashboard');
  //         return;
  //       }

  //       // AsyncStorage에서 이전 로그인 정보 확인
  //       const hasLoggedInBefore = await AsyncStorage.getItem('hasLoggedInBefore');
  //       const isOnboardingComplete = await AsyncStorage.getItem('onboardingComplete');

  //       // 이전에 로그인한 적이 있고 온보딩을 완료한 사용자라면 대시보드로 바로 이동
  //       if (hasLoggedInBefore === 'true' && isOnboardingComplete === 'true') {
  //         navigation.navigate('Dashboard');
  //       }
  //     } catch (error) {
  //       console.log('사용자 상태 확인 중 오류:', error);
  //     }
  //   };

  //   checkUserStatus();
  // }, [isLogin, user, navigation]);

  const handleStart = () => {
    if (onStart) {
      onStart();
    } else {
      navigation.navigate('Onboarding');
    }
  };

  const handleKakaoLogin = () => {
    navigation.navigate('KakaoWebView');
    // 카카오 로그인 구현 예정
    Alert.alert('카카오 로그인', '카카오 로그인이 구현될 예정입니다.', [
      {
        text: '확인',
        style: 'default',
      },
    ]);
  };

  const handleGoogleLogin = async () => {
    try {
      // 구글 로그인 구현 예정 (주석처리)
      // Alert.alert('구글 로그인', '구글 로그인이 구현될 예정입니다.');

      // 임시: 바로 로그인 처리하고 대시보드로 이동
      await setLogin(true);
      await setUser({
        id: 1,
        email: 'google@example.com',
        nickname: '구글사용자',
        image_url: '',
      });

      // 온보딩 완료 상태도 저장
      await AsyncStorage.setItem('onboardingComplete', 'true');

      navigation.navigate('Dashboard');
    } catch (error) {
      console.log('구글 로그인 오류:', error);
    }
  };

  return (
    <View style={styles.root}>
      <Image
        source={require('@/assets/focuz_name_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text variant="titleLarge" style={styles.title}>
        당신의 잠, 퍼포먼스가 되다.
      </Text>
      <Text variant="bodyLarge" style={styles.desc}>
        어젯밤 수면이 오늘의 당신에게 어떤 영향을 미치는지,{'\n'}간단한 게임으로
        확인하고 관리해보세요.
      </Text>

      <Button
        title="시작하기"
        onPress={handleStart}
        variant="primary"
        style={styles.button}
      />

      <View style={styles.socialLoginContainer}>
        <Text variant="bodyMedium" style={styles.socialLoginTitle}>
          소셜 계정으로 시작하기
        </Text>
        <View style={styles.socialButtonColumn}>
          <TouchableOpacity
            onPress={handleKakaoLogin}
            activeOpacity={0.8}
            style={styles.kakaoButton}
          >
            <Image
              source={require('@/assets/kakao_login_large_wide.png')}
              style={styles.kakaoButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.googleSignInButton}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
          >
            <View style={styles.googleButtonContent}>
              <View style={styles.googleLogoBox}>
                <Image
                  source={require('@/assets/google.png')}
                  style={styles.googleLogo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.googleSignInText}>Google 로그인</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    backgroundColor: colors.mediumLightGray,
    paddingHorizontal: 16,
  },
  logo: {
    width: 200,
    height: 60,
  },
  title: {
    fontWeight: 'bold',
    color: colors.deepNavy,
    textAlign: 'center',
  },
  desc: {
    color: colors.midnightBlue,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    width: '100%',
    backgroundColor: colors.softBlue,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.mediumGray,
  },
  dividerText: {
    marginHorizontal: 16,
    color: colors.mediumGray,
  },
  socialLoginContainer: {
    width: '100%',
    gap: 12,
  },
  socialLoginTitle: {
    color: colors.mediumGray,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  socialButtonColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  kakaoButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  kakaoButtonImage: {
    width: 260,
    height: 40,
  },

  googleSignInButton: {
    backgroundColor: '#4285F4',
    borderRadius: 4,
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: 260,
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  googleLogoBox: {
    width: 36,
    height: 36,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 2,
    top: 2,
    borderRadius: 2,
  },
  googleLogo: {
    width: 20,
    height: 20,
  },
  googleSignInText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto',
    textAlign: 'center',
    flex: 1,
    marginLeft: 40,
  },
});
