export interface IUser {
  email: string;
}

export interface IAuthState {
  user: null | IUser;
  isAuth: boolean;
}
