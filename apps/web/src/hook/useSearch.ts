import { useQuery } from "@tanstack/react-query";
import { Search } from "../api/search";

export function usePlaylistSearch(q: string) {
  const { data: playlistSearch } = useQuery({
    queryKey: ["searchPlaylist", q],
    queryFn: async () => (await Search.playlist(q)).data,
    enabled: !!q,
  });

  return {
    playlistSearch,
  };
}

export function useYoutubeSearch(q: string) {
  const { data: youtubeSearch } = useQuery({
    queryKey: ["searchYoutube", q],
    queryFn: async () => (await Search.youtube(q)).data,
    enabled: !!q,
  });
  return { youtubeSearch };
}

export function useSongRepoSearch(q: string) {
  const { data: songRepoSearch } = useQuery({
    queryKey: ["searchSongRepo", q],
    queryFn: async () => (await Search.songRepo(q)).data,
    enabled: !!q,
  });
  return { songRepoSearch };
}
