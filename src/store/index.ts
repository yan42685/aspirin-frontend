import { dynamicRoutes, staticRoutes } from "@/router";
import { filterRoutes } from "@/utils/route";
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

    // ==========================
    //  标签页
    // ==========================
    ...tabBarMutations
  },

  actions: {
    setAllRoutes({ commit }) {
      const allRoutes = [...staticRoutes, ...dynamicRoutes];
      commit("setRoutes", allRoutes);
      return dynamicRoutes;
    },
    // 只设置有权限的路由
    setAccessibleRoutes({ commit }) {
      const accessibleDynamicRoutes = filterRoutes(dynamicRoutes);
      commit("setRoutes", [...staticRoutes, accessibleDynamicRoutes]);
      return accessibleDynamicRoutes;
    }

    // async fetchUserInfo() {
    // }
  }
});
