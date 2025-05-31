import React, { useRef } from 'react';
import { View, Text, Modal as RNModal, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useUiStore from '@/store/uiStore';
import { colors } from '@/constants/colors';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 420,
    minHeight: 200,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 24,
    shadowColor: colors.textColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textColor,
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: colors.mediumGray,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  errorConfirmButton: {
    backgroundColor: colors.goldOrange,
  },
  errorCancelButton: {
    borderWidth: 1,
    borderColor: colors.goldOrange,
  },
  successConfirmButton: {
    backgroundColor: colors.softBlue,
  },
  successCancelButton: {
    borderWidth: 1,
    borderColor: colors.softBlue,
  },
  warningConfirmButton: {
    backgroundColor: colors.softOrange,
  },
  warningCancelButton: {
    borderWidth: 1,
    borderColor: colors.softOrange,
  },
  infoConfirmButton: {
    backgroundColor: colors.midnightBlue,
  },
  infoCancelButton: {
    borderWidth: 1,
    borderColor: colors.midnightBlue,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  cancelButtonText: {
    color: colors.textColor,
    fontSize: 14,
    fontWeight: '500',
  },
});

const ICON_MAP = {
  error: {
    icon: <Ionicons name="close-circle" size={24} color={colors.goldOrange} />,
    confirmStyle: styles.errorConfirmButton,
    cancelStyle: styles.errorCancelButton,
    role: "alertdialog",
  },
  success: {
    icon: <Ionicons name="checkmark-circle" size={24} color={colors.softBlue} />,
    confirmStyle: styles.successConfirmButton,
    cancelStyle: styles.successCancelButton,
    role: "alertdialog",
  },
  warning: {
    icon: <Ionicons name="warning" size={24} color={colors.softOrange} />,
    confirmStyle: styles.warningConfirmButton,
    cancelStyle: styles.warningCancelButton,
    role: "alertdialog",
  },
  info: {
    icon: <Ionicons name="information-circle" size={24} color={colors.midnightBlue} />,
    confirmStyle: styles.infoConfirmButton,
    cancelStyle: styles.infoCancelButton,
    role: "dialog",
  },
  confirm: {
    icon: <Ionicons name="information-circle" size={24} color={colors.midnightBlue} />,
    confirmStyle: styles.infoConfirmButton,
    cancelStyle: styles.infoCancelButton,
    role: "dialog",
  },
};

type ModalType = 'error' | 'success' | 'warning' | 'info' | 'confirm';

interface ModalProps {
  type?: ModalType;
  closeOnOutsideClick?: boolean;
}

/**
 * 모달 컴포넌트 - Zustand와 통합
 * @param {Object} props
 * @param {string} props.type - 모달 타입 ('error' | 'success' | 'warning' | 'info' | 'confirm')
 * @param {boolean} props.closeOnOutsideClick - 외부 클릭 시 닫기 여부 (기본값: true)
 */
const Modal: React.FC<ModalProps> = ({ type = 'info', closeOnOutsideClick = true }) => {
  const modalRef = useRef<View>(null);
  
  // Zustand 스토어 사용
  const { 
    modals, 
    closeModal 
  } = useUiStore();
  
  const modal = modals[type];
  const isOpen = modal?.isOpen || false;
  const title = modal?.title || '';
  const content = modal?.content || '';
  const confirmText = modal?.confirmText || '확인';
  const cancelText = modal?.cancelText || '취소';
  const onConfirm = modal?.onConfirm;
  const onCancel = modal?.onCancel;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeModal(type);
  };
  
  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal(type);
  };

  const handleOutsideClick = () => {
    if (closeOnOutsideClick) {
      closeModal(type);
    }
  };

  const { icon, confirmStyle, cancelStyle, role } = ICON_MAP[type];

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => closeModal(type)}
    >
      <Pressable 
        style={styles.overlay}
        onPress={handleOutsideClick}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* 내용 */}
            <View style={styles.contentContainer}>
              {icon}
              <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
              </View>
            </View>

            {/* 버튼 */}
            <View style={styles.buttonContainer}>
              {(type === 'confirm' || type === 'warning' || type === 'error') && cancelText && (
                <TouchableOpacity
                  onPress={handleCancel}
                  style={[styles.button, cancelStyle]}
                >
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handleConfirm}
                style={[styles.button, confirmStyle]}
              >
                <Text style={styles.confirmButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </RNModal>
  );
};

export default Modal; 