import { useSearchParams } from "react-router";
import { usePlaylistSearch, useSongRepoSearch } from "../hook/useSearch";
import Title from "../component/Title";
import SongList from "../component/Songlist";
import PlaylistCard from "../component/PlaylistCard";
import { formatLongText } from "../hook/useFormat";

export default function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const { playlistSearch } = usePlaylistSearch(q);
  const { songRepoSearch } = useSongRepoSearch(q);
  return (
    <div className="flex flex-col gap-15">
      <Title text="검색 결과" />
      <div className="flex flex-col gap-3">
        {playlistSearch?.map((v) => (
          <a
            key={v.id}
            className="flex gap-3 cursor-pointer"
            href={`/playlist/${v.id}`}
          >
            <PlaylistCard imgUrl={v.thumnailUrl} />
            <div className="flex flex-col items-center gap-5">
              <span>{v.title}</span>
              <span>{formatLongText(v.detail || "")}</span>
            </div>
          </a>
        ))}

        {songRepoSearch?.map((v) => (
          <SongList song={v} />
        ))}
      </div>
    </div>
  );
}
