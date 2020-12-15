import { getRequest } from "../request";
import { store } from "@/store";
import { eventBus } from "../event-bus";
import { messenger } from "../my-ant-design-vue";
import { RoleEnum } from "@/api/rest-api";
import { internalConfig } from "@/config/app-settings";

export function loginHook() {
  if (internalConfig.isDebug) {
    // 测试用的虚拟学生登录

    const loginParams = {
      role: RoleEnum.TEACHER,
      username: "2222",
      password: "123456",
      rememberMe: true
    };

    getRequest("/api/account/user-login", loginParams);

    // 权限过滤的依据
    localStorage.setItem("aspirin-role", "teacher");

    store.commit("setUserRole", loginParams.role);
    switch (loginParams.role) {
      case RoleEnum.STUDENT:
        store.commit("getStudentInfo");
        break;
      case RoleEnum.TEACHER:
        store.commit("getTeacherInfo");
        break;

      default:
    }
  } else {
    store.commit("setUserRole", RoleEnum.STUDENT);
    store.commit("getStudentInfo");
  }
}
