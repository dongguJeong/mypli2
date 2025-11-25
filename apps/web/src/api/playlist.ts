import type {
  PlaylistCreateResponse,
  PlaylistDetailResponse,
  PlaylistListResponse,
  PlaylistUpdateBody,
} from "../model/playlist";
import { ServerRequester } from "../requester/server";

export const Playlist = {
  create: () =>
    new ServerRequester<unknown, { id: number }>("/playlist").post(""),
  list: () =>
    new ServerRequester<unknown, PlaylistListResponse[]>("/playlist").get(
      "/myplaylist"
    ),
  detail: (id: number) =>
    new ServerRequester<unknown, PlaylistDetailResponse>("/playlist").get(
      `/${id}`
    ),
  update: (id: number, data: PlaylistUpdateBody) =>
    new ServerRequester<unknown, PlaylistCreateResponse, PlaylistUpdateBody>(
      "/playlist"
    ).patch(`/${id}`, data),
  remove: (id: number) =>
    new ServerRequester<unknown, PlaylistCreateResponse>("/playlist").delete(
      `/${id}`
    ),
  newest: () =>
    new ServerRequester<unknown, PlaylistListResponse[]>("/playlist").get(
      `/newest`
    ),
  mostLiked: () =>
    new ServerRequester<unknown, PlaylistListResponse[]>("/playlist").get(
      `/mostLiked`
    ),
};
