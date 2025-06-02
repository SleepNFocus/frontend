import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
  Platform,
  Alert,
} from 'react-native';

const slides = [
  {
    key: '1',
    title: '당신의 잠, 퍼포먼스가 되다.',
    subtitle:
      '어젯밤 수면이 오늘의 당신에게 어떤 영향을 미치는지,\n간단한 게임으로 확인하고 관리해보세요.',
    background: require('../../assets/onboarding1.jpg'),
  },
  {
    key: '2',
    title: '수면 기록을 시각화하세요.',
    subtitle: '패턴을 파악하고 건강한 루틴을 만들어보세요.',
    background: require('../../assets/onboarding2.jpg'),
  },
  {
    key: '3',
    title: '지금 바로 시작해보세요.',
    subtitle: '',
    background: require('../../assets/onboarding3.jpg'),
  },
];

export default function OnboardingWithSocial() {
  const { width, height } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleStart = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setIsStarted(true));
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert(`${provider} 로그인은 아직 구현되지 않았습니다.`);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={width}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        showsHorizontalScrollIndicator={false}
        data={slides}
        keyExtractor={item => item.key}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ height }}
        renderItem={({ item, index }) => (
          <View style={{ width, height }}>
            <ImageBackground
              source={item.background}
              style={{ width, height }}
              resizeMode="cover"
            >
              <View style={styles.overlay}>
                {index === slides.length - 1 && isStarted ? (
                  <Animated.View
                    style={[styles.socialLoginContainer, { opacity: fadeAnim }]}
                  >
                    <Text style={styles.socialTitle}>소셜 로그인</Text>

                    <TouchableOpacity
                      style={[styles.socialButton, styles.kakaoButton]}
                      onPress={() => handleSocialLogin('카카오')}
                    >
                      <Text style={styles.kakaoText}>카카오로 로그인</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.socialButton, styles.googleButton]}
                      onPress={() => handleSocialLogin('구글')}
                    >
                      <Text style={styles.googleText}>구글로 로그인</Text>
                    </TouchableOpacity>
                  </Animated.View>
                ) : (
                  <>
                    <Text style={styles.title}>{item.title}</Text>
                    {item.subtitle !== '' && (
                      <Text style={styles.subtitle}>{item.subtitle}</Text>
                    )}

                    {index === slides.length - 1 && (
                      <TouchableOpacity
                        style={styles.startButton}
                        onPress={handleStart}
                      >
                        <Text style={styles.startButtonText}>시작하기</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            </ImageBackground>
          </View>
        )}
      />

      {(!isStarted || currentIndex !== slides.length - 1) && (
        <View style={styles.dotsContainer} pointerEvents="none">
          {slides.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, currentIndex === idx && styles.activeDot]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    color: '#ddd',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 24,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  socialLoginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButton: {
    width: 240,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  kakaoText: {
    color: '#3C1E1E',
    fontWeight: 'bold',
  },
  googleText: {
    color: '#222',
    fontWeight: 'bold',
  },
  socialTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#fff',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
});
