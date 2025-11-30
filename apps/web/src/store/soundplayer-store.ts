import { create } from "zustand";
import type { ISong } from "../model/song";

type PlayStatus = "play" | "pause" | "stop" | null;

interface StoreState {
  currentSongIndex: number;
  setCurrentSongIndex: (value: number) => void;
  next: () => void;
  prev: () => void;
  currentPlaylist: ISong[];
  setCurrentPlaylist: (value: ISong[]) => void;
  playStatus: PlayStatus;
  setPlayStatus: (value: PlayStatus) => void;
}

export const useSoundPlayerStore = create<StoreState>((set) => ({
  currentSongIndex: 0,
  setCurrentSongIndex: (value) => set({ currentSongIndex: value }),
  next: () =>
    set((state) => {
      if (state.currentSongIndex === state.currentPlaylist.length - 1) {
        return {
          currentSongIndex: 0,
        };
      }
      return {
        currentSongIndex: state.currentSongIndex + 1,
      };
    }),
  prev: () =>
    set((state) => {
      if (state.currentSongIndex === 0) {
        return {
          currentVideoIndex: state.currentPlaylist.length - 1,
          playStatus: "play",
        };
      }
      return {
        currentVideoIndex: state.currentSongIndex - 1,
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
      currentSongIndex: 0,
      playStatus: "play",
    }),

  playStatus: null,
  setPlayStatus: (status) => set({ playStatus: status }),

  requestStop: () => {
    set({
      playStatus: "stop",
      currentSongIndex: 0,
      currentPlaylist: [],
    });
  },
}));
