import { http } from "./http";

export const Playlist = {
  create: (data: { name: string; description?: string }) =>
    http.post("/playlists", data),
  list: () => http.get("/playlists"),
  detail: (id: number) => http.get(`/playlists/${id}`),
  update: (id: number, data: any) => http.patch(`/playlists/${id}`, data),
  remove: (id: number) => http.delete(`/playlists/${id}`),
  addSong: (
    id: number,
    payload: { songId?: number; source?: "youtube"; videoId?: string }
  ) => http.post(`/playlists/${id}/songs`, payload),
  sort: (id: number, orderedIds: number[]) =>
    http.patch(`/playlists/${id}/sort`, { orderedPlaylistSongIds: orderedIds }),
};
