import { getRequest } from "@/utils/request";
import { store } from "@/store";
import { cookies } from "@/utils/basic-lib";

export async function logout() {
  cookies.remove("aspirin-role");
  getRequest("/api/account/logout");
  // 避免因为state持久化让下一个用户也出现上个用户的tabs
  store.commit("deleteAllTabs");
  window.location.href = "http://alexyan.cn:12346";
  return;
}
