import { GoPlus } from "react-icons/go";
import Button from "../component/Button";
import Title from "../component/Title";
import { useNavigate } from "react-router";
import { usePlaylist } from "../hook/usePlaylist";
import PlaylistCard from "../component/PlaylistCard";

export default function Myplaylist() {
  const navigate = useNavigate();
  const { create, myPlaylist } = usePlaylist();

  async function clickPlus() {
    const { id } = await create.mutateAsync();
    navigate(`/playlist/${id}`);
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex  gap-10">
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
      </div>

      <div className="grid grid-cols-[13rem_13rem_13rem_13rem_13rem] gap-3">
        {myPlaylist.data && myPlaylist.data.length > 0 ? (
          myPlaylist.data.map((playlist) => (
            <PlaylistCard
              key={playlist.title}
              id={playlist.id}
              title={playlist.title}
              thumbnailUrl={playlist.thumbnailUrl}
              page="myplaylist"
              moreButton
            />
          ))
        ) : (
          <div>플레이리스트를 만들어보세요</div>
        )}
      </div>
    </div>
  );
}
