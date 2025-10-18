import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import type { Playlist } from "../../models/playlist.model";
import type { Like } from "../../models/like.model";
import { useSideBarStore } from "../../store/sidebar-store";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Button from "../Button";

export interface ISideBarItem {
  longTitle: string;
  shortTitle: string;
  items: Like[] | Playlist[] | [];
  outlineIcon: React.ReactNode;
  fillIcon: React.ReactNode;
  href: string;
}

export default function SideBarItem({
  shortTitle,
  longTitle,
  items = [],
  outlineIcon,
  fillIcon,
  href,
}: ISideBarItem) {
  const [showAll, setShowAll] = useState(false);
  const { isOpen } = useSideBarStore();

  const location = useLocation();
  const navigate = useNavigate();
  const handleClickMore = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <ul>
      <Button
        ghost
        className={twMerge(
          isOpen
            ? "flex gap-4 cursor-pointer pl-5 h-fit hover:bg-white/10"
            : "flex flex-col items-center cursor-pointer p-1 gap-1 rounded-sm hover:bg-white/10"
        )}
      >
        {location.pathname.includes(href) ? fillIcon : outlineIcon}
        {isOpen ? (
          <span>{longTitle}</span>
        ) : (
          <span className="text-xs">{shortTitle}</span>
        )}
      </Button>
      {isOpen && (
        <ul>
          {items?.slice(0, showAll ? items.length : 5).map((item) => (
            <Button
              key={item.id}
              ghost
              onClick={() => navigate(`/playlist/${item.id}`)}
              className="flex items-center gap-5 pl-5
                 hover:bg-white/10 rounded-sm 
                hover:text-white"
            >
              <img
                src={item.coverImage ? item.coverImage : "/blur.png"}
                width={40}
                height={40}
                alt={`${item.title} 커버 이미지`}
              />
              <span>
                {item.title.length < 6
                  ? item.title
                  : item.title.slice(0, 6) + "..."}
              </span>
            </Button>
          ))}
          <Button
            ghost
            className="flex items-center gap-5  hover:bg-white/10 pl-5
            rounded-md hover:text-white text-sm"
            onClick={handleClickMore}
            aria-expanded={showAll}
          >
            {showAll ? (
              <IoIosArrowUp className="w-6 h-6" />
            ) : (
              <IoIosArrowDown className="w-6 h-6" />
            )}

            {showAll ? "간략히 보기" : "더보기"}
          </Button>
        </ul>
      )}
    </ul>
  );
}
