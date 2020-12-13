import {
  RouteRecordRaw,
  RouteLocation,
  RouteRecordNormalized
} from "vue-router";
import { internalConfig } from "@/config/app-settings";

export function hasPermission(route: RouteRecordRaw | RouteLocation) {
  if (internalConfig.accessControl && route.meta && route.meta.roles) {
    const requiredRoles: string[] = route.meta.roles;
    const currentRole = localStorage.getItem("aspirin-role");
    return currentRole && requiredRoles.includes(currentRole);
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
