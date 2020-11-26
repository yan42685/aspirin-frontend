import { RouteLocation } from "vue-router";
import { MyModule } from "../types/common";

interface TabState {
  visitedRoutes: Array<RouteLocation>;
}

// 这里泛型用两个相同的类型就可以，原因是vuex定义的类型有缺陷
const module: MyModule<TabState> = {
  namespaced: true,
  state: { visitedRoutes: [] },
  getters: { visitedRoutes: state => state.visitedRoutes },
  mutations: {
    // @description 添加标签页
    addVisitedRoute(state, route: RouteLocation) {
      const target = state.visitedRoutes.find(item => item.path === route.path);
      if (target) {
        if (route.fullPath !== target.fullPath) Object.assign(target, route);
        return;
      }
      state.visitedRoutes.push(Object.assign({}, route));
    },

    // @description 删除当前标签页
    delVisitedRoute(state, route: RouteLocation) {
      state.visitedRoutes.forEach((item, index) => {
        if (item.path === route.path) state.visitedRoutes.splice(index, 1);
      });
    },

    // @description 删除当前标签页以外其它全部多标签页
    delOthersVisitedRoutes(state, route: RouteLocation) {
      state.visitedRoutes = state.visitedRoutes.filter(
        item => item.meta.affix || item.path === route.path
      );
    },

    // @description 删除当前标签页左边全部多标签页
    delLeftVisitedRoutes(state, route: RouteLocation) {
      let index = state.visitedRoutes.length;
      state.visitedRoutes = state.visitedRoutes.filter(item => {
        if (item.name === route.name) index = state.visitedRoutes.indexOf(item);
        return item.meta.affix || index <= state.visitedRoutes.indexOf(item);
      });
    },

    // @description 删除当前标签页右边全部多标签页
    delRightVisitedRoutes(state, route: RouteLocation) {
      let index = state.visitedRoutes.length;
      state.visitedRoutes = state.visitedRoutes.filter(
        (item: RouteLocation) => {
          if (item.name === route.name)
            index = state.visitedRoutes.indexOf(item);
          return item.meta.affix || index >= state.visitedRoutes.indexOf(item);
        }
      );
    },

    // @description 删除全部多标签页
    delAllVisitedRoutes(state) {
      state.visitedRoutes = state.visitedRoutes.filter(item => item.meta.affix);
    }
  },

  actions: {}
};

export default module;
