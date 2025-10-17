import { create } from "zustand";

interface StoreState {
  isOpen: boolean;
  openSideBar: () => void;
  closeSideBar: () => void;
  toggleSideBar: () => void;
}

export const useSideBarStore = create<StoreState>((set) => ({
  isOpen: false,
  openSideBar: () => {
    set({ isOpen: true });
  },
  closeSideBar: () => {
    set({ isOpen: false });
  },
  toggleSideBar: () => {
    set((state) => {
      return { isOpen: !state.isOpen };
    });
  },
}));
