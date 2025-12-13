import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Playlist } from "../api/playlist";
import type { IUpdatePlaylist } from "../model/playlist";
import { useAuth } from "./useAuth";

export function usePlaylist() {
  const { status } = useAuth();
  const queryClient = useQueryClient();

  const { data: myPlaylist } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => (await Playlist.myplaylist()).data,
    enabled: status?.loggedIn,
  });

  const { mutateAsync: createPlaylist } = useMutation({
    mutationFn: async () => (await Playlist.create()).data,
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["playlists"] }),
  });

  const { mutateAsync: updatePlaylist } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUpdatePlaylist }) =>
      Playlist.update(id, data),
    onSuccess: async (_, data) => {
      await queryClient.invalidateQueries({ queryKey: ["playlists"] });
      await queryClient.invalidateQueries({ queryKey: ["playlist", data.id] });
    },
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

  const { data: mostLiked, isLoading: mostLikedLoading } = useQuery({
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
    mostLikedLoading,
  };
}
