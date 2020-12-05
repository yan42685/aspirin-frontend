import { RoleEnum } from "@/api/rest-api";
import { getRequest } from "../request";
import { store } from "@/store";
import { eventBus } from "../event-bus";
import { messenger } from "../my-ant-design-vue";

export function loginHook() {
  // 测试用的登录
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
}
