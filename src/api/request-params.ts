import { RoleEnum } from "./rest-api";

export interface LoginParams {
  role: RoleEnum;
  username: string;
  password: string;
  rememberMe: boolean;
  verificationCode?: string;
}

export const bigPage = {
  current: 1,
  size: 999999,
  [Symbol.iterator]: function*() {
    let properties = Object.keys(this);
    for (let i of properties) {
      yield [i, this[i]];
    }
  }
};
