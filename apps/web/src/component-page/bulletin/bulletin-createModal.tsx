import { useState } from "react";
import SongSearch from "../../component/SongSearch";
import Title from "../../component/Title";
import { formatLongText } from "../../hook/useFormat";
import type { ISong } from "../../model/song";
import Modal from "../../component/Modal";
import { RxCross2 } from "react-icons/rx";
import Button from "../../component/Button";

export interface IBulletinCreateModal {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (songId: number, description: string) => void;
}

export default function BulletinCreateModal({
  isOpen,
  onClose,
  onSubmit,
}: IBulletinCreateModal) {
  const [selectedSong, setSelectedSong] = useState<ISong | null>(null);
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  return (
    <Modal onClick={onClose}>
      <div className="flex gap-5" onClick={(e) => e.stopPropagation()}>
        <SongSearch
          clickAddYoutubeVideo={(song) => setSelectedSong(song)}
          clickAddSong={(song) => setSelectedSong(song)}
        />
        <div className="flex flex-col w-80 h-full px-5 py-10 gap-5">
          <Title text="추천 이유" />

          <li className="w-full h-10 flex  items-center justify-between">
            <div className="flex gap-5 items-center ">
              <img src={selectedSong?.songThumbnail} className="size-5" />
              <span>
                {formatLongText(selectedSong?.title ?? "노래를 선택해주세요")}
              </span>
              <span>{selectedSong?.artist}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedSong(null);
              }}
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
              disabled={!selectedSong}
              onClick={() => {
                if (selectedSong) {
                  onSubmit(selectedSong.id, description);
                }
                onClose();
              }}
            >
              등록
            </Button>
            <Button onClick={onClose}>취소</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
