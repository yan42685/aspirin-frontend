import { RoleEnum } from "@/api/rest-api";
import { RouteRecord, RouteRecordRaw } from "vue-router";

export interface AllState {
  user: UserState;
  tab: TabState;
  route: RouteState;
  layout: LayoutState;
}

export interface UserState {
  role: RoleEnum | null;
}

export interface TabState {
  visitedRoutes: Array<RouteRecordRaw>;
}

export interface RouteState {
  accessibleArray: Array<RouteRecordRaw>;
}

export interface LayoutState {
  sidebarCollapsed: boolean;
}
