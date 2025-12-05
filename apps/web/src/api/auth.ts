import type { ILogin, ILoginBody, IUser } from "../model/auth";
import { ServerRequester } from "../requester/server";

export const Auth = {
  login: (data: ILoginBody) =>
    new ServerRequester<ILogin, ILoginBody>("/auth/login").post(data),
  signup: (data: ILoginBody) =>
    new ServerRequester<ILogin, ILoginBody>("/auth/signup").post(data),
  status: () =>
    new ServerRequester<{
      loggedIn: boolean;
      user?: IUser;
    }>("/auth/status").get(),
  logout: () => new ServerRequester("/auth/logout").get(),
  validateAdmin: () => new ServerRequester("/auth/validateAdmin").get(),
};
