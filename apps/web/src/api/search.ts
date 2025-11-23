import { ServerRequester } from "../requester/server";

const searchRequester = new ServerRequester("/search");

export const Search = {
  youtube: (q: string) => searchRequester.get(`/youtube?q=${q}`),
  playlist: (q: string) => searchRequester.get(`/playlist?q=${q}`),
};
