import { ServerRequester } from "../requester/server";

export const Like = {
  like: (playlistId: number) =>
    new ServerRequester<{ message: string; playlistId: number }>(
      `/like/${playlistId}`
    ).post(),
  delete: (playlistId: number) =>
    new ServerRequester<{ message: string; playlistId: number }>(
      `/like/${playlistId}`
    ).delete(),
};
