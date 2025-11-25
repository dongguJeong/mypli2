import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Playlist } from "../api/playlist";
import type { IAddSong } from "../model/song";
import { Song } from "../api/song";

export function usePlaylistDetail(id: number) {
  const queryClient = useQueryClient();

  const detail = useQuery({
    queryKey: [`playlist_${id}`],
    queryFn: async () => (await Playlist.detail(id)).data,
    enabled: !!id,
  });

  const addSong = useMutation({
    mutationFn: (data: IAddSong) => Song.addSong(data),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: [`playlist_${id}`] }),
  });

  const deleteSong = useMutation({
    mutationFn: (songId: number) => Song.deleteSong({ songId }),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: [`playlist_${id}`] }),
  });

  return { detail, addSong, deleteSong };
}
