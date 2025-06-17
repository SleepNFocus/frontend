import { useEffect, useRef } from 'react';
import { Animated, Image, View, StyleSheet } from 'react-native';

export default function LogoAnimation() {
  const layoutMaskAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(layoutMaskAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/focuz_anim.png')}
          style={styles.image}
        />
        <Animated.View
          style={[styles.revealOverlay, { width: layoutMaskAnim }]}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#DFE3EA',
  },
  imageContainer: {
    width: 300,
    height: 60,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: 300,
    height: 60,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  revealOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 60,
    backgroundColor: '#DFE3EA',
    zIndex: 2,
  },
});
