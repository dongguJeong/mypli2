import type { IPlaylist } from "../model/playlist";
import type { YoutubeSearchItem } from "../model/search";
import type { ISong } from "../model/song";
import { ServerRequester } from "../requester/server";

export const Search = {
  youtube: (q: string) =>
    new ServerRequester<YoutubeSearchItem[]>(`/search/youtube?q=${q}`).get(),
  playlist: (q: string) =>
    new ServerRequester<IPlaylist[]>(`/search/playlist?q=${q}`).get(),
  songRepo: (q: string) =>
    new ServerRequester<ISong[]>(`/search/songRepo?q=${q}`).get(),
};
