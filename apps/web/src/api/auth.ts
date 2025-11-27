import type { ILogin, ILoginBody } from "../model/auth";
import { ServerRequester } from "../requester/server";

export const Auth = {
  login: (data: ILoginBody) =>
    new ServerRequester<ILogin, ILoginBody>("/auth/login").post(data),
  signup: (data: ILoginBody) =>
    new ServerRequester<ILogin, ILoginBody>("/auth/signup").post(data),
  status: () =>
    new ServerRequester<{
      loggedIn: boolean;
      user?: { id: number; email: string };
    }>("/auth/status").get(),
  logout: () => new ServerRequester("/auth/logout").get(),
};
