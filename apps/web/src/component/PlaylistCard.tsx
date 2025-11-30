import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { IoPencil, IoPlaySharp } from "react-icons/io5";

interface IPlaylistCard {
  imgUrl: string;
  className?: string;
  onClick?: () => void;
  icon?: "playSharp" | "pencil";
  size?: "lg" | "md" | "sm";
}

export default function PlaylistCard({
  imgUrl,
  onClick,
  icon = "playSharp",
  size = "md",
  className,
}: IPlaylistCard) {
  const [isHovered, setIsHovered] = useState(false);

  function clickButton() {
    if (onClick) {
      onClick();
    }
  }

  const playSharpSize = {
    lg: "size-20",
    md: "size-15",
    sm: "size-10",
  };

  return (
    <button
      className={twMerge("rounded-sm relative", className)}
      type="button"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={clickButton}
    >
      <img src={imgUrl} className={twMerge("w-full aspect-video")} />
      {isHovered && (
        <div className=" absolute w-full h-full backdrop-blur-sm top-0 left-0 flex justify-center items-center">
          {icon === "playSharp" ? (
            <IoPlaySharp className={playSharpSize[size]} />
          ) : (
            <IoPencil className={playSharpSize[size]} />
          )}
        </div>
      )}
    </button>
  );
}
