import { ServerRequester } from "../requester/server";

const playlistRequester = new ServerRequester("/playlist");

export const Playlist = {
  create: (data: { name: string; description?: string }) =>
    playlistRequester.post("${base}", data),
  list: () => playlistRequester.get(""),
  detail: (id: number) => playlistRequester.get(`/${id}`),
  update: (id: number, data: any) => playlistRequester.patch(`/${id}`, data),
  remove: (id: number) => playlistRequester.delete(`/${id}`),
  addSong: (
    id: number,
    payload: { songId?: number; source?: "youtube"; videoId?: string }
  ) => playlistRequester.post(`/${id}/songs`, payload),
  sort: (id: number, orderedIds: number[]) =>
    playlistRequester.patch(`/${id}/sort`, {
      orderedPlaylistSongIds: orderedIds,
    }),
  newest: () => playlistRequester.get(`/newest`),
  mostLiked: () => playlistRequester.get(`/mostLiked`),
};
