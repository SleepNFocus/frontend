import { create } from 'zustand';
import { ReactNode } from 'react';

interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ToastState {
  id: string;
  type?: 'error' | 'success' | 'warning' | 'info' | 'confirm';
  message: string;
  subMessage?: string;
}

interface ModalStore {
  modals: {
    [key: string]: ModalState;
  };
  openModal: (type: string, modalState: ModalState) => void;
  closeModal: (type: string) => void;
  toasts: ToastState[];
  openToast: (type: ToastState['type'], message: string, subMessage?: string) => void;
  closeToast: (id: string) => void;
}

const useUiStore = create<ModalStore>(set => ({
  modals: {},
  openModal: (type, modalState) =>
    set(state => ({
      modals: {
        ...state.modals,
        [type]: { ...modalState, isOpen: true },
      },
    })),
  closeModal: type =>
    set(state => ({
      modals: {
        ...state.modals,
        [type]: { ...state.modals[type], isOpen: false },
      },
    })),
  toasts: [],
  openToast: (type, message, subMessage) => {
    const id = Math.random().toString(36).substr(2, 9);
    set(state => ({
      toasts: [
        ...state.toasts,
        { id, type, message, subMessage },
      ],
    }));
    setTimeout(() => {
      set(state => ({
        toasts: state.toasts.filter(t => t.id !== id),
      }));
    }, 2500);
  },
  closeToast: (id) =>
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== id),
    })),
}));

export default useUiStore;
