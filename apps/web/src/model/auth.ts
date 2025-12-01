export interface ILogin {
  message: string;
  user?: {
    id: number;
    email: string;
  };
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface ISignUpBody {
  email: string;
  username: string;
  password: string;
}
