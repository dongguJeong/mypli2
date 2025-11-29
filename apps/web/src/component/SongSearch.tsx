import { useState } from "react";
import Input from "./Input";
import { useSongRepoSearch, useYoutubeSearch } from "../hook/useSearch";
import Button from "./Button";
import { useSong } from "../hook/useSong";
import type { ISong } from "../model/song";
import Title from "./Title";
import { formatPMTime } from "../hook/useFormat";

interface ISongSearch {
  clickAddYoutubeVideo: (song: ISong) => unknown;
  clickAddSong: (song: ISong) => unknown;
}

export default function SongSearch({
  clickAddYoutubeVideo,
  clickAddSong,
}: ISongSearch) {
  const [searchYoutubeInput, setSearchYoutubeInput] = useState("");
  const [youtubeInput, setYoutubeInput] = useState("");
  const [songRepo, setSongRepo] = useState("");
  const [searchSongRepo, setSearchSongRepo] = useState("");

  const { songRepoSearch } = useSongRepoSearch(searchSongRepo);
  const { youtubeSearch } = useYoutubeSearch(searchYoutubeInput);
  const { normalizeYoutubeVideo } = useSong();
  const [previewId, setPreviewId] = useState<string | null>(null);

  const handleYoutubeSearchKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setSearchYoutubeInput(youtubeInput);
    }
  };

  const handleSongRepoSearchKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchSongRepo(songRepo);
    }
  };

  return (
    <div className="flex h-160 gap-3">
      <div className="flex flex-col gap-5 px-5 py-10 w-140">
        <Title text="유튜브에서 검색" />
        <Input
          placeholder="유튜브에서 검색"
          onChange={(e) => {
            setYoutubeInput(e.target.value);
          }}
          onKeyDown={handleYoutubeSearchKeyPress}
          value={youtubeInput}
        />
        <div className="flex flex-col gap-2 overflow-y-scroll ">
          {youtubeSearch?.map((v) => (
            <li className="flex flex-col " key={v.etag + v.id}>
              <div className="flex justify-between w-full  h-14">
                <div className="flex items-center gap-3 ">
                  <img
                    src={
                      v.snippet.thumbnails.high?.url ||
                      v.snippet.thumbnails.medium?.url ||
                      v.snippet.thumbnails.default.url
                    }
                    className="size-14 cursor-pointer"
                    onClick={() => setPreviewId(v.id.videoId)}
                  />
                  <span
                    className="hover:underline wrap-break-word cursor-pointer"
                    onClick={() => setPreviewId(v.id.videoId)}
                  >
                    {v.snippet.title.length > 40
                      ? v.snippet.title.slice(0, 40) + "..."
                      : v.snippet.title}
                  </span>
                </div>

                <Button
                  color="black"
                  ghost
                  border
                  buttonSize="sm"
                  className="justify-center self-center py-2
                   h-fit"
                  onClick={async (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const normalizeSong = await normalizeYoutubeVideo({
                      title: v.snippet.title,
                      videoId: v.id.videoId,
                      songThumbnail:
                        v.snippet.thumbnails.high?.url ||
                        v.snippet.thumbnails.medium?.url ||
                        v.snippet.thumbnails.default.url,
                    });
                    clickAddYoutubeVideo(normalizeSong);
                  }}
                >
                  선택
                </Button>
              </div>
              {previewId === v.id.videoId && (
                <div className="mt-2 mb-4 w-full">
                  <div className="w-full aspect-video">
                    <iframe
                      className="w-full h-full rounded-md"
                      src={`https://www.youtube.com/embed/${v.id.videoId}?autoplay=1`}
                      title={v.snippet.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </li>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 py-10 w-140">
        <Title text="DB에서 검색" />
        <form>
          <Input
            placeholder="db에서 검색"
            onChange={(e) => {
              setSongRepo(e.target.value);
            }}
            value={songRepo}
            onKeyDown={handleSongRepoSearchKeyPress}
          />
        </form>
        <div className="flex flex-col gap-2 overflow-y-scroll">
          {songRepoSearch?.map((v) => (
            <li className="flex flex-col " key={v.id}>
              <div className="flex justify-between w-full h-14">
                <div className="flex items-center gap-3 ">
                  <img
                    src={v.songThumbnail}
                    className="size-14 cursor-pointer"
                    onClick={() => setPreviewId(String(v.id))}
                  />
                  <span onClick={() => setPreviewId(String(v.id))}>
                    {v.title}
                  </span>
                  <span onClick={() => setPreviewId(String(v.id))}>
                    {v.artist}
                  </span>
                  <span onClick={() => setPreviewId(String(v.id))}>
                    {formatPMTime(v.duration)}
                  </span>
                </div>

                <Button
                  color="black"
                  ghost
                  border
                  buttonSize="sm"
                  className="justify-center self-center py-2
                   h-fit"
                  onClick={async (e) => {
                    e.stopPropagation();
                    clickAddSong(v);
                  }}
                >
                  선택
                </Button>
              </div>
              {previewId === String(v.id) && (
                <div className="mt-2 mb-4 w-full">
                  <div className="w-full aspect-video">
                    <iframe
                      className="w-full h-full rounded-md"
                      src={v.youtubeUrl}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
