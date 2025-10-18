import type React from "react";
import { useLocation } from "react-router-dom";
import Gnb from "./Gnb";
import { useSideBarStore } from "../../store/sidebar-store";
import { twMerge } from "tailwind-merge";
import SideBar from "./Sidebar";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  const location = useLocation();
  const avoidPages = ["/create", "/edit"];
  const { isOpen } = useSideBarStore();
  return (
    <div className="text-white w-full h-full ">
      <Gnb />
      <SideBar />
      <main
        className={twMerge(
          "w-full h-full transition-all duration-300",
          isOpen
            ? "ml-[var(--width-side-open)]"
            : "ml-[var(--width-side-close)]"
        )}
      >
        {children}
      </main>
    </div>
  );
}
