module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/variables.scss";
          @import "@/assets/scss/mixins.scss";
        `
      }
    }
  }
};
