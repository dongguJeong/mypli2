import { useRef, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";

import { useNavigate } from "react-router";
import Button from "./Button";
import { IoPlaySharp } from "react-icons/io5";

interface IPlaylistCard {
  id: number;
  title: string;
  coverImage?: string;
}

export default function PlaylistCard({
  id,
  title,
  coverImage = "/no-image.jpg",
}: IPlaylistCard) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className=" cursor-pointer flex flex-col"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/playlist/${id}`)}
    >
      <div className="w-full h-20 relative">
        {isHovered && (
          <div className="w-full h-full bg-black absolute backdrop-blur-sm top-0 left-0 justify-center items-center opacity-70 z-30">
            <IoPlaySharp className="w-8 h-8" />
          </div>
        )}
        <img src={coverImage} />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xl">{title}</span>
        <Button ghost color="white" buttonSize="sm" className="relative">
          <GoKebabHorizontal />
        </Button>
      </div>
    </div>
  );
}
