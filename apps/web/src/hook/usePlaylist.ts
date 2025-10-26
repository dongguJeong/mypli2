import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Playlist } from "../api/playlist";

export function usePlaylist() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => (await Playlist.list()).data,
  });

  const create = useMutation({
    mutationFn: Playlist.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["playlists"] }),
  });

  const update = useMutation({
    mutationFn: ({
      id,
      ...data
    }: {
      id: number;
      name?: string;
      description?: string;
    }) => Playlist.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["playlists"] }),
  });

  const remove = useMutation({
    mutationFn: ({ id }: { id: number }) => Playlist.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["playlists"] }),
  });

  return { list, create, update, remove };
}
