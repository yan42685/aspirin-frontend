import { dynamicRoutes, staticRoutes } from "@/router";
import { filterRoutes } from "@/utils/route";
import { createStore } from "vuex";
import { AllState } from "./types";

export const store = createStore<AllState>({
  state: {
    user: { role: null },
    tab: { visitedRoutes: [] },
    route: { accessibleArray: [] },
    layout: { sidebarCollapsed: false }
  },

  getters: {},

  mutations: {
    setRoutes({ route }, routes) {
      route.accessibleArray = routes;
    },
    setUserInfo() {
      console.log("TODO");
    },
    toggleSidebarCollapse({ layout }) {
      layout.sidebarCollapsed = !layout.sidebarCollapsed;
    }
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
