import { internalConfig } from "@/config/app-settings";
import { store } from "@/store";
import { messenger } from "@/utils/my-ant-design-vue";
import { hasPermission } from "@/utils/route";
import { loginRedirect } from "@/utils/timeout-actions";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Framework from "../layout/framework/Framework.vue";
import { studentRoutes } from "./modules/student";
import { teacherRoutes } from "./modules/teacher";

// 旧版本是RouteConfig 新版本是RouteRecordRaw
export const staticRootRoutes: Array<RouteRecordRaw> = [
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
          // 是否固定到标签页
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

export const dynamicRootRoutes: RouteRecordRaw[] = [
  {
    name: "Page",
    path: "/page",
    component: Framework,
    meta: {
      title: "首页",
      icon: "home"
      // affix: true // TODO: 取消注释
    },
    children: [
      {
        name: "Test",
        path: "test",
        component: () => import("../views/pages/Test.vue"),
        meta: { title: "测试页面" }
      },
      {
        name: "Test2",
        path: "test-two",
        component: () => import("../views/pages/TestTwo.vue"),
        meta: { title: "测试页面 Two" }
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

  // 模块
  ...studentRoutes,
  ...teacherRoutes,

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
  routes: [...staticRootRoutes, ...dynamicRootRoutes]
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
    // TODO: 待处理
    next();
  }
});

router.afterEach(to => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + " - " + internalConfig.appName;
  }
});

// 在vur-router 3.0是onReady()
router.isReady().then(async () => {
  // NOTE: 巨坑，因为这个函数是异步的，所以需要await, 不然找不到路由
  [...staticRootRoutes, ...dynamicRootRoutes]
    .filter(route => hasPermission(route))
    .forEach(route => router.addRoute(route));
});

export { router };
