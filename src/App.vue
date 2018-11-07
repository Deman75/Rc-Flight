<template lang="pug">
  #app
    .main-content
      app_nav
      router-view.content
    app_footer
</template>

<script>
import Nav from "@/components/nav.vue"
import Footer from "@/components/footer.vue"

export default {
  components: {
    app_nav: Nav,
    app_footer: Footer
  }
};
</script>

<style lang="scss">
@import "~@/assets/fonts/fonts.scss";

body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  font-size: 16px;
  color: #483949;
  line-height: 1.42;
}

ul {
  margin: 0;
  padding: 0;

  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
button[type="button"] {
  border: none;
  cursor: pointer;
  background-color: #fff;
  display: block;
  margin: 0;
  padding: 0;
  &:focus {
    outline: none;
  }
}
h1,h2,h3,h4,p {
  margin: 0;
  padding: 0;
}
article, img {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-weight: 400;
  width: 100%;
  min-height: 100%;
}

</style>
