import { GoPlus } from "react-icons/go";
import Button from "../component/Button";
import Title from "../component/Title";
import { useNavigate } from "react-router";
import { usePlaylist } from "../hook/usePlaylist";
import PlaylistCard from "../component/PlaylistCard";
import MoreButton from "../component/MoreButton";
import { useState } from "react";
import MyplaylistEditModal from "../component-page/myplaylist/myplaylist-editModal";

export default function Myplaylist() {
  const navigate = useNavigate();
  const { createPlaylist, myPlaylist, deletePlaylist, updatePlaylist } =
    usePlaylist();

  const [open, setIsOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<{
    title: string;
    detail: string;
    isPublic: boolean;
    playlistId: number;
  } | null>(null);

  async function clickPlus() {
    const { id } = await createPlaylist();
    navigate(`/playlist/${id}`);
  }

  function goToPlaylist(playlistId: number) {
    navigate(`/playlist/${playlistId}`);
  }

  function handleSubmit(
    playlistId: number,
    title: string,
    description: string,
    ispublic: boolean
  ) {
    updatePlaylist({
      id: playlistId,
      data: {
        title,
        detail: description,
        isPublic: ispublic,
      },
    });
  }

  return (
    <>
      {selectedPlaylist && open && (
        <MyplaylistEditModal
          isOpen={open}
          onSubmit={handleSubmit}
          playlistId={selectedPlaylist.playlistId}
          initialTitle={selectedPlaylist.title}
          initialDescription={selectedPlaylist.detail}
          initialPublic={selectedPlaylist.isPublic}
          onClose={() => {
            setIsOpen(false);
            setSelectedPlaylist(null);
          }}
        />
      )}
      <div className="w-full flex flex-col gap-10">
        <section className="flex  gap-10">
          <Title text="내 플레이리스트" />
          <Button
            onClick={clickPlus}
            buttonSize="sm"
            color="white"
            ghost
            border
            className="border-white border hover:underline"
          >
            <GoPlus />
            플레이리스트 생성
          </Button>
        </section>

        <section className="grid grid-cols-4 gap-10">
          {myPlaylist?.map((v) => (
            <div className="flex flex-col ">
              <PlaylistCard
                imgUrl={v.thumbnailUrl || "/no-image.jpg"}
                className="max-w-70 min-w-50"
                onClick={() => goToPlaylist(v.id)}
              />
              <div className="flex justify-between pl-1 py-4">
                <span onClick={() => goToPlaylist(v.id)}>{v.title}</span>
                <MoreButton
                  items={[
                    {
                      text: "수정",
                      onClick: () => {
                        setSelectedPlaylist({
                          playlistId: v.id,
                          title: v.title,
                          detail: v.detail ?? "",
                          isPublic: v.isPublic,
                        });
                        setIsOpen(true);
                      },
                    },
                    {
                      text: "삭제",
                      onClick: () => {
                        deletePlaylist(v.id);
                      },
                    },
                  ]}
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
