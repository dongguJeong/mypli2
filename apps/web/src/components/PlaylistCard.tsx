import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoPlaySharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import type { Playlist } from "../models/playlist.model";

interface IPlalist extends Playlist {
  size?: "large" | "small";
  onDelete?: () => void;
}

const Card = ({ size = "large", onDelete, ...props }: IPlalist) => {
  const navigate = useNavigate();
  const { isloggedIn } = useAuthStore();
  const { openLoginModal } = useLoginModalStore();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col cursor-pointer relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() =>
          isloggedIn ? navigate(`/playlist/${props.id}`) : openLoginModal()
        }
      >
        <div className={`relative ${size === "small" ? "w-full" : ""}`}>
          {isHovered && (
            <div className="w-full h-full bg-black absolute backdrop-blur-sm top-0 left-0 flex justify-center items-center opacity-70 z-30">
              <IoPlaySharp size={size === "large" ? 87 : 60} />
            </div>
          )}
          {props.coverImage ? (
            <image
              width={640}
              height={360}
              src={props.coverImage}
              alt={props.title}
              className={`rounded-2xl object-cover object-top w-full h-full ${
                size === "large" ? "aspect-video" : "aspect-square"
              }`}
            />
          ) : (
            <div
              className={`rounded-2xl object-cover object-top w-full h-full bg-[#545454] flex justify-center items-center text-[#545454] ${
                size === "large" ? "aspect-video" : "aspect-square"
              }`}
            >
              <image
                src="/logo-gray.png"
                alt="logos for no cover images"
                width={100}
                height={50}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex-between">
        <h4 className={`w-full text-[16px] line-clamp-1 mt-2`}>
          {props.title}
        </h4>
        {onDelete && (
          <button onClick={onDelete} type="button">
            <FaRegTrashAlt />
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
