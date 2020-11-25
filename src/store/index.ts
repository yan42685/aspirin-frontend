import { createStore } from "vuex";
/*
 * @description: 导入所有 vuex 模块，自动加入namespaced:true，避免命名冲突
 */

// state.testType = { ...state.testType, ...testType };

const files = require.context("./modules", false, /(\.js|\.ts)$/);
const modules = {} as { [key: string]: any };
// 获取所有modules对象
files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js|\.ts)/g, "")] = files(key).default;
});
// 开启命名空间
Object.keys(modules).forEach(key => {
  modules[key]["namespaced"] = true;
});

export default createStore({
  modules
});
