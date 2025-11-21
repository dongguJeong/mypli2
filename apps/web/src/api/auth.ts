import type { ILogin } from "../component/modals/LoginModal";
import type { LoginResponse } from "../model/auth";
import { ServerRequester } from "../requester/server";

export const Auth = {
  login: ({ email, password }: ILogin) =>
    new ServerRequester<unknown, LoginResponse, ILogin>("/auth").post(
      "/login",
      { email, password }
    ),
  signup: ({ email, password }: ILogin) =>
    new ServerRequester<unknown, LoginResponse, ILogin>("/auth").post(
      "/signup",
      { email, password }
    ),
  status: () => new ServerRequester("/auth").get("/status"),
  logout: () => new ServerRequester("/auth").get("/logout"),
};
