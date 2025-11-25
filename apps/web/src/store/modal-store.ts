import { create } from "zustand";

export type ModalType =
  | "login"
  | "signup"
  | "profile"
  | "youtubeSearch"
  | "editPlaylist"
  | null;

interface ModalStore {
  currentModal: ModalType;
  modalData: number | null;
  open: (type: Exclude<ModalType, null>, data?: number) => void;
  close: () => void;
  isOpen: (type: Exclude<ModalType, null>) => boolean;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  currentModal: null,
  modalData: null,
  open: (type, data) => set({ currentModal: type, modalData: data }),
  close: () => set({ currentModal: null, modalData: null }),
  isOpen: (type) => get().currentModal === type,
}));
