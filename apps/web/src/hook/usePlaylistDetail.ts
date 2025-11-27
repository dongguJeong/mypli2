import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Playlist } from "../api/playlist";
import { PlaylistSong } from "../api/playlistSong";
import type { IPlaylistSongBody } from "../model/playlist-song";
import type { INormalizeYoutubeVideo } from "../model/song";

export function usePlaylistDetail(playlistId: number) {
  const queryClient = useQueryClient();

  const { data: playlistDetail } = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: async () => (await Playlist.detail(playlistId)).data,
    enabled: !!playlistId,
  });

  const { mutateAsync: addYoutubeVideo } = useMutation({
    mutationFn: (data: INormalizeYoutubeVideo) =>
      PlaylistSong.addYoutubeVideo(data),
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["playlist", playlistId],
      }),
  });

  const { mutateAsync: addPlaylistSong } = useMutation({
    mutationFn: (data: IPlaylistSongBody) => PlaylistSong.addPlaylistSong(data),
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["playlist", playlistId],
      }),
  });

  const { mutateAsync: deletePlaylistSong } = useMutation({
    mutationFn: (data: IPlaylistSongBody) =>
      PlaylistSong.deletePlaylistSong(data),
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["playlist", playlistId],
      }),
  });

  return {
    playlistDetail,
    addPlaylistSong,
    deletePlaylistSong,
    addYoutubeVideo,
  };
}
