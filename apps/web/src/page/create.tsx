import Button from "../component/Button";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import SearchModal from "../component/modals/SearchModal";
import { useModalStore } from "../store/modal-store";
import { useAuth } from "../hook/useAuth";

export default function Create() {
  const { open } = useModalStore();
  const { loggedIn } = useAuth();

  return (
    <div className="flex flex-col h-full  gap-10">
      <SearchModal />
      <section className="grid grid-cols-[15rem_1fr] gap-10 w-full ">
        <div className="rounded-md h-60 w-60 bg-slate-500"></div>

        <div className="grid grid-rows-[auto_auto_auto] gap-4">
          <div className="flex flex-col self-center gap-3">
            <span className="text-3xl font-semibold">제목</span>
            <span className="text-base">설명</span>
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
            if (loggedIn) open("youtubeSearch");
            else open("login");
          }}
        >
          <GoPlus />
          노래 추가하기
        </Button>
        <li className="w-full grid grid-cols-[8rem_10rem_10rem_4rem] bg-[#121212] even:bg-[#1a1a1a] py-2 px-2 rounded-sm cursor-pointer">
          <div className="w-15 h-15 bg-slate-400 rounded-md"></div>
          <div className="w-full flex items-center hover:underline">
            <span>제목</span>
          </div>
          <div className="w-full flex items-center hover:underline">
            <span>가수</span>
          </div>

          <Button ghost className="self-center">
            <IoIosMore className="w-5 h-5" />
          </Button>
        </li>
      </section>
    </div>
  );
}
