import { dynamicRootRoutes, staticRootRoutes } from "@/router";
import { createStore } from "vuex";
import { tabBarMutations } from "./modules/tab-bar";
import { AllState } from "./types";
import { RouteRecordRaw } from "vue-router";
import { hasPermission } from "@/utils/route";

export const store = createStore<AllState>({
  state: {
    user: { role: null },
    tabBar: { openTabs: [] },
    route: { accessibleArray: [], isRootDynamicallyAdded: false },
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
    setIsRootRoutesDynamicAdded({ route }) {
      route.isRootDynamicallyAdded = true;
    },

    // ==========================
    //  标签页
    // ==========================
    ...tabBarMutations
  },

  actions: {
    setAllRootRoutes({ commit }) {
      const allRootRoutes = [
        ...staticRootRoutes,
        ...dynamicRootRoutes
      ] as RouteRecordRaw[];
      commit("setRoutes", allRootRoutes);
      return dynamicRootRoutes;
    },

    // 只设置有权限的路由
    setAccessibleRootRoutes({ commit }): RouteRecordRaw[] {
      const accessibleRootRoutes: RouteRecordRaw[] = [
        ...staticRootRoutes,
        ...dynamicRootRoutes
      ].filter(route => hasPermission(route));
      commit("setRoutes", accessibleRootRoutes);
      return [...dynamicRootRoutes].filter(router => hasPermission(router));
    }

    // async fetchUserInfo() {
    // }
  }
});
