import { createStore } from "vuex";

// mutation示例
// state.testType = { ...state.testType, ...testType };

const files = require.context("./modules", false, /\.(js|ts)$/);
const registeredModules = {} as { [key: string]: any };
files.keys().forEach(filenameWithExtension => {
  const filename = filenameWithExtension.replace(/(\.\/|\.js|\.ts)/g, "");
  registeredModules[filename] = files(filenameWithExtension).filename;
});

// 自动注册./modules文件夹里定义的模块
// NOTE: 1. ./modules文件夹只能定义vuex的modules
//       2. module导出的对象名字应该是不带扩展名的文件名
//       3. 可能只适用于vuex4, 不知道未来有没有breaking change
export const store = createStore({
  modules: registeredModules
});
