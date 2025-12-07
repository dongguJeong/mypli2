import { useState } from "react";
import { usePlaylist } from "../../hook/usePlaylist";
import Button from "../Button";
import Modal from "../Modal";
import Title from "../Title";
import Input from "../Input";
import { FaPlus } from "react-icons/fa";

interface ISongToMyplaylistModal {
  isOpen: boolean;
  onClose: () => void;
  songId: number;
  addSongToPlaylist: (songId: number, playlistId: number) => void;
}

export default function SongToMyplaylistModal({
  isOpen,
  onClose,
  songId,
  addSongToPlaylist,
}: ISongToMyplaylistModal) {
  const { myPlaylist, createPlaylist, updatePlaylist } = usePlaylist();

  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  if (!isOpen) return null;

  function handleOnclick(songId: number, playlistId: number) {
    addSongToPlaylist(songId, playlistId);
    onClose();
  }

  async function handleOnCreatePlaylist() {
    const newPlaylistId = await createPlaylist();
    updatePlaylist({
      id: Number(newPlaylistId),
      data: { title, detail: description, isPublic },
    });
  }

  return (
    <>
      {openCreatePlaylistModal && (
        <Modal onClick={() => setOpenCreatePlaylistModal(false)}>
          <div className="flex flex-col gap-3 w-80 ">
            <Title text="새 재생목록"></Title>
            <Input
              color="white"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="제목"
            ></Input>
            <Input
              color="white"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="설명"
            ></Input>
            <div className="flex gap-3">
              <Button
                color="gray"
                className={`${isPublic === false ? "opacity-40" : ""}`}
                onClick={() => setIsPublic(true)}
              >
                공개
              </Button>
              <Button
                color="gray"
                className={`${isPublic === true ? "opacity-40" : ""}`}
                onClick={() => setIsPublic(false)}
              >
                비공개
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-5">
              <Button
                color="white"
                ghost
                border
                onClick={() => setOpenCreatePlaylistModal(false)}
              >
                취소
              </Button>
              <Button
                disabled={!description || !title}
                color="white"
                onClick={handleOnCreatePlaylist}
              >
                생성
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <Modal onClick={onClose}>
        <div className="flex flex-col gap-3">
          {myPlaylist?.map((v) => (
            <Button
              type="button"
              onClick={() => handleOnclick(songId, v.id)}
              color="white"
              ghost
              className="flex gap-5"
            >
              <img
                src={v.thumbnailUrl || "/no-image.jpg"}
                className="w-10 h-7"
              />
              {v.title}
            </Button>
          ))}
          <Button color="gray" onClick={() => setOpenCreatePlaylistModal(true)}>
            <FaPlus className="h-3" /> 플레이리스트 생성
          </Button>
        </div>
      </Modal>
    </>
  );
}
