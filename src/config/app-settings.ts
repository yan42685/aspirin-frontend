export const settings: any = {};

export class AppSetting {
  theme: "light" | "dark" = "light";
}

export class InternalConfig {
  accessControl = false; // 是否开启权限控制
  loginInterception = false; // 是否开启登录拦截
  appName = "Aspirin Platform";
}

export const internalConfig = new InternalConfig();
