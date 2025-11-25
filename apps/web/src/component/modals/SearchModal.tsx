import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "../Input";
import Modal from "../Modal";
import { useModalStore } from "../../store/modal-store";
import { useSearch } from "../../hook/useSearch";
import Button from "../Button";
import { IoClose } from "react-icons/io5";
import { usePlaylistDetail } from "../../hook/usePlaylistDetail";

export default function SearchModal() {
  const { register, handleSubmit, reset } = useForm<{ q: string }>();
  const { currentModal, modalData, close } = useModalStore();
  const { addSong } = usePlaylistDetail(modalData);
  const [query, setQuery] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);

  const { youtube } = useSearch(query);

  if (currentModal !== "youtubeSearch") return null;

  const onSubmit: SubmitHandler<{ q: string }> = (data) => {
    const trimmed = data.q.trim();
    if (!trimmed) return;
    setQuery(trimmed);
  };

  function handleClose() {
    setQuery("");
    reset();
    close();
  }

  function togglePreview(id: string) {
    setPreviewId((prev) => (prev === id ? null : id));
  }

  function clickAddSong(v) {
    console.log(modalData);
    if (!modalData) return;
    const data = {
      youtubeUrl: `https://www.youtube.com/embed/${v.id.videoId}?autoplay=1`,
      title: v.snippet.title,
      singer: "",
      songThumnail: v.snippet.thumbnails.default.url,
      orderIndex: 0,
      playlistId: modalData,
    };
    addSong.mutateAsync(data);
  }

  return (
    <Modal>
      <div
        className="flex bg-[#212121] flex-col gap-4 w-160 min-h-1/2  p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">유튜브에서 검색</span>
          <Button ghost color="black" onClick={handleClose} buttonSize="sm">
            <IoClose className="w-6 h-6" />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="검색" {...register("q")} ghost />
        </form>
        <div className="flex flex-col gap-4 overflow-scroll h-96 w-full">
          {youtube?.data?.map((v) => (
            <li className="flex flex-col w-full" key={v.id.videoId}>
              <div className="flex justify-between">
                <button
                  className="grid grid-cols-[5rem_20rem] gap-10 cursor-pointer hover:underline"
                  type="button"
                  onClick={() => togglePreview(v.id.videoId)}
                >
                  <img
                    src={v.snippet.thumbnails.default.url}
                    className="5rem 5rem"
                  />
                  <div className="flex text-base wrap-break-word items-center">
                    {v.snippet.title.length <= 40
                      ? v.snippet.title
                      : v.snippet.title.slice(0, 40) + "..."}
                  </div>
                </button>
                <Button
                  color="black"
                  ghost
                  border
                  buttonSize="sm"
                  className="justify-center justify-self-end"
                  onClick={(e) => {
                    e.stopPropagation();
                    clickAddSong(v);
                  }}
                >
                  추가하기
                </Button>
              </div>
              {previewId === v.id.videoId && (
                <div className="mt-2 mb-4 w-full">
                  <div className="w-full aspect-video">
                    <iframe
                      className="w-full h-full rounded-md"
                      src={`https://www.youtube.com/embed/${v.id.videoId}?autoplay=1`}
                      title={v.snippet.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </li>
          ))}
        </div>
      </div>
    </Modal>
  );
}
