import { getRequest } from "../request";
import { store } from "@/store";
import { RoleEnum } from "@/api/rest-api";
import { internalConfig } from "@/config/app-settings";
import { cookies } from "../basic-lib";

const testStudentLoginParams = {
  role: RoleEnum.STUDENT,
  username: "stu",
  password: "123456",
  rememberMe: true
};

const testTeacherLoginParams = {
  role: RoleEnum.TEACHER,
  username: "2222",
  password: "123456",
  rememberMe: true
};

export function loginHook() {
  if (internalConfig.isDebug) {
    // 测试环境
    if (internalConfig.debugRole === "STUDENT") {
      getRequest("/api/account/user-login", testStudentLoginParams);

      // 权限过滤的依据
      cookies.set("aspirin-role", "STUDENT");

      // 字符串可以当枚举传递，只要和枚举的值相等就行
      store.commit("setUserRole", "STUDENT");
      store.commit("getStudentInfo");
    } else if (internalConfig.debugRole === "TEACHER") {
      getRequest("/api/account/user-login", testTeacherLoginParams);

      cookies.set("aspirin-role", "TEACHER");
      store.commit("setUserRole", "TEACHER");
      store.commit("getTeacherInfo");
    }
  } else {
    // 生产环境
    // NOTE: 应付检查用的，因多个前端项目共享JSESSIONID有问题, 所以直接登录测试账号好了，
    // 以后可以考虑把鉴权方式从cookies改成JWT

    // NOTE: localStorage在同一个IP不同端口之间不能共享，但是cookies可以在同一个IP不同端口共享
    // const role = localStorage.getItem("aspirin-role");
    const role = cookies.get("aspirin-role");
    store.commit("setUserRole", role);

    if (role === "STUDENT") {
      getRequest("/api/account/user-login", testStudentLoginParams);
      store.commit("getStudentInfo");
    } else if (role === "TEACHER") {
      getRequest("/api/account/user-login", testTeacherLoginParams);
      store.commit("getTeacherInfo");
    }
  }
}
