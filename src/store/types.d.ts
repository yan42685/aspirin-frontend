import { RoleEnum } from "@/api/rest-api";
import { StudentDTO, TeacherDTO } from "@/api/rest-api";
import { RouteLocation, RouteRecordRaw } from "vue-router";

export interface AllState {
  user: UserState;
  student: StudentState;
  tabBar: TabBarState;
  layout: LayoutState;
  teacher: TeacherState;
}

export interface UserState {
  role: RoleEnum | null;
  isInfoFetched: boolean;
}

export interface StudentState {
  info: StudentDTO;
}

export interface TeacherState {
  info: TeacherDTO;
  isInfoFetched: boolean;
}

export interface TabBarState {
  openTabs: Array<RouteLocation>;
}

export interface LayoutState {
  sidebarCollapsed: boolean;
}
