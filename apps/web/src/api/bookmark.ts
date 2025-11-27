import type { IPlaylist } from "../model/playlist";
import { ServerRequester } from "../requester/server";

export const Bookmark = {
  addBookmark: (playlistId: number) =>
    new ServerRequester<{ message: string; playlistId: number }>(
      `/bookmark/${playlistId}`
    ).post(),

  deleteBookmark: (playlistId: number) =>
    new ServerRequester<{ message: string; playlistId: number }>(
      `/bookmark/${playlistId}`
    ).delete(),

  list: () => new ServerRequester<IPlaylist[]>("/bookmark/list").get(),
};
