import { internalConfig } from "@/config/app-settings";
import { store } from "@/store";
import { messenger } from "@/utils/my-ant-design-vue";
import { hasPermission } from "@/utils/route";
import { loginRedirect } from "@/utils/timeout-actions";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const staticRoutes: Array<RouteRecordRaw> = [
  {
    name: "index",
    path: "/",
    component: () => import("../views/index.vue")
  },
  {
    name: "login",
    path: "/login",
    component: () => import("../views/Login.vue")
  },
  {
    name: "404",
    path: "/404",
    component: () => import("@/views/404.vue")
  }
];

export const dynamicRoutes: Array<RouteRecordRaw> = [
  // 在动态路由注入后，再注入404重定向规则，以确保该规则至于路由表最底部
  {
    path: "*",
    redirect: "/404"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes
});

const ROUTE_WHITE_LIST = ["/login", "/register", "/404"];

router.beforeEach(async (to, from, next) => {
  if (ROUTE_WHITE_LIST.includes(to.path)) {
    next();
  } else if (internalConfig.loginInterception && !store.state.user.role) {
    loginRedirect();
  } else if (internalConfig.accessControl && !hasPermission(to)) {
    messenger.warning("抱歉，您没有权限访问此资源");
  }
});

router.afterEach(to => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + " - " + internalConfig.appName;
  }
});

export { router };
