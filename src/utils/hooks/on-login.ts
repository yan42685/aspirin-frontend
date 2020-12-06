import { getRequest } from "../request";
import { store } from "@/store";
import { eventBus } from "../event-bus";
import { messenger } from "../my-ant-design-vue";
import { RoleEnum } from "@/api/rest-api";
import { internalConfig } from "@/config/app-settings";

export function loginHook() {
  // 测试用的登录
  //
  if (internalConfig.isDebug) {
    const loginParams = {
      role: RoleEnum.STUDENT,
      username: "stu",
      password: "123456",
      rememberMe: true
    };

    getRequest("/api/account/user-login", loginParams);

    store.commit("setUserRole", loginParams.role);
    switch (loginParams.role) {
      case RoleEnum.STUDENT:
        store.commit("getStudentInfo");
        break;

      default:
    }
  } else {
    store.commit("setUserRole", RoleEnum.STUDENT);
    store.commit("getStudentInfo");
  }
}
