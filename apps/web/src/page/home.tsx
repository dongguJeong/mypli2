import Title from "../component/Title";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <Title text="인기 탑 3"></Title>
        <div className="grid w-full grid-cols-3 gap-5">
          {[1, 2, 3].map((v) => (
            <div className="h-80 bg-slate-500"></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Title text="최신 플레이리스트"></Title>
        <div className="grid w-full grid-cols-5 gap-5">
          {[1, 2, 3, 4, 5].map((v) => (
            <div className="h-56 bg-slate-500"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
