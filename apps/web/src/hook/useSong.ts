import type { INormalizeYoutubeVideo, IUpdateSongBody } from "../model/song";
import { Song } from "../api/song";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSong() {
  const queryClient = useQueryClient();

  const { mutateAsync: normalizeYoutubeVideo } = useMutation({
    mutationFn: async (data: INormalizeYoutubeVideo) =>
      (await Song.normalizeYoutubeVideo(data)).data,
  });

  const { mutateAsync: updateSong } = useMutation({
    mutationFn: async ({
      songId,
      data,
    }: {
      songId: number;
      data: IUpdateSongBody;
    }) => (await Song.updateSong(songId, data)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["report"] }),
  });

  return { normalizeYoutubeVideo, updateSong };
}
