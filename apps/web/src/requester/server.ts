import type { AxiosRequestConfig } from "axios";
import { BaseRequester } from "./base";

export class ServerRequester<
  Res = unknown,
  Body = unknown
> extends BaseRequester<Res, Body> {
  constructor(baseURL?: string, config?: AxiosRequestConfig) {
    super(import.meta.env.VITE_API_URL + baseURL, config);
  }
}
