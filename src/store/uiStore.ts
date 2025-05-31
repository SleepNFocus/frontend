import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalStore {
  modals: {
    [key: string]: ModalState;
  };
  openModal: (type: string, modalState: ModalState) => void;
  closeModal: (type: string) => void;
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
}));

export default useUiStore;
