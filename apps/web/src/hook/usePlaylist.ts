import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Playlist } from "../api/playlist";
import type { IUpdatePlaylist } from "../model/playlist";

export function usePlaylist() {
  const queryClient = useQueryClient();

  const { data: myPlaylist } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => (await Playlist.myplaylist()).data,
  });

  const { mutateAsync: createPlaylist } = useMutation({
    mutationFn: async () => (await Playlist.create()).data,
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["playlists"] }),
  });

  const { mutateAsync: updatePlaylist } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUpdatePlaylist }) =>
      Playlist.update(id, data),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["playlists"] }),
  });

  const { mutateAsync: deletePlaylist } = useMutation({
    mutationFn: (id: number) => Playlist.delete(id),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["playlists"] }),
  });

  const { data: newest } = useQuery({
    queryKey: ["newest"],
    queryFn: async () => (await Playlist.newest()).data,
  });

  const { data: mostLiked } = useQuery({
    queryKey: ["mostLiked"],
    queryFn: async () => (await Playlist.mostLiked()).data,
  });

  return {
    myPlaylist,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    newest,
    mostLiked,
  };
}
