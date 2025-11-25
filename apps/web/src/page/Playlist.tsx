import Button from "../component/Button";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import SearchModal from "../component/modals/SearchModal";
import { useModalStore } from "../store/modal-store";
import { useAuth } from "../hook/useAuth";
import { useParams } from "react-router";
import { usePlaylistDetail } from "../hook/usePlaylistDetail";
import MoreButton from "../component/MoreButton";

export default function Playlist() {
  const { open } = useModalStore();
  const { loggedIn } = useAuth();
  const { id } = useParams();

  const { detail, deleteSong } = usePlaylistDetail(Number(id));

  return (
    <div className="flex flex-col h-full  gap-10">
      <SearchModal />
      <section className="grid grid-cols-[15rem_1fr] gap-10 w-full ">
        <div className="rounded-md h-60 w-60 bg-slate-500"></div>

        <div className="grid grid-rows-[auto_auto_auto] gap-4">
          <div className="flex flex-col self-center gap-3">
            <span className="text-3xl font-semibold">
              {detail.data?.playlist.title}
            </span>
            <span className="text-base">{detail.data?.playlist.detail}</span>
          </div>

          <Button ghost className="p-0" buttonSize="sm">
            <FaPlay className="w-7 h-7" />
          </Button>

          <div className="flex gap-4 self-end pb-3 items-center">
            <FaBookmark className="w-4 h-4" />
            <FaRegBookmark className="w-4 h-4" />
            <BiLike className="w-4 h-4" />
            <BiSolidLike className="w-4 h-4" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <Button
          className="w-fit hover:underline"
          color="black"
          onClick={() => {
            if (loggedIn) {
              open("youtubeSearch", Number(id));
            } else open("login");
          }}
        >
          <GoPlus />
          노래 추가하기
        </Button>
        <ul className="flex flex-col ">
          {detail.data?.songs.map((song) => (
            <li
              key={song.id}
              className="w-full flex justify-between bg-[#121212] even:bg-[#1a1a1a] p-2 rounded-sm cursor-pointer"
            >
              <div className="grid grid-cols-[8rem_40rem]">
                <img
                  src={song.songThumnail}
                  className="w-20 h-20 bg-slate-400 rounded-md"
                />
                <div className="flex items-center hover:underline wrap-break-word w-full">
                  <span>{song.title}</span>
                </div>
              </div>
              <MoreButton
                items={
                  detail.data.isOwner
                    ? [
                        {
                          text: "삭제",
                          onClick: (e) => {
                            console.log("삭제");
                            deleteSong.mutateAsync(song.id);
                          },
                        },
                      ]
                    : [
                        {
                          text: "북마크 추가",
                          onClick: (e) => console.log("추가 예정"),
                        },
                      ]
                }
              ></MoreButton>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
