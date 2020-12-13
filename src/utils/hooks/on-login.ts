import { getRequest } from "../request";
import { store } from "@/store";
import { eventBus } from "../event-bus";
import { messenger } from "../my-ant-design-vue";
import { RoleEnum } from "@/api/rest-api";
import { internalConfig } from "@/config/app-settings";
import { cookies } from "../basic-lib";

export function loginHook() {
  if (internalConfig.isDebug) {
    if (internalConfig.debugRole === "STUDENT") {
      // 测试用的虚拟学生登录

      const loginParams = {
        role: RoleEnum.STUDENT,
        username: "stu",
        password: "123456",
        rememberMe: true
      };

      getRequest("/api/account/user-login", loginParams);

      // 权限过滤的依据
      cookies.set("aspirin-role", "STUDENT");

      // 字符串可以当枚举传递，只要和枚举的值相等就行
      store.commit("setUserRole", "STUDENT");
      store.commit("getStudentInfo");
    } else if (internalConfig.debugRole === "TEACHER") {
      cookies.set("aspirin-role", "TEACHER");
      store.commit("setUserRole", "TEACHER");
      // TODO: 获取教师信息
    }
  } else {
    // NOTE: localStorage在同一个IP不同端口之间不能共享，但是cookies可以在同一个IP不同端口共享
    // const role = localStorage.getItem("aspirin-role");
    const role = cookies.get("aspirin-role");
    store.commit("setUserRole", role);
    if (role === "STUDENT") {
      store.commit("getStudentInfo");
      console.log(3);
    }
  }
}
