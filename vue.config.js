module.exports = {
  pluginOptions: {
    // ts引入css module 不用加上.module
    css: {
      requireModuleExtension: false,
      loaderOptions: {
        scss: {
          data: `@import "~@/styles/variables.scss";`
        }
      }
    }
  }
};
