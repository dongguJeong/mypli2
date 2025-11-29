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
  playlistId: number | null;
  open: (type: Exclude<ModalType, null>, data?: number) => void;
  close: () => void;
  isOpen: (type: Exclude<ModalType, null>) => boolean;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  currentModal: null,
  playlistId: null,
  open: (type) => set({ currentModal: type }),
  close: () => set({ currentModal: null }),
  setPlaylistId: (id: number | null) => set({ playlistId: id }),
  isOpen: (type) => get().currentModal === type,
}));
