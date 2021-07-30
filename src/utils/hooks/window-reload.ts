import { loginHook } from "./on-login";

export function windowReloadHook() {
    loginHook();
}
