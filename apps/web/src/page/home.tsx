import PlaylistCard from "../component/PlaylistCard";
import Title from "../component/Title";
import { usePlaylist } from "../hook/usePlaylist";
import { useRecommendList } from "../hook/useRecommend";
import { IoIosArrowForward } from "react-icons/io";
import { useSoundPlayerStore } from "../store/soundplayer-store";

export default function Home() {
  const { mostLiked } = usePlaylist();
  const { recommendList } = useRecommendList(3);
  const { setCurrentPlaylist } = useSoundPlayerStore();

  return (
    <div className="flex flex-col gap-15">
      <div className="flex flex-col gap-5 ">
        <a href="/bulletin" className="flex gap-2   items-center">
          <Title text="추천 노래"></Title>

          <IoIosArrowForward className="w-5 h-5 pb-1" />
        </a>
        <div className="grid w-full grid-cols-5 gap-5">
          {recommendList?.map((v) => (
            <div
              className="flex flex-col gap-3 "
              key={v.id}
              onClick={() => setCurrentPlaylist([v.song])}
            >
              <PlaylistCard
                imgUrl={v.song.songThumbnail}
                className="max-w-70 min-w-50"
              />
              <div className="flex flex-col">
                <span>
                  {v.song.artist} - {v.song.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 ">
        <Title text="인기 플레이리스트" />
        <div className="grid w-full grid-cols-5 gap-5">
          {mostLiked?.map((v) => (
            <a
              href={`/playlist/${v.id}`}
              className="flex flex-col gap-3 rounded-sm w-full"
              key={v.id}
            >
              <PlaylistCard imgUrl={v.thumbnailUrl} />
              <span className="text-lg">{v.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
