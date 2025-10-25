// apps/web/src/hooks/usePlaylist.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Playlist } from "../api/playlist";

export function usePlaylist() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => (await Playlist.list()).data,
  });

  const create = useMutation({
    mutationFn: Playlist.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["playlists"] }),
  });

  const addSong = useMutation({
    mutationFn: ({
      playlistId,
      payload,
    }: {
      playlistId: number;
      payload: any;
    }) => Playlist.addSong(playlistId, payload),
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: ["playlist", vars.playlistId] }),
  });

  return { list, create, addSong };
}
