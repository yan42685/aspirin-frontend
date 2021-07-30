import { cookies } from "./basic-lib";

const TOKEN_KEY = "tokenForRequest";
const ROLE_KEY = "userRole";

export function getToken(): string {
    const token = cookies.get(TOKEN_KEY);
    return token ? token : "";
}

export function saveToken(token: string) {
    cookies.set(TOKEN_KEY, token);
}

export function getRole(): string {
    const role = cookies.get(ROLE_KEY);
    return role ? role : "";
}

export function saveRole(role: string) {
    cookies.set(ROLE_KEY, role);
}
