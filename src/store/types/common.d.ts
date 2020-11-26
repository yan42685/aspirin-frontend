import { GetterTree, ActionTree, MutationTree, ModuleTree } from "vuex";

// 替换 vuex4 定义的Module
export interface MyModule<T> {
  namespaced?: boolean;
  state?: T | (() => T);
  getters?: GetterTree<T, T>;
  actions?: ActionTree<T, T>;
  mutations?: MutationTree<T>;
  modules?: ModuleTree<T>;
}
