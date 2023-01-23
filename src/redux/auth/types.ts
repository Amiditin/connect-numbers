export interface IUser {
  email: string;
}

export interface IAuthState {
  user: IUser | null;
  isAuth: boolean;
}
