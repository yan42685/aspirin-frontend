// const path = require("path");
module.exports = {
  pluginOptions: {
    css: {
      loaderOptions: {
        sass: {
          additionalData: `@import "~@/variables.sass"`
        }
      }
    }
  }
};
