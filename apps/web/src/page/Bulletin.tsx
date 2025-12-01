import { GoPlus } from "react-icons/go";
import Button from "../component/Button";
import Title from "../component/Title";
import { useRecommend, useRecommendList } from "../hook/useRecommend";
import MoreButton from "../component/MoreButton";
import { useAuth } from "../hook/useAuth";
import { useAlert } from "../hook/useAlert";
import { useState } from "react";
import SongList from "../component/Songlist";
import BulletinEditModal from "../component-page/bulletin/bulletin-editModal";
import BulletinCreateModal from "../component-page/bulletin/bulletin-createModal";
import { useModalStore } from "../store/modal-store";
import { useReport } from "../hook/useReport";
import SongToMyplaylistModal from "../component/modals/SongToMyplaylistModal";
import { usePlaylistSong } from "../hook/usePlaylistSong";
import { useSoundPlayerStore } from "../store/soundplayer-store";

export default function Bulletin() {
  const { recommendList } = useRecommendList();
  const { createRecommend, updateRecommend, deleteRecommend } = useRecommend();
  const { setCurrentPlaylist } = useSoundPlayerStore();
  const { addPlaylistSong } = usePlaylistSong();
  const { reportSong } = useReport();
  const { showConfirm, showAlert } = useAlert();
  const { status } = useAuth();
  const { open } = useModalStore();

  const [openSongToPlaylist, setOpenSongToPlaylist] = useState<{
    open: boolean;
    songId: number | null;
  }>({ open: false, songId: null });
  const [openEditRecommend, setOpenEditRecommend] = useState(false);
  const [openCreateRecommend, setOpenCreateRecommend] = useState(false);
  const [editingRecommend, setEditingRecommend] = useState<{
    recommendId: number;
    description: string;
  } | null>(null);

  function handleUpdateRecommend(recommendId: number, description: string) {
    updateRecommend({
      recommendId,
      data: { description },
    });
  }

  function handleCreateRecommend(songId: number, description: string) {
    createRecommend({ songId, description });
    showAlert("등록되었습니다");
  }

  function handleAddSongToPlaylist(songId: number, playlistId: number) {
    addPlaylistSong({ songId, playlistId });
  }

  return (
    <div className="flex flex-col gap-10">
      {openSongToPlaylist.open && openSongToPlaylist.songId && (
        <SongToMyplaylistModal
          isOpen={openSongToPlaylist.open}
          onClose={() => {
            setOpenSongToPlaylist({
              open: false,
              songId: null,
            });
          }}
          songId={openSongToPlaylist.songId}
          addSongToPlaylist={handleAddSongToPlaylist}
        />
      )}

      {editingRecommend && (
        <BulletinEditModal
          recommendId={editingRecommend.recommendId}
          onClose={() => {
            setOpenEditRecommend(false);
            setEditingRecommend(null);
          }}
          isOpen={!!openEditRecommend}
          initialDescription={editingRecommend.description}
          onSubmit={handleUpdateRecommend}
        />
      )}

      <BulletinCreateModal
        onSubmit={handleCreateRecommend}
        isOpen={openCreateRecommend}
        onClose={() => {
          setOpenCreateRecommend(false);
        }}
      />
      <section className="flex gap-5">
        <Title text="추천 노래 게시판"></Title>
        <Button
          onClick={() => {
            if (status?.loggedIn) {
              setOpenCreateRecommend(true);
            } else {
              open("login");
            }
          }}
          buttonSize="sm"
          color="white"
          ghost
          border
          className="border-white border hover:underline"
        >
          <GoPlus />
          추천 노래 등록하기
        </Button>
      </section>

      <section>
        <ul className="flex flex-col gap-1 ">
          {recommendList?.map((v) => (
            <li key={v.id}>
              <SongList
                onClick={() => setCurrentPlaylist([v.song])}
                song={v.song}
                description={v.description}
                duration={false}
                right={
                  <MoreButton
                    items={
                      status?.user?.id === v.recommendedBy.id
                        ? [
                            {
                              text: "설명 수정",
                              onClick: () => {
                                setEditingRecommend({
                                  recommendId: v.id,
                                  description: v.description,
                                });
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
                            {
                              text: "노래 신고",
                              onClick: () => {
                                reportSong(v.song.id);
                              },
                            },
                          ]
                        : [
                            {
                              text: "내 플레이리스트에 추가",
                              onClick: () =>
                                setOpenSongToPlaylist({
                                  open: true,
                                  songId: v.song.id,
                                }),
                            },
                            {
                              text: "노래 신고",
                              onClick: () => {
                                reportSong(v.song.id);
                              },
                            },
                          ]
                    }
                  ></MoreButton>
                }
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
