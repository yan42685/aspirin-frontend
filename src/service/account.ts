import { getRequest } from "@/utils/request";

export async function logout() {
  window.location.href = "http://alexyan.cn:12346";
  getRequest("/api/account/logout");
  return;
}
