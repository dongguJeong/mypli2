import { useState } from "react";
import { useNavigate } from "react-router";
import { IoPlaySharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import MoreButton from "./MoreButton";
import { usePlaylist } from "../hook/usePlaylist";
import { useModalStore } from "../store/modal-store";
import EditPlaylistModal from "./modals/EditPlaylistModal";

interface IPlaylistCard {
  id: number;
  title: string;
  thumbnailUrl: string | undefined | null;
  imgClassName?: string;
  page: "home" | "bookmark" | "myplaylist";
  moreButton: boolean;
  key?: string;
}

export default function PlaylistCard({
  id,
  title,
  thumbnailUrl = "/no-image.jpg",
  imgClassName,
  page = "home",
  moreButton = true,
  key,
}: IPlaylistCard) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { deletePlaylist } = usePlaylist();
  const { open } = useModalStore();
  function clickPlaylist(id: number) {
    navigate(`/playlist/${id}`);
  }

  return (
    <>
      <EditPlaylistModal />
      <div
        className=" cursor-pointer flex flex-col gap-2"
        key={key}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative rounded-sm" onClick={() => clickPlaylist(id)}>
          {isHovered && (
            <div className="w-full h-full flex  bg-black absolute backdrop-blur-sm top-0 left-0 justify-center items-center opacity-70 z-30">
              <IoPlaySharp className="w-15 h-15" />
            </div>
          )}
          <img
            src={thumbnailUrl ?? "no-image.jpg"}
            className={twMerge("w-full h-full", imgClassName)}
          />
        </div>
        <div className="flex justify-between items-center">
          <span
            onClick={() => clickPlaylist(id)}
            className="hover:underline pl-2"
          >
            {title}
          </span>
          {moreButton && (
            <MoreButton
              items={
                page === "myplaylist"
                  ? [
                      {
                        text: "수정",
                        onClick: () => {
                          open("editPlaylist", id);
                        },
                      },
                      {
                        text: "삭제",
                        onClick: async () => await deletePlaylist({ id }),
                      },
                    ]
                  : [
                      {
                        text: "북마크한 플레이리스트에서 제거",
                        onClick: () => {},
                      },
                    ]
              }
            ></MoreButton>
          )}
        </div>
      </div>
    </>
  );
}
