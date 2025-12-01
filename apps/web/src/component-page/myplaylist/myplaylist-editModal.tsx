import { useState } from "react";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Modal from "../../component/Modal";
import Title from "../../component/Title";

interface IUpdatePlaylistModal {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    playlistId: number,
    title: string,
    description: string,
    ispublic: boolean
  ) => void;
  initialTitle: string;
  initialPublic: boolean;
  initialDescription: string;
  playlistId: number;
}

export default function MyplaylistEditModal({
  isOpen,
  onClose,
  onSubmit,
  initialTitle,
  initialDescription = "",
  initialPublic,
  playlistId,
}: IUpdatePlaylistModal) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [ispublic, setIsPublic] = useState(initialPublic);

  if (!isOpen) return null;

  function handleUpdate() {
    onSubmit(playlistId, title, description, ispublic);
  }

  return (
    <Modal onClick={onClose}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10 w-60">
          <div className="flex flex-col gap-3">
            <Title text="제목" size="sm"></Title>
            <Input
              value={title}
              color="white"
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
          </div>

          <div className="flex flex-col gap-3">
            <Title text="설명" size="sm"></Title>
            <textarea
              className="border-white border"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex gap-5">
            <Title text="공개 여부"></Title>
            <div className="flex gap-3">
              <Button
                className={ispublic === true ? "opacity-100" : "opacity-5"}
                buttonSize="sm"
                onClick={() => setIsPublic(true)}
              >
                공개
              </Button>

              <Button
                className={ispublic === false ? "opacity-100" : "opacity-50"}
                buttonSize="sm"
                onClick={() => setIsPublic(false)}
              >
                비공개
              </Button>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            disabled={!title || !description}
            onClick={handleUpdate}
            ghost
          >
            수정
          </Button>
          <Button onClick={onClose} ghost>
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
}
