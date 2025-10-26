import { useLocation, useNavigate } from "react-router";
import Button from "../Button";
import {
  IoFolderOpen,
  IoFolderOpenOutline,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";
import { useSidebarStore } from "../../store/sidebar-store";
import { twMerge } from "tailwind-merge";

const items = [
  {
    href: "mypli",
    shortTitle: "내 플리",
    longTitle: "내 플레이리스트",
    outlineIcon: <IoFolderOpenOutline className="w-6 h-6" />,
    fillIcon: <IoFolderOpen className="w-6 h-6" />,
  },
  {
    href: "like",
    shortTitle: "좋아요",
    longTitle: "좋아요한 플레이리스트",
    outlineIcon: <IoHeartOutline className="w-6 h-6" />,
    fillIcon: <IoHeart className="w-6 h-6" />,
  },
];

export default function Sidebar() {
  const { isOpen } = useSidebarStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <aside className="h-full pl-8 pr-4 flex flex-col ">
      {items.map((v) => (
        <Button
          color="white"
          ghost
          className={twMerge(
            "hover:bg-white/10 rounded-md",
            isOpen ? "flex gap-8 pl-4" : "flex flex-col gap-2",
            pathname === v.href ? "hover:bg-white/10" : "bg-transparent"
          )}
          onClick={() => navigate(v.href)}
        >
          {pathname === v.href ? v.fillIcon : v.outlineIcon}
          <span className={isOpen ? "text-base" : "text-xs"}>
            {isOpen ? v.longTitle : v.shortTitle}
          </span>
        </Button>
      ))}
    </aside>
  );
}
