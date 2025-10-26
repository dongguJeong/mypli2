import type React from "react";
import Gnb from "./Gnb";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full grid grid-rows-[auto_1fr] text-white">
      <Gnb />
      <div className="pt-3 grid grid-cols-[auto_1fr] h-full w-full">
        <Sidebar />
        <main className="flex-1 overflow-auto pr-10">{children}</main>
      </div>
    </div>
  );
}
