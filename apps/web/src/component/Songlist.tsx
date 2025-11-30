import type { ISong } from "../model/song";

interface ISongList {
  right?: React.ReactNode;
  song: ISong;
  description?: string;
  onClick?: (args: unknown) => void;
  duration?: boolean;
}

export default function SongList({
  right,
  song,
  description,
  duration = true,
  onClick,
}: ISongList) {
  return (
    <div className="w-full flex justify-between bg-[#121212] even:bg-[#1a1a1a] p-2 rounded-sm cursor-pointer">
      <div className="flex gap-5" onClick={onClick}>
        <img
          src={song.songThumbnail}
          className="w-20 h-20 bg-slate-400 rounded-md"
        />
        <div className="flex items-center hover:underline wrap-break-word w-40">
          <span>{song.title}</span>
        </div>

        <div className="flex items-center hover:underline wrap-break-word w-40">
          <span>{song.artist}</span>
        </div>

        {duration && (
          <div className="flex items-center hover:underline wrap-break-word w-30">
            <span>{song.duration}</span>
          </div>
        )}

        {description && (
          <div className="flex items-center wrap-break-word w-80">
            <span>{description}</span>
          </div>
        )}
      </div>
      {right}
    </div>
  );
}
