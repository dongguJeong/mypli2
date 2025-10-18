import { useSideBarStore } from "../../store/sidebar-store";
import { useEffect, useRef } from "react";
import SideBarItem, { type ISideBarItem } from "./SidebarItem";
import {
  IoAddCircle,
  IoAddCircleOutline,
  IoFolderOpen,
  IoFolderOpenOutline,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const SIDE_ITEMS: Omit<ISideBarItem, "items">[] = [
  {
    outlineIcon: <IoFolderOpenOutline className="w-6 h-6" />,
    fillIcon: <IoFolderOpen className="w-6 h-6" />,
    shortTitle: "내 플리",
    longTitle: "내 플레이리스트",
    href: "/myPlaylist",
  },
  {
    outlineIcon: <IoHeartOutline className="w-6 h-6" />,
    fillIcon: <IoHeart className="w-6 h-6" />,
    shortTitle: "좋아요",
    longTitle: "내 좋아요 리스트",
    href: "/likes",
  },
  {
    outlineIcon: <IoAddCircleOutline className="w-6 h-6" />,
    fillIcon: <IoAddCircle className="w-6 h-6" />,
    shortTitle: "생성",
    longTitle: "생성",
    href: "/create",
  },
];

export default function SideBar() {
  const { isOpen, closeSideBar } = useSideBarStore();
  const sidebarRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;

      const hamburger = document.getElementById("hamburger-menu");
      const isClickOutside =
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        hamburger &&
        !hamburger.contains(target);

      if (isClickOutside) {
        closeSideBar();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [closeSideBar]);

  return (
    <ul
      ref={sidebarRef}
      className={twMerge(
        `fixed top-[3.5rem] left-0 
        h-[calc(100vh-3.5rem)] 
        z-100 
        overflow-y-auto 
        scrollbar-hide
        flex flex-col
        pl-3 pr-2 py-4
        `,
        isOpen
          ? "bg-black w-side-open gap-2 pt-6"
          : "bg-black w-side-close gap-6 py-4"
      )}
    >
      {SIDE_ITEMS.map((item) => (
        <SideBarItem key={item.href} {...item} items={[]}></SideBarItem>
      ))}
    </ul>
  );
}
