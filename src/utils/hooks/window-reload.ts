import { loginHook } from "./on-login";
import { getRequest } from "../request";
import { cookies } from "../basic-lib";
import { store } from "@/store";

export function windowReloadHook() {
  loginHook();
}
