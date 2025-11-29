import type { INormalizeYoutubeVideo } from "../model/song";
import { Song } from "../api/song";
import { useMutation } from "@tanstack/react-query";

export function useSong() {
  const { mutateAsync: normalizeYoutubeVideo } = useMutation({
    mutationFn: async (data: INormalizeYoutubeVideo) =>
      (await Song.normalizeYoutubeVideo(data)).data,
  });

  return { normalizeYoutubeVideo };
}
