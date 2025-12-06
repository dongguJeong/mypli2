import type React from "react";
import Gnb from "./Gnb";
import Sidebar from "./Sidebar";
import { useSoundPlayerStore } from "../../store/soundplayer-store";
import SoundPlayer from "../SoundPlayer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { currentPlaylist } = useSoundPlayerStore();
  return (
    <div className="w-full  min-h-screen grid grid-rows-[auto_1fr] text-white">
      <Gnb />
      <div className="pt-3 grid grid-cols-[auto_1fr] h-[calc(100vh-4rem)] w-full overflow-hidden">
        <div className="overflow-y-auto">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto  px-20 pt-10 bg-[#212121]">
          {children}
        </main>
        {currentPlaylist.length > 0 && <SoundPlayer />}
      </div>
    </div>
  );
}
