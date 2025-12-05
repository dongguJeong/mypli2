import type { IPlaylistSongBody } from "../model/playlist-song";
import type { INormalizeYoutubeVideo } from "../model/song";
import { ServerRequester } from "../requester/server";

export const PlaylistSong = {
  addPlaylistSong: (data: IPlaylistSongBody) =>
    new ServerRequester<{ id: number; songId: number }>("/playlistSong").post(
      data
    ),

  addYoutubeVideo: (data: INormalizeYoutubeVideo) =>
    new ServerRequester<{ id: number; songId: number }>(
      "/playlistSong/youtubeVideo"
    ).post(data),

  deletePlaylistSong: (data: IPlaylistSongBody) =>
    new ServerRequester<{ id: number; songId: number }>(
      `/playlistSong/${data.playlistId}/songs/${data.songId}`
    ).delete(),
};
