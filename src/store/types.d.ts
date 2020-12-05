import { RoleEnum } from "@/api/rest-api";
import { StudentDTO } from "@/api/rest-api";
import { RouteLocation, RouteRecordRaw } from "vue-router";

export interface AllState {
  user: UserState;
  student: StudentState;
  tabBar: TabBarState;
  layout: LayoutState;
}

export interface UserState {
  role: RoleEnum | null;
}

export interface StudentState {
  info: StudentDTO;
}

export interface TabBarState {
  openTabs: Array<RouteLocation>;
}

export interface LayoutState {
  sidebarCollapsed: boolean;
}
