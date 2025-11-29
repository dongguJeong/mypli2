import Title from "../component/Title";
import { usePlaylist } from "../hook/usePlaylist";
import { useRecommendList } from "../hook/useRecommend";
import { IoIosArrowForward } from "react-icons/io";

export default function Home() {
  const { mostLiked } = usePlaylist();
  const { recommendList } = useRecommendList(3);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5 h-80">
        <a href="/bulletin" className="flex gap-2   items-center">
          <Title text="추천 노래"></Title>

          <IoIosArrowForward className="w-5 h-5 pb-1" />
        </a>
        <div className="grid w-full grid-cols-3 gap-5">
          {recommendList?.map((v) => (
            <div className="flex flex-col gap-3 " key={v.id}>
              <img src={v.song.songThumnail} className="h-60" />
              <div className="flex flex-col">
                <span>{v.song.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 h-60">
        <Title text="인기 플레이리스트" />
        <div className="grid w-full grid-cols-5 gap-5">
          {mostLiked?.map((v) => (
            <a
              href={`/playlist/${v.id}`}
              className="flex flex-col gap-3 rounded-sm w-full"
              key={v.id}
            >
              <img className="w-full h-56" src={v.thumnailUrl} />
              <span className="text-lg">{v.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
