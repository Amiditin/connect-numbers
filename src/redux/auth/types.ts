export interface IUser {
  email: string;
}

interface IAuthUser {
  user: IUser;
  isAuth: true;
}

interface INotAuthUser {
  user: null;
  isAuth: false;
}

export type IAuthState = IAuthUser | INotAuthUser;
