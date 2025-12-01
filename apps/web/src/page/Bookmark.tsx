import { useNavigate } from "react-router";
import PlaylistCard from "../component/PlaylistCard";
import Title from "../component/Title";
import { useBookmark } from "../hook/useBookmark";
import MoreButton from "../component/MoreButton";

export default function Bookmark() {
  const { bookmarkList, deleteBookmark } = useBookmark();
  const navigate = useNavigate();

  function goToPlaylist(playlistId: number) {
    navigate(`/playlist/${playlistId}`);
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <section className="flex  gap-10">
        <Title text="북마크한 플레이리스트" />
      </section>
      <section className="grid grid-cols-4 gap-10">
        {bookmarkList?.map((v) => (
          <div className="flex flex-col ">
            <PlaylistCard
              imgUrl={v.thumbnailUrl || "/no-image.jpg"}
              onClick={() => goToPlaylist(v.id)}
              className="max-w-70 min-w-50"
            />
            <div className="flex justify-between pl-1 py-4">
              <span onClick={() => goToPlaylist(v.id)}>{v.title}</span>
              <MoreButton
                items={[
                  {
                    text: "삭제",
                    onClick: () => {
                      deleteBookmark(v.id);
                    },
                  },
                ]}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
