import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export class BaseRequester<Req = unknown, Res = unknown, Body = unknown> {
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

  async get(endpoint: string, params?: Req): Promise<AxiosResponse<Res>> {
    return this.instance.get<Res>(`${this.baseURL}${endpoint}`, { params });
  }

  async post(endpoint: string, data?: Body): Promise<AxiosResponse<Res>> {
    return this.instance.post<Res>(`${this.baseURL}${endpoint}`, data);
  }

  async patch(endpoint: string, data?: Body): Promise<AxiosResponse<Res>> {
    return this.instance.patch<Res>(`${this.baseURL}${endpoint}`, data);
  }

  async delete(endpoint: string, params?: Req): Promise<AxiosResponse<Res>> {
    return this.instance.delete<Res>(`${this.baseURL}${endpoint}`, { params });
  }
}
