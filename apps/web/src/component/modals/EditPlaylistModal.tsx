import { useState } from "react";
import { usePlaylistDetail } from "../../hook/usePlaylistDetail";
import { useModalStore } from "../../store/modal-store";
import Button from "../Button";
import Input from "../Input";
import { usePlaylist } from "../../hook/usePlaylist";
import Modal from "../Modal";

export default function EditPlaylistModal() {
  const { modalData, close } = useModalStore();

  const { detail } = usePlaylistDetail(modalData);
  const { update } = usePlaylist();

  const [songTitle, setSongTitle] = useState(detail.data?.playlist.title ?? "");
  const [songDetail, setSongDetail] = useState(
    detail.data?.playlist.detail ?? ""
  );
  if (!modalData) return null;

  return (
    <Modal>
      <div className="flex flex-col w-xl h-80 gap-5 p-5 bg-[#212121] justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div>제목</div>

            <Input
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
            ></Input>
          </div>

          <div className="flex flex-col gap-3">
            <div>설명</div>

            <Input
              value={songDetail}
              onChange={(e) => setSongDetail(e.target.value)}
            ></Input>
          </div>
        </div>
        <div className="flex gap-5 justify-end w-full">
          <Button
            onClick={(e) => {
              update.mutateAsync({
                id: Number(modalData),
                data: { title: songTitle, detail: songDetail },
              });
              e.stopPropagation();

              close();
            }}
          >
            수정
          </Button>
          <Button onClick={close}>취소</Button>
        </div>
      </div>
    </Modal>
  );
}
