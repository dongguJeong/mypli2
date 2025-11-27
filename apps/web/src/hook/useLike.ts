import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Like } from "../api/like";
import type { IPlaylistDetail } from "../model/playlist";

export function useLike() {
  const queryClient = useQueryClient();

  const { mutateAsync: like } = useMutation({
    mutationFn: async (playlistId: number) => {
      const res = await Like.like(playlistId);
      return res.data;
    },

    // 낙관적 업데이트
    onMutate: async (playlistId) => {
      await queryClient.cancelQueries({
        queryKey: ["playlist", playlistId],
      });
      const previousData = queryClient.getQueryData(["playlist", playlistId]);
      queryClient.setQueryData(
        ["playlist", playlistId],
        (old: IPlaylistDetail) => ({
          ...old,
          isLiked: true,
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
      // ✅ context 사용
      // Rollback
      if (context?.previousData) {
        queryClient.setQueryData(
          ["playlist", context.playlistId],
          context.previousData
        );
      }
    },
  });

  const { mutateAsync: deleteLike } = useMutation({
    mutationFn: async (playlistId: number) => {
      const res = await Like.delete(playlistId);
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
          isLiked: false,
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

  return { like, deleteLike };
}
