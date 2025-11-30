import { useState } from "react";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Modal from "../../component/Modal";
import Title from "../../component/Title";

interface IBulletinEditModal {
  isOpen: boolean;
  initialDescription: string;
  recommendId: number;
  onClose: () => void;
  onSubmit: (recommendId: number, description: string) => void;
}

export default function BulletinEditModal({
  isOpen,
  initialDescription,
  recommendId,
  onClose,
  onSubmit,
}: IBulletinEditModal) {
  const [description, setDescription] = useState(initialDescription);

  function handleClose() {
    setDescription("");
    onClose();
  }

  function handleSubmit() {
    console.log(description);
    onSubmit(recommendId, description);

    // handleClose();
  }

  if (!isOpen) return null;

  return (
    <Modal onClick={handleClose}>
      <div
        className="flex flex-col w-80 justify-between px-5 py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-5">
          <Title text="설명 수정" />
          <Input
            value={description}
            onChange={(e) => {
              e.stopPropagation();
              setDescription(e.target.value);
            }}
          />
          <div className="flex gap-5">
            <Button
              disabled={!description}
              onClick={() => {
                handleSubmit();
              }}
            >
              수정
            </Button>
            <Button onClick={handleClose}>취소</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
