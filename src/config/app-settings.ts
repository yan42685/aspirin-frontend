export const settings: any = {};

export class AppSetting {
  theme: "light" | "dark" = "light";
}

export class InternalConfig {
  accessControl = true; // 是否开启权限控制
  loginInterception = true; // 是否开启登录拦截
  appName = "Aspirin Platform";
  keepAliveMaxNum = 10;
  isDebug = false;
  // debug 模式下自动登录的角色
  debugRole: "ADMINISTRATOR" | "STUDENT" | "TEACHER" = "TEACHER";
}

export const internalConfig = new InternalConfig();
