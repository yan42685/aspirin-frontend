import { createStore } from "vuex";

// mutation示例
// state.testType = { ...state.testType, ...testType };

const files = require.context("./modules", false, /\.(js|ts)$/);
const registeredModules = {} as { [key: string]: any };
files.keys().forEach(filenameWithExtension => {
  const filename = filenameWithExtension.replace(/(\.\/|\.js|\.ts)/g, "");
  // 这里的default就是export default出去的对象
  registeredModules[filename] = files(filenameWithExtension).default;
});

// 自动注册./modules文件夹里定义的模块
// NOTE: 1. ./modules文件夹只能定义vuex的modules
//       2. module必须用export default
//       3. 可能只适用于vuex4, 不知道未来有没有breaking change
export const store = createStore({
  modules: registeredModules
});
