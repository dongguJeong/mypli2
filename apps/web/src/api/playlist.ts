import { ServerRequester } from "../requester/server";

const playlist = new ServerRequester("/playlist");

export const Playlist = {
  create: (data: { name: string; description?: string }) =>
    playlist.post("${base}", data),
  list: () => playlist.get(""),
  detail: (id: number) => playlist.get(`/${id}`),
  update: (id: number, data: any) => playlist.patch(`/${id}`, data),
  remove: (id: number) => playlist.delete(`/${id}`),
  addSong: (
    id: number,
    payload: { songId?: number; source?: "youtube"; videoId?: string }
  ) => playlist.post(`/${id}/songs`, payload),
  sort: (id: number, orderedIds: number[]) =>
    playlist.patch(`/${id}/sort`, {
      orderedPlaylistSongIds: orderedIds,
    }),
  newest: () => playlist.get(`/newest`),
  mostLiked: () => playlist.get(`/mostLiked`),
};
