import { dynamicRoutes, staticRoutes } from "@/router";
import { filterRoutesByPermission, traverseRoutes } from "@/utils/route";
import { createStore } from "vuex";
import { tabBarMutations } from "./modules/tab-bar";
import { AllState } from "./types";
import { RouteRecordRaw } from "vue-router";

export const store = createStore<AllState>({
  state: {
    user: { role: null },
    tabBar: { openTabs: [] },
    route: { accessibleArray: [], isDynamicallyAdded: false },
    layout: { sidebarCollapsed: false }
  },

  getters: {},

  mutations: {
    // ==========================
    //  路由
    // ==========================
    setRoutes({ route }, routes: Array<RouteRecordRaw>) {
      route.accessibleArray = routes;
    },
    toggleSidebarCollapse({ layout }) {
      layout.sidebarCollapsed = !layout.sidebarCollapsed;
    },
    setRoutesIsDynamicAdded({ route }) {
      route.isDynamicallyAdded = true;
    },

    // ==========================
    //  标签页
    // ==========================
    ...tabBarMutations
  },

  actions: {
    setAllRoutes({ commit }) {
      const allRoutes = [] as RouteRecordRaw[];
      traverseRoutes([...staticRoutes, ...dynamicRoutes], route =>
        allRoutes.push(route)
      );
      commit("setRoutes", allRoutes);
      return dynamicRoutes;
    },

    // 只设置有权限的路由
    setAccessibleRoutes({ commit }) {
      const accessibleDynamicRoutes = filterRoutesByPermission(dynamicRoutes);
      commit("setRoutes", [...staticRoutes, accessibleDynamicRoutes]);
      return accessibleDynamicRoutes;
    }

    // async fetchUserInfo() {
    // }
  }
});
