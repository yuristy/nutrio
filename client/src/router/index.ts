import { ComponentType } from "react";
import Welcome from "../components/Welcome/Welcome";
import AuthLoginForm from "../components/AuthForm/AuthLoginForm/AuthLoginForm";
import AuthRegForm from "../components/AuthForm/AuthRegForm/AuthRegForm";

export interface IRoute {
  path: string,
  element: ComponentType
}

export enum RouteNames {
  WELCOME = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration'
};

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.WELCOME,
    element: Welcome,
  },
  {
    path: RouteNames.REGISTRATION,
    element: AuthRegForm,
  },
  {
    path: RouteNames.LOGIN,
    element: AuthLoginForm,
  },
]

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.WELCOME,
    element: Welcome,
  },
  {
    path: RouteNames.REGISTRATION,
    element: AuthRegForm,
  },
  {
    path: RouteNames.LOGIN,
    element: AuthLoginForm,
  },
]