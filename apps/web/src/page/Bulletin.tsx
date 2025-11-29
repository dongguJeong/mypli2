import { GoPlus } from "react-icons/go";
import Button from "../component/Button";
import Title from "../component/Title";
import { useRecommend, useRecommendList } from "../hook/useRecommend";
import MoreButton from "../component/MoreButton";
import { useAuth } from "../hook/useAuth";
import { useAlert } from "../hook/useAlert";
import { useState } from "react";
import Modal from "../component/Modal";
import { useBookmark } from "../hook/useBookmark";
import Input from "../component/Input";
import type { ISong } from "../model/song";
import SongSearch from "../component/SongSearch";
import { formatLongText } from "../hook/useFormat";
import { RxCross2 } from "react-icons/rx";

export default function Bulletin() {
  const { recommendList } = useRecommendList();
  const { createRecommend, updateRecommend, deleteRecommend } = useRecommend();
  const { showConfirm } = useAlert();
  const { status } = useAuth();
  const { bookmark } = useBookmark();

  const [openEditRecommend, setOpenEditRecommend] = useState(false);
  const [openCreateRecommend, setOpenCreateRecommend] = useState(true);
  const [description, setDescription] = useState("");
  const [selectedSong, setSelectedSong] = useState<ISong | null>(null);

  function closeCreateRecommend() {
    setOpenCreateRecommend(false);
    setDescription("");
  }

  function closeEditRecommend() {
    console.log("닫기");
    setOpenEditRecommend(false);
    setDescription("");
  }

  return (
    <div className="flex flex-col">
      {openEditRecommend && (
        <Modal onClick={() => closeEditRecommend()}>
          <div
            className="flex flex-col w-80 h-50 justify-between px-5 py-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              onChange={(e) => {
                e.stopPropagation();
                setDescription(e.target.value);
              }}
            />
            <div className="flex gap-5">
              <Button
                onClick={() => {
                  updateRecommend({ description });
                  closeEditRecommend();
                }}
              >
                수정
              </Button>
              <Button onClick={() => closeEditRecommend()}>취소</Button>
            </div>
          </div>
        </Modal>
      )}
      {openCreateRecommend && (
        <Modal onClick={closeCreateRecommend}>
          <div className="flex gap-5" onClick={(e) => e.stopPropagation()}>
            <SongSearch
              clickAddYoutubeVideo={(song) => setSelectedSong(song)}
              clickAddSong={(song) => setSelectedSong(song)}
            />
            <div className="flex flex-col w-80 h-full px-5 py-10 gap-5">
              <Title text="추천 이유" />

              <li className="w-full h-10 flex  items-center justify-between">
                <div className="flex gap-5 items-center ">
                  <img src={selectedSong?.songThumbnail} />
                  <span>
                    {formatLongText(
                      selectedSong?.title ?? "노래를 선택해주세요"
                    )}
                  </span>
                  <span>{selectedSong?.artist}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSong(null);
                  }}
                  type="button"
                >
                  <RxCross2 className="w-5 h-5" />
                </button>
              </li>
              <textarea
                name="description"
                className="border border-white/80 focus-within:border-primary h-80 w-full"
                value={description}
                onChange={(e) => {
                  e.stopPropagation();
                  setDescription(e.target.value);
                }}
              />
              <div className="flex gap-5">
                <Button
                  onClick={() => {
                    if (selectedSong) {
                      createRecommend({
                        songId: selectedSong?.id,
                        description,
                      });
                    }
                    closeCreateRecommend();
                  }}
                >
                  등록
                </Button>
                <Button onClick={() => closeCreateRecommend}>취소</Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <section className="flex gap-5">
        <Title text="추천 노래 게시판"></Title>
        <Button
          onClick={() => {
            setOpenCreateRecommend(true);
          }}
          buttonSize="sm"
          color="white"
          ghost
          border
          className="border-white border hover:underline"
          disabled={selectedSong === null}
        >
          <GoPlus />
          추천 노래 등록하기
        </Button>
      </section>

      <section>
        <ul className="flex flex-col ">
          {recommendList?.map((v) => (
            <li
              key={v.id}
              className="w-full flex justify-between bg-[#121212] even:bg-[#1a1a1a] p-2 rounded-sm cursor-pointer"
            >
              <div className="grid grid-cols-[8rem_20rem_10rem_10rem]">
                <img
                  src={v.song.songThumbnail}
                  className="w-20 h-20 bg-slate-400 rounded-md"
                />
                <div className="flex items-center hover:underline wrap-break-word w-full">
                  <span>{v.song.title}</span>
                </div>

                <div className="flex items-center hover:underline wrap-break-word w-full">
                  <span>{v.song.artist}</span>
                </div>
                <div className="flex items-center hover:underline wrap-break-word w-full">
                  <span>{v.song.duration}</span>
                </div>
              </div>
              <MoreButton
                items={
                  status?.user?.id === v.recommendedBy.id
                    ? [
                        {
                          text: "수정",
                          onClick: () => {
                            console.log("수정");
                            setOpenEditRecommend(true);
                          },
                        },
                        {
                          text: "삭제",
                          onClick: () => {
                            showConfirm("정말 삭제하시겠습니까?", () =>
                              deleteRecommend(v.id)
                            );
                          },
                        },
                      ]
                    : [
                        {
                          text: "북마크 추가",
                          onClick: () => bookmark(v.song.id),
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
