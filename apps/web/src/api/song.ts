import type { INormalizeYoutubeVideo, ISong } from "../model/song";
import { ServerRequester } from "../requester/server";

export const Song = {
  createSong: (data: ISong) =>
    new ServerRequester<Omit<ISong, "id">, ISong>("/song").post(data),

  deleteSong: (songId: number) =>
    new ServerRequester<Pick<ISong, "id">, Pick<ISong, "id">>(
      `/song/${songId}`
    ).delete(),

  normalizeYoutubeVideo: (data: INormalizeYoutubeVideo) =>
    new ServerRequester("song/normalize").post(data),
};
