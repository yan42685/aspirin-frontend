import { RoleEnum } from "./rest-api";

export interface LoginParams {
  role: RoleEnum;
  username: string;
  password: string;
  rememberMe: boolean;
  verificationCode?: string;
}
