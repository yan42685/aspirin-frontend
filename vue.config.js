module.exports = {
  pluginOptions: {
    // ts引入css module 不用加上.module
    css: {
      modules: true, // 开启css modules
      requireModuleExtension: false,
      loaderOptions: {
        scss: {
          // 自动导入变量
          data: `@import "~@/styles/variables.scss";`,
          modules: true
        }
      }
    }
  }
};
