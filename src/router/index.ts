import { internalConfig } from "@/config/app-settings";
import { store } from "@/store";
import { messenger } from "@/utils/my-ant-design-vue";
import { hasPermission, addDynamicRoutes } from "@/utils/route";
import { loginRedirect } from "@/utils/timeout-actions";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Framework from "../layout/framework/Framework.vue";

export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Framework,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../views/pages/UseHome.vue"),
        meta: {
          title: "首页",
          icon: "home-4-line",
          affix: true
        }
      }
    ]
  },

  {
    name: "Login",
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: {
      // 决定是否出现在侧栏菜单中
      hidden: true
    }
  },
  {
    name: "404",
    path: "/404",
    component: () => import("@/views/404.vue"),
    meta: {
      hidden: true
    }
  }
];

export const dynamicRoutes: Array<RouteRecordRaw> = [
  {
    name: "Page",
    path: "/page",
    component: Framework,
    meta: {
      title: "首页",
      icon: "home",
      affix: true
    },
    children: [
      {
        name: "Test",
        path: "test",
        component: () => import("../views/pages/Test.vue"),
        meta: { title: "测试页面" }
      },
      {
        name: "UserCenter",
        path: "user-center",
        component: () => import("../views/pages/UserCenter.vue"),
        meta: {
          title: "用户中心"
        }
      }
    ]
  },
  // 在动态路由注入后，再注入404重定向规则，以确保该规则至于路由表最底部
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
    meta: {
      hidden: true
    }
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
  } else {
    // 不检查登录或者已经登录了，才会动态添加 routes
    await addDynamicRoutes();
    next();
  }
});

router.afterEach(to => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + " - " + internalConfig.appName;
  }
});

export { router };
