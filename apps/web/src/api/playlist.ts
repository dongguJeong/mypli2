import type {
  IMostLikedPlaylist,
  IPlaylist,
  IPlaylistDetail,
  IUpdatePlaylist,
} from "../model/playlist";
import { ServerRequester } from "../requester/server";

export const Playlist = {
  create: () => new ServerRequester<{ id: number }>("/playlist").post(),
  myplaylist: () =>
    new ServerRequester<IPlaylist[]>("/playlist/myplaylist").get(),
  detail: (id: number) =>
    new ServerRequester<IPlaylistDetail[]>(`/playlist/${id}`).get(),
  update: (id: number, data: IUpdatePlaylist) =>
    new ServerRequester<Pick<IPlaylist, "id">, IUpdatePlaylist>(
      `/playlist/${id}`
    ).patch(data),
  delete: (id: number) =>
    new ServerRequester<Pick<IPlaylist, "id">>(`/playlist/${id}`).delete(),
  newest: () => new ServerRequester<IPlaylist[]>("/playlist/newest").get(),
  mostLiked: () =>
    new ServerRequester<IMostLikedPlaylist[]>("/playlist/mostLiked").get(),
};
