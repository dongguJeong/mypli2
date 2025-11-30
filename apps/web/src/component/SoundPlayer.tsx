import { useState, useEffect } from "react";
import YouTube, { type YouTubeProps } from "react-youtube";
import { useSoundPlayerStore } from "../store/soundplayer-store";
import type { ISong } from "../model/song";
import Button from "./Button";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaPlay } from "react-icons/fa";
import { IoPause } from "react-icons/io5";

export default function SoundPlayer() {
  const {
    currentPlaylist,
    currentSongIndex,
    next,
    prev,
    playStatus,
    setPlayStatus,
  } = useSoundPlayerStore();

  const [player, setPlayer] = useState<any>(null);
  const [currentSong, setCurrentSong] = useState<ISong>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState(100);

  // ISO 8601 duration을 초로 변환 (PT2M25S -> 145초)
  const parseDuration = (isoDuration: string): number => {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || "0");
    const minutes = parseInt(match[2] || "0");
    const seconds = parseInt(match[3] || "0");

    return hours * 3600 + minutes * 60 + seconds;
  };

  // 현재 재생 중인 곡 설정
  useEffect(() => {
    if (currentPlaylist && currentPlaylist[currentSongIndex]) {
      const song = currentPlaylist[currentSongIndex];
      setCurrentSong(song);
      setCurrentTime(0);

      // DB의 duration을 사용
      if (song.duration) {
        setDuration(parseDuration(song.duration));
      }

      if (player) {
        player.seekTo(0);
      }
    }
  }, [currentSongIndex, currentPlaylist, player]);

  // 재생/일시정지 상태 관리
  useEffect(() => {
    if (!player) return;

    if (playStatus === "play") {
      player.playVideo();
    } else if (playStatus === "pause") {
      player.pauseVideo();
    }
  }, [playStatus, player]);

  // 볼륨 변경
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
    }
  };

  // 재생 위치 변경
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (player) {
      player.seekTo(newTime);
    }
  };

  // YouTube 플레이어 준비 완료
  const onReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
    event.target.setVolume(volume);

    // DB duration이 없으면 YouTube에서 가져오기
    if (!currentSong?.duration) {
      setDuration(event.target.getDuration());
    }
  };

  // 재생 상태 변경 감지
  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === 0) {
      // 곡이 끝나면 다음 곡 재생
      next();
    } else if (event.data === 1) {
      setPlayStatus("play");
    } else if (event.data === 2) {
      setPlayStatus("pause");
    }
  };

  // 현재 재생 시간 업데이트
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      if (player.getCurrentTime) {
        setCurrentTime(player.getCurrentTime());
      }
    }, 200);

    return () => clearInterval(interval);
  }, [player]);

  const togglePlay = () => {
    if (playStatus === "play") {
      setPlayStatus("pause");
    } else {
      setPlayStatus("play");
    }
  };

  // YouTube URL에서 비디오 ID 추출
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
  };

  // 시간 포맷팅 (초 -> MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const opts: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
    },
  };

  if (!currentSong) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-screen pl-32 h-24 bg-zinc-900 border-t border-zinc-800 z-50 flex items-center px-6 gap-8">
      {/* 숨겨진 YouTube 플레이어 */}
      <div className="hidden">
        <YouTube
          videoId={getYouTubeVideoId(currentSong.youtubeUrl)}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>

      {/* 앨범 커버 & 곡 정보 */}
      <div className="flex gap-4 items-center min-w-64">
        <img
          src={currentSong.songThumbnail}
          alt={currentSong.title}
          className="h-16 w-20 rounded"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-white">{currentSong.title}</span>
          <span
            className={`text-sm text-gray-400 ${
              currentSong.title.length > 30 ? "animate-marquee" : ""
            }`}
          >
            {currentSong.artist}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-2">
        <div className="flex gap-4 justify-center items-center w-160 pr-10">
          <Button buttonSize="sm" ghost onClick={prev}>
            <FaAngleDoubleLeft className="w-5 h-5" />
          </Button>
          <Button buttonSize="sm" className="w-10" ghost onClick={togglePlay}>
            {playStatus === "play" ? (
              <IoPause className="w-5 h-5" />
            ) : (
              <FaPlay className="w-4 h-4" />
            )}
          </Button>
          <Button buttonSize="sm" ghost onClick={next}>
            <FaAngleDoubleRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-3 w-160">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-160 h-1 rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                  
                  "
            style={{
              background: `linear-gradient(to right, 
      #9400ff 0%, 
      #9400ff ${(currentTime / (duration || 1)) * 100}%, 
      #545454 ${(currentTime / (duration || 1)) * 100}%, 
      #545454 100%)`,
            }}
          />
          <span className="text-xs text-gray-400 w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* 볼륨 컨트롤 */}
      <div className="flex items-center gap-3 w-32">
        <span className="text-xs text-gray-400">🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1  rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
          "
          style={{
            background: `linear-gradient(to right, 
      #9400ff 0%, 
      #9400ff ${volume}%, 
      #545454 ${volume}%, 
      #545454 100%)`,
          }}
        />
      </div>
    </div>
  );
}
