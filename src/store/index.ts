import { dynamicRoutes, staticRoutes } from "@/router";
import { createStore, ActionTree } from "vuex";
import { AllState } from "./types";
import { filterRoutes } from "@/utils/route";

export const store = createStore<AllState>({
  state: {
    user: { role: null },
    tab: { visitedRoutes: [] },
    route: { accessibleArray: [] }
  },

  getters: {},

  mutations: {
    setRoutes({ route }, routes) {
      route.accessibleArray = routes;
    },
    setUserInfo() {
      console.log("TODO");
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
