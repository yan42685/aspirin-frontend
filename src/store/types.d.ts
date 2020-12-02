import { RoleEnum } from "@/api/rest-api";
import { RouteLocation, RouteRecordRaw } from "vue-router";

export interface AllState {
  user: UserState;
  tabBar: TabBarState;
  route: RouteState;
  layout: LayoutState;
}

export interface UserState {
  role: RoleEnum | null;
}

export interface TabBarState {
  openTabs: Array<RouteLocation>;
}

export interface RouteState {
  isRootDynamicallyAdded: boolean;
}

export interface LayoutState {
  sidebarCollapsed: boolean;
}
