export interface LoginResponse {
  message: string;
  user?: {
    id: number;
    email: string;
  };
}
