import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export class BaseRequester<Res = unknown, Body = unknown> {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
      ...config,
    });
  }

  async get(): Promise<AxiosResponse<Res>> {
    return this.instance.get<Res>(`${this.baseURL}`);
  }

  async post(data?: Body): Promise<AxiosResponse<Res>> {
    return this.instance.post<Res>(`${this.baseURL}`, data);
  }

  async patch(data?: Body): Promise<AxiosResponse<Res>> {
    return this.instance.patch<Res>(`${this.baseURL}`, data);
  }

  async delete(): Promise<AxiosResponse<Res>> {
    return this.instance.delete<Res>(`${this.baseURL}`);
  }
}
