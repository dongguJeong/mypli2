export interface ILogin {
  message: string;
  user?: {
    id: number;
    email: string;
  };
}

export interface ILoginBody {
  email: string;
  password: string;
}
