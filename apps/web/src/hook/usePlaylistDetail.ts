import { useQuery } from "@tanstack/react-query";
import { Playlist } from "../api/playlist";

export function usePlaylistDetail(playlistId: number) {
  const { data: playlistDetail } = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: async () => (await Playlist.detail(playlistId)).data,
    enabled: !!playlistId,
  });

  return {
    playlistDetail,
  };
}
