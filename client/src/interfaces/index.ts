export interface IAuthInfo {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  id: string
  roles: Array<string>
  isActivated: boolean;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUserInfo {
  isAuthenticated?: boolean;
  user: IUser;
}

export interface IUserAuthInfo {
  authInfo: IUserInfo;
}
export interface IUiInfo {
  uiInfo: { [k: string]: boolean }
}
export interface IAction<T> {
  type: string;
  payload?: T;
}