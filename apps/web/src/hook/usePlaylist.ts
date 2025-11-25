import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Playlist } from "../api/playlist";
import type { PlaylistUpdateBody } from "../model/playlist";

export function usePlaylist() {
  const queryClient = useQueryClient();

  const myPlaylist = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => (await Playlist.list()).data,
  });

  const create = useMutation({
    mutationFn: async () => (await Playlist.create()).data,
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["playlists"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PlaylistUpdateBody }) =>
      Playlist.update(id, data),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["playlists"] }),
  });

  const remove = useMutation({
    mutationFn: ({ id }: { id: number }) => Playlist.remove(id),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["playlists"] }),
  });

  const newest = useQuery({
    queryKey: ["newest"],
    queryFn: async () => (await Playlist.newest()).data,
  });

  const mostLiked = useQuery({
    queryKey: ["mostLiked"],
    queryFn: async () => (await Playlist.mostLiked()).data,
  });

  return { myPlaylist, create, update, remove, newest, mostLiked };
}
