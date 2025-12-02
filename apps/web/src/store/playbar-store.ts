import { create } from "zustand";
import type { ISong } from "../model/song";

type PlayStatus = "play" | "pause" | "stop" | null;

interface StoreState {
  currentVideoIndex: number;
  setCurrentVideoIndex: (value: number) => void;
  next: () => void;
  prev: () => void;
  currentPlaylist: ISong[];
  setCurrentPlaylist: (value: ISong[]) => void;
  playStatus: PlayStatus;
  setPlayStatus: (value: PlayStatus) => void;
}

export const useControlPlayingStore = create<StoreState>((set) => ({
  currentVideoIndex: 0,
  setCurrentVideoIndex: (value) => set({ currentVideoIndex: value }),
  next: () =>
    set((state) => {
      if (state.currentVideoIndex === state.currentPlaylist.length - 1) {
        return {
          currentVideoIndex: 0,
        };
      }
      return {
        currentVideoIndex: state.currentVideoIndex + 1,
      };
    }),
  prev: () =>
    set((state) => {
      if (state.currentVideoIndex === 0) {
        return {
          currentVideoIndex: state.currentPlaylist.length - 1,
          playStatus: "play",
        };
      }
      return {
        currentVideoIndex: state.currentVideoIndex - 1,
        playStatus: "play",
      };
    }),
  togglePlay: () =>
    set((state) => ({
      playStatus: state.playStatus === "play" ? "stop" : "play",
    })),

  currentPlaylist: [],
  setCurrentPlaylist: (value) =>
    set({
      currentPlaylist: value,
      currentVideoIndex: 0,
      playStatus: "play",
    }),

  playStatus: null,
  setPlayStatus: (status) => set({ playStatus: status }),

  requestStop: () => {
    set({
      playStatus: "stop",
      currentVideoIndex: 0,
      currentPlaylist: [],
    });
  },
}));
