import { usePlaylist } from "../../hook/usePlaylist";
import Button from "../Button";
import Modal from "../Modal";

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
  const { myPlaylist } = usePlaylist();

  if (!isOpen) return null;

  function handleOnclick(songId: number, playlistId: number) {
    addSongToPlaylist(songId, playlistId);
    onClose();
  }

  return (
    <Modal onClick={onClose}>
      <div className="flex flex-col gap-3">
        {myPlaylist?.map((v) => (
          <Button
            type="button"
            onClick={() => handleOnclick(songId, v.id)}
            color="white"
          >
            {v.title}
          </Button>
        ))}
      </div>
    </Modal>
  );
}
