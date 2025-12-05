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

  protected async getRequest(path: string): Promise<AxiosResponse<Res>> {
    return this.instance.get<Res>(path);
  }

  protected async postRequest(
    path: string,
    data?: Body
  ): Promise<AxiosResponse<Res>> {
    return this.instance.post<Res>(path, data);
  }

  protected async patchRequest(
    path: string,
    data?: Body
  ): Promise<AxiosResponse<Res>> {
    return this.instance.patch<Res>(path, data);
  }

  protected async deleteRequest(path: string): Promise<AxiosResponse<Res>> {
    return this.instance.delete<Res>(path);
  }
}
