import { PlaylistSong } from "../api/playlistSong";
import type { IPlaylistSongBody } from "../model/playlist-song";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePlaylistSong() {
  const queryClient = useQueryClient();

  const { mutateAsync: addPlaylistSong } = useMutation({
    mutationFn: (data: IPlaylistSongBody) => PlaylistSong.addPlaylistSong(data),
    onSuccess: async (_, data) =>
      await queryClient.invalidateQueries({
        queryKey: ["playlist", data.playlistId],
      }),
  });

  const { mutateAsync: deletePlaylistSong } = useMutation({
    mutationFn: (data: IPlaylistSongBody) =>
      PlaylistSong.deletePlaylistSong(data),
    onSuccess: async (_, data) =>
      await queryClient.invalidateQueries({
        queryKey: ["playlist", data.playlistId],
      }),
  });

  return {
    addPlaylistSong,
    deletePlaylistSong,
  };
}
