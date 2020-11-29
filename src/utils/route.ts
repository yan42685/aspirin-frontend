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

export function traverseRoutes(
  routes: RouteRecordRaw[],
  handler: (route: RouteRecordRaw) => void
) {
  if (routes.length === 0) {
    return;
  }
  routes.forEach(route => {
    handler(route);
    if (route.children && route.children.length > 0) {
      traverseRoutes(route.children, handler);
    }
  });
}

export function filterRoutesByPermission(
  routes: RouteRecordRaw[]
): RouteRecordRaw[] {
  const accessibleRoutes = [] as RouteRecordRaw[];
  traverseRoutes(routes, route => {
    if (hasPermission(route)) {
      accessibleRoutes.push(route);
    }
  });
  return accessibleRoutes;
}

export async function addDynamicRoutes() {
  // 已经动态添加过就不用加了
  if (store.state.route.isDynamicallyAdded) {
    return;
  }

  let accessibleDynamicRoutes = [] as RouteRecordRaw[];
  if (internalConfig.accessControl) {
    accessibleDynamicRoutes = await store.dispatch("setAccessibleRoutes");
  } else {
    accessibleDynamicRoutes = await store.dispatch("setAllRoutes");
  }

  accessibleDynamicRoutes.forEach(route => router.addRoute(route));
  store.commit("setRoutesIsDynamicAdded");
}
