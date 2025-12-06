import { useLocation, useNavigate } from "react-router";
import Button from "../Button";
import {
  IoFolderOpen,
  IoFolderOpenOutline,
  IoHomeOutline,
  IoHomeSharp,
} from "react-icons/io5";
import { useSidebarStore } from "../../store/sidebar-store";
import { twMerge } from "tailwind-merge";
import {
  FaRegBookmark,
  FaBookmark,
  FaThumbsUp,
  FaRegThumbsUp,
} from "react-icons/fa";

const items = [
  {
    href: "/",
    shortTitle: "홈",
    longTitle: "홈",
    outlineIcon: <IoHomeOutline className="w-6 h-6" />,
    fillIcon: <IoHomeSharp className="w-6 h-6" />,
  },
  {
    href: "/mypli",
    shortTitle: "내 플리",
    longTitle: "내 플레이리스트",
    outlineIcon: <IoFolderOpenOutline className="w-6 h-6" />,
    fillIcon: <IoFolderOpen className="w-6 h-6" />,
  },
  {
    href: "/bookmark",
    shortTitle: "북마크",
    longTitle: "북마크한 플레이리스트",
    outlineIcon: <FaRegBookmark className="w-6 h-6" />,
    fillIcon: <FaBookmark className="w-6 h-6" />,
  },
  {
    href: "/bulletin",
    shortTitle: "추천",
    longTitle: "추천 게시판",
    outlineIcon: <FaRegThumbsUp className="w-6 h-6" />,
    fillIcon: <FaThumbsUp className="w-6 h-6" />,
  },
];

export default function Sidebar() {
  const { isOpen } = useSidebarStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <aside className="h-full pl-8 pr-4 flex flex-col sticky top-0 ">
      {items.map((v) => (
        <Button
          key={v.href}
          color="white"
          ghost
          className={twMerge(
            "hover:bg-white/10 rounded-md ",
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
