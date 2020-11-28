import { MutationTree } from "vuex";
import { AllState } from "../types";
import { RouteLocation } from "vue-router";

export const tabBarMutations: MutationTree<AllState> = {
  addTab({ tabBar }, newTab: RouteLocation) {
    const oldSamePathTab = tabBar.openTabs.find(
      tab => tab.path === newTab.path
    );
    // 覆盖query参数不同但路径相同的tab
    if (oldSamePathTab && oldSamePathTab.fullPath !== newTab.fullPath) {
      Object.assign(oldSamePathTab, newTab);
      return;
    }
    // 浅克隆对象
    tabBar.openTabs.push(Object.assign({}, newTab));
  },

  deleteTab({ tabBar }, targetTab: RouteLocation) {
    tabBar.openTabs.forEach((tab, index) => {
      if (tab.path === targetTab.path) {
        tabBar.openTabs.splice(index, 1);
      }
    });
  },

  deleteOtherTabs({ tabBar }, currentTab: RouteLocation) {
    tabBar.openTabs = tabBar.openTabs.filter((tab: RouteLocation) => {
      if (tab.meta && tab.meta.affix) {
        return true;
      } else if (tab.path == currentTab.path) {
        return true;
      } else {
        return false;
      }
    });
  },

  deleteLeftTabs({ tabBar }, currentTab: RouteLocation) {
    let index = tabBar.openTabs.length;
    const openTabs = tabBar.openTabs;
    tabBar.openTabs = openTabs.filter((tab: RouteLocation) => {
      if (tab.name === currentTab.name) {
        index = openTabs.indexOf(tab);
      }
      return tab.meta.affix || openTabs.indexOf(tab) >= index;
    });
  },

  deleteRightTabs({ tabBar }, currentTab: RouteLocation) {
    let index = tabBar.openTabs.length;
    const openTabs = tabBar.openTabs;
    tabBar.openTabs = openTabs.filter((tab: RouteLocation) => {
      if (tab.name === currentTab.name) {
        index = openTabs.indexOf(tab);
      }
      return tab.meta.affix || openTabs.indexOf(tab) <= index;
    });
  },

  deleteAllTabs({ tabBar }) {
    tabBar.openTabs = tabBar.openTabs.filter(
      (tab: RouteLocation) => tab.meta.affix
    );
  }
};
