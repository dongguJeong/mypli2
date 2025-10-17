import type { LoginResponse } from "../models/auth.model";
import { httpClient } from "./http";

export interface LoginProps {
  email: string;
  password: string;
}
export const Auth = {
  async login(data: LoginProps) {
    const res = await httpClient.post<LoginResponse>("/auth/login", data);
    return res.data;
  },

  async signup(data: LoginProps) {
    const res = await httpClient.post<LoginResponse>("/auth/signup", data);
    return res.data;
  },

  async logout() {
    const res = await httpClient.get<{ message: string }>("/auth/logout");
    return res.data;
  },

  async status() {
    const res = await httpClient.get("/auth/status");
    return res.data.user;
  },
};
