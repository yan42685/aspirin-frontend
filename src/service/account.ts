import { getRequest } from "@/utils/request";
import { cookies } from "@/utils/basic-lib";

export async function logout() {
  window.location.href = "http://alexyan.cn:12346";
  cookies.remove("aspirin-role");
  getRequest("/api/account/logout");
  return;
}
