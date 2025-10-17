import { create } from "zustand";

export type ModalType = "login" | "signup" | "mypage" | "mypageEdit" | null;

interface ModalState {
  currentModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  switchModal: (type: ModalType) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  currentModal: null,
  openModal: (type) => set({ currentModal: type }),
  closeModal: () => set({ currentModal: null }),
  switchModal: (type) => set({ currentModal: type }),
}));
