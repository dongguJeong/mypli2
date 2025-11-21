import type { AxiosRequestConfig } from "axios";
import { BaseRequester } from "./base";

export class ServerRequester<
  Req = unknown,
  Res = unknown,
  Body = unknown
> extends BaseRequester<Req, Res, Body> {
  constructor(baseURL?: string, config?: AxiosRequestConfig) {
    super(import.meta.env.VITE_API_URL + baseURL, config);
  }
}
