import type { AxiosRequestConfig } from "axios";
import { BaseRequester } from "./base";

export class ServerRequester extends BaseRequester {
  constructor(baseURL?: string, config?: AxiosRequestConfig) {
    super(import.meta.env.VITE_API_URL + baseURL, config);
  }
}
