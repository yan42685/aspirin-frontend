import { RouteRecordRaw, RouteLocation } from "vue-router";
import { internalConfig } from "@/config/app-settings";
import { store } from "@/store";
import { RoleEnum } from "@/api/rest-api";
import { router } from "@/router";
import { Route } from "ant-design-vue/lib/breadcrumb/Breadcrumb";

export function hasPermission(route: RouteRecordRaw | RouteLocation) {
  if (internalConfig.accessControl && route.meta && route.meta.roles) {
    const requiredRoles: Array<RoleEnum> = route.meta.roles;
    const currentRole = store.state.user?.role;
    return !!currentRole && requiredRoles.includes(currentRole);
  }
  return true;
}

export function filterRoutes(
  routes: Array<RouteRecordRaw>
): Array<RouteRecordRaw> {
  const accessibleRoutes = routes.filter(route => {
    if (hasPermission(route)) {
      if (route.children) {
        // 递归过滤路由
        route.children = filterRoutes(route.children);
      }
      return true;
    }
    return false;
  });
  return accessibleRoutes;
}

export async function addDynamicRoutes() {
  // 已经动态添加过就不用加了
  if (store.state.route.isDynamicallyAdded) {
    return;
  }

  let accessibleDynamicRoutes: Array<RouteRecordRaw> = [];
  if (!internalConfig.accessControl) {
    accessibleDynamicRoutes = await store.dispatch("setAllRoutes");
  } else {
    accessibleDynamicRoutes = await store.dispatch("setAccessibleRoutes");
  }
  accessibleDynamicRoutes.forEach(item => {
    router.addRoute(item);
  });
}
