import { create } from "zustand";

export type ModalType = "login" | "signup" | null;

interface ModalStore {
  currentModal: ModalType;
  open: (type: Exclude<ModalType, null>) => void;
  close: () => void;
  isOpen: (type: Exclude<ModalType, null>) => boolean;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  currentModal: null,
  open: (type) => set({ currentModal: type }),
  close: () => set({ currentModal: null }),
  isOpen: (type) => get().currentModal === type,
}));
