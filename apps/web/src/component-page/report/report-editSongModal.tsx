import { useState } from "react";
import type { ISong } from "../../model/song";
import Input from "../../component/Input";
import Button from "../../component/Button";
import Modal from "../../component/Modal";

interface IReportEditSongModal {
  song: ISong;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (song: ISong) => void;
}

export default function ReportEditSongModal({
  song,
  isOpen,
  onClose,
  onSubmit,
}: IReportEditSongModal) {
  const [title, setTitle] = useState(song.title);
  const [songThumbnail, setSongThumbnail] = useState(song.songThumbnail);
  const [duration, setDuration] = useState(song.duration);
  const [artist, setArtist] = useState(song.artist);
  const [youtubeUrl, setYoutubeUrl] = useState(song.youtubeUrl);

  if (!isOpen) return null;
  return (
    <Modal onClick={onClose}>
      <div className="flex flex-col gap-10 w-80">
        <div className="flex flex-col gap-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
          <Input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="재생 시간(PM)"
          />
          <Input
            value={songThumbnail}
            onChange={(e) => setSongThumbnail(e.target.value)}
            placeholder="썸네일 url"
          />
          <Input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="가수"
          />
          <Input
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="youtube URL"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-5">
          <Button color="white" ghost border onClick={onClose}>
            취소
          </Button>
          <Button
            disabled={
              !title || !duration || !songThumbnail || !artist || !youtubeUrl
            }
            color="white"
            onClick={() =>
              onSubmit({
                id: song.id,
                title,
                songThumbnail,
                artist,
                duration,
                youtubeUrl,
              })
            }
          >
            생성
          </Button>
        </div>
      </div>
    </Modal>
  );
}
