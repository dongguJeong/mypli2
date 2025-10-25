import { http } from "./http";

export const Search = {
  tracks: (q: string, limit = 20) =>
    http.get("/search/tracks", { params: { q, limit } }),
};
