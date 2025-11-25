import type {
  IAddSong,
  IDeleteSong,
  SongAddResponse,
  SongDeleteResponse,
} from "../model/song";
import { ServerRequester } from "../requester/server";

export const Song = {
  addSong: (data: IAddSong) =>
    new ServerRequester<unknown, SongAddResponse, IAddSong>("/song").post(
      "",
      data
    ),
  deleteSong: (data: IDeleteSong) =>
    new ServerRequester<unknown, SongDeleteResponse, IDeleteSong>(
      "/song"
    ).delete("", data),
};
