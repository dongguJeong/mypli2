import Button from "../component/Button";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { useModalStore } from "../store/modal-store";
import { useAuth } from "../hook/useAuth";
import { useParams } from "react-router";
import { usePlaylistDetail } from "../hook/usePlaylistDetail";
import MoreButton from "../component/MoreButton";
import { useBookmark } from "../hook/useBookmark";
import { useLike } from "../hook/useLike";
import PlaylistCard from "../component/PlaylistCard";
import { usePlaylist } from "../hook/usePlaylist";
import MyplaylistEditModal from "../component-page/myplaylist/myplaylist-editModal";
import { useState } from "react";
import { useSoundPlayerStore } from "../store/soundplayer-store";
import { usePlaylistSong } from "../hook/usePlaylistSong";
import Modal from "../component/Modal";
import SongSearch from "../component/SongSearch";
import type { ISong } from "../model/song";
import { useReport } from "../hook/useReport";
import SongList from "../component/Songlist";

export default function Playlist() {
  const { open } = useModalStore();
  const { status } = useAuth();
  const { id } = useParams();
  const { playlistDetail } = usePlaylistDetail(Number(id));
  const {
    setCurrentPlaylist,
    setCurrentSongIndex,
    setPlayStatus,
    playStatus,
    currentPlaylist,
  } = useSoundPlayerStore();
  const { deletePlaylistSong, addPlaylistSong } = usePlaylistSong();
  const { updatePlaylist } = usePlaylist();
  const { bookmark, deleteBookmark } = useBookmark();
  const { like, deleteLike } = useLike();
  const { reportSong } = useReport();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSongSearch, setOpenSongSearch] = useState(false);

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

    setOpenEditModal(false);
  }

  function clickAddPlaylistSong(song: ISong) {
    addPlaylistSong({
      songId: song.id,
      playlistId: Number(id),
    });
  }

  return (
    <>
      {playlistDetail && (
        <MyplaylistEditModal
          isOpen={openEditModal}
          onSubmit={handleSubmit}
          playlistId={playlistDetail?.playlist.id}
          initialTitle={playlistDetail?.playlist.title}
          initialDescription={playlistDetail?.playlist.detail ?? ""}
          initialPublic={playlistDetail?.playlist.isPublic}
          onClose={() => {
            setOpenEditModal(false);
          }}
        />
      )}

      {openSongSearch && (
        <Modal onClick={() => setOpenSongSearch(false)}>
          <SongSearch
            clickAddSong={clickAddPlaylistSong}
            clickAddYoutubeVideo={clickAddPlaylistSong}
          />
        </Modal>
      )}

      <div className="flex flex-col h-full  gap-10">
        <section className="grid grid-cols-[15rem_1fr] gap-10 w-full ">
          <PlaylistCard
            size="lg"
            icon="pencil"
            imgUrl={playlistDetail?.playlist.thumbnailUrl || "/no-image.jpg"}
            className="bg-[#121212]"
            onClick={() => setOpenEditModal(true)}
          />

          <div className="grid grid-rows-[auto_auto_auto] gap-4">
            <div className="flex flex-col self-center gap-3">
              <span className="text-3xl font-semibold">
                {playlistDetail?.playlist.title}
              </span>
              <span className="text-base">
                {playlistDetail?.playlist.detail}
              </span>
            </div>

            <Button
              ghost
              className="p-0"
              buttonSize="lg"
              onClick={() => {
                if (playlistDetail?.songs)
                  setCurrentPlaylist(playlistDetail?.songs);

                if (!currentPlaylist) return;
                if (playStatus === "play") setPlayStatus("pause");
                else setPlayStatus("pause");
              }}
            >
              <FaPlay className="w-7 h-7" />
            </Button>

            <div className="flex gap-4 self-end pb-3 items-center">
              {playlistDetail?.isBookmarked ? (
                <FaBookmark
                  className="w-5 h-5"
                  onClick={() => {
                    if (!status?.loggedIn) open("login");
                    else deleteBookmark(Number(id));
                  }}
                />
              ) : (
                <FaRegBookmark
                  className="w-5 h-5"
                  onClick={() => {
                    if (!status?.loggedIn) open("login");
                    else bookmark(Number(id));
                  }}
                />
              )}

              {playlistDetail?.isLiked ? (
                <BiSolidLike
                  className="w-5 h-5"
                  onClick={() => {
                    if (!status?.loggedIn) open("login");
                    deleteLike(Number(id));
                  }}
                />
              ) : (
                <BiLike
                  className="w-5 h-5"
                  onClick={() => {
                    if (!status?.loggedIn) open("login");
                    like(Number(id));
                  }}
                />
              )}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <Button
            className="w-fit hover:underline"
            color="black"
            onClick={() => {
              if (status?.loggedIn) {
                setOpenSongSearch(true);
              } else open("login");
            }}
          >
            <GoPlus />
            노래 추가하기
          </Button>
          <ul className="flex flex-col gap-1">
            {playlistDetail?.songs.map((v, idx) => (
              <li
                key={v.id}
                className="w-full flex justify-between bg-[#121212] even:bg-[#1a1a1a] p-2 rounded-sm cursor-pointer"
              >
                <SongList
                  song={v}
                  duration
                  onClick={() => {
                    setCurrentPlaylist(playlistDetail.songs);
                    setCurrentSongIndex(idx);
                  }}
                  right={
                    <MoreButton
                      items={
                        playlistDetail.isOwner
                          ? [
                              {
                                text: "삭제",
                                onClick: () => {
                                  deletePlaylistSong({
                                    songId: v.id,
                                    playlistId: playlistDetail.playlist.id,
                                  });
                                },
                              },
                              {
                                text: "노래 신고",
                                onClick: () => {
                                  reportSong(v.id);
                                },
                              },
                            ]
                          : [
                              {
                                text: "내 플레이리스트에 추가는 언제 만드냐",
                                onClick: () => console.log("추가 예정"),
                              },
                              {
                                text: "노래 신고",
                                onClick: () => {
                                  reportSong(v.id);
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
    </>
  );
}
