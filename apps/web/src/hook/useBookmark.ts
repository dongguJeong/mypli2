import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark } from "../api/bookmark";
import type { IPlaylistDetail } from "../model/playlist";

export function useBookmark() {
  const queryClient = useQueryClient();

  const { mutateAsync: bookmark } = useMutation({
    mutationFn: async (playlistId: number) => {
      const res = await Bookmark.addBookmark(playlistId);
      return res.data;
    },
    onMutate: async (playlistId) => {
      await queryClient.cancelQueries({
        queryKey: ["playlist", playlistId],
      });

      const previousData = queryClient.getQueryData(["playlist", playlistId]);
      queryClient.setQueryData(
        ["playlist", playlistId],
        (old: IPlaylistDetail) => ({
          ...old,
          isBookmared: true,
        })
      );
      return { previousData, playlistId };
    },
    onSuccess: (_, playlistId) => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", playlistId],
      });
    },
    onError: (_error, _playlistId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["playlist", context.playlistId],
          context.previousData
        );
      }
    },
  });

  const { mutateAsync: deleteBookmark } = useMutation({
    mutationFn: async (playlistId: number) => {
      const res = await Bookmark.deleteBookmark(playlistId);
      return res.data;
    },
    onMutate: async (playlistId) => {
      await queryClient.cancelQueries({
        queryKey: ["playlist", playlistId],
      });

      const previousData = queryClient.getQueryData(["playlist", playlistId]);
      queryClient.setQueryData(
        ["playlist", playlistId],
        (old: IPlaylistDetail) => ({
          ...old,
          isBookmared: false,
        })
      );
      return { previousData, playlistId };
    },
    onSuccess: (_, playlistId) => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", playlistId],
      });
    },
    onError: (_error, _playlistId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["playlist", context.playlistId],
          context.previousData
        );
      }
    },
  });

  const { data: bookmarkList, isLoading: bookmarkLoading } = useQuery({
    queryFn: async () => {
      const response = await Bookmark.list();
      return response.data;
    },
    queryKey: ["bookmarks"],
  });

  return { bookmark, deleteBookmark, bookmarkList, bookmarkLoading };
}
