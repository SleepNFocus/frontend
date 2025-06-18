import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Text } from '@/components/common/Text';
import { colors } from '@/constants/colors';
import useUiStore from '@/store/uiStore';

const TOAST_COLORS = {
  error: colors.red,
  success: colors.green,
  warning: colors.yellow,
  info: colors.blue,
  confirm: colors.blue,
};

interface ToastProps {
  id: string;
  type?: keyof typeof TOAST_COLORS;
  message: string;
  subMessage?: string;
  visible: boolean;
  onHide?: () => void;
}

const Toast: React.FC<ToastProps> = ({ type = 'info', message, subMessage, visible, onHide }) => {
  const color = TOAST_COLORS[type] || colors.blue;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    } else {
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => onHide?.());
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim, borderLeftColor: color }]}> 
      <Text style={styles.message}>{message}</Text>
      {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
    </Animated.View>
  );
};

export const ToastList: React.FC = () => {
  const { toasts, closeToast } = useUiStore();
  const lastToast = toasts.length > 0 ? toasts[toasts.length - 1] : null;
  return (
    <View style={styles.toastList} pointerEvents="box-none">
      {lastToast && (
        <Toast
          key={lastToast.id}
          id={lastToast.id}
          type={lastToast.type}
          message={lastToast.message}
          subMessage={lastToast.subMessage}
          visible={true}
          onHide={() => closeToast(lastToast.id)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toastList: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  toast: {
    maxWidth: 320,
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 6,
    marginBottom: 10,
  },
  message: { fontWeight: 'bold', color: '#222' },
  subMessage: { color: '#888', marginTop: 2, fontSize: 12 },
});

export default Toast; 