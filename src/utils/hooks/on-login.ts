import { getRequest } from "../request";
import { store } from "@/store";
import { eventBus } from "../event-bus";
import { messenger } from "../my-ant-design-vue";
import { RoleEnum } from "@/api/rest-api";
import { internalConfig } from "@/config/app-settings";
import { cookies } from "../basic-lib";

export function loginHook() {
  if (internalConfig.isDebug) {
    // 测试环境
    if (internalConfig.debugRole === "STUDENT") {
      // 测试用的虚拟学生登录

<<<<<<< HEAD
    const loginParams = {
      role: RoleEnum.TEACHER,
      username: "2222",
=======
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
    // 生产环境
    // NOTE: 应付检查用的，因多个前端项目共享JSESSIONID有问题, 所以直接登录测试账号好了，
    // 以后可以考虑把鉴权方式从cookies改成JWT
    const testStudentLoginParams = {
      role: RoleEnum.STUDENT,
      username: "stu",
>>>>>>> d7171522830ef937cba133e8e818af7d402908b3
      password: "123456",
      rememberMe: true
    };

<<<<<<< HEAD
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
=======
    const testTeacherLoginParams = {
      role: RoleEnum.TEACHER,
      username: "2222",
      password: "123456",
      rememberMe: true
    };

    // NOTE: localStorage在同一个IP不同端口之间不能共享，但是cookies可以在同一个IP不同端口共享
    // const role = localStorage.getItem("aspirin-role");
    const role = cookies.get("aspirin-role");
    store.commit("setUserRole", role);
>>>>>>> d7171522830ef937cba133e8e818af7d402908b3

    if (role === "STUDENT") {
      getRequest("/api/account/user-login", testStudentLoginParams);
      store.commit("getStudentInfo");
    } else if (role === "TEACHER") {
      getRequest("/api/account/user-login", testTeacherLoginParams);
      // TODO: 获取教师信息
    }
  }
}
