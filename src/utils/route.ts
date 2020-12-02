import {
  RouteRecordRaw,
  RouteLocation,
  RouteRecordNormalized
} from "vue-router";
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

export async function updateDynamicRoutes() {
  let accessibleDynamicRootRoutes = [] as RouteRecordRaw[];
  if (internalConfig.accessControl) {
    accessibleDynamicRootRoutes = await store.dispatch(
      "setAccessibleRootRoutes"
    );
  } else {
    accessibleDynamicRootRoutes = await store.dispatch("setAllRootRoutes");
  }

  // addRoute方法会自动替换同名的route
  accessibleDynamicRootRoutes.forEach(route => router.addRoute(route));

  store.commit("setIsRootRoutesDynamicAdded");
}

export function routeMetaContains(
  route: RouteRecordNormalized | RouteLocation,
  field: string
): boolean {
  let result = false;
  if (route.meta && field in route.meta) {
    result = true;
  }
  return result;
}
