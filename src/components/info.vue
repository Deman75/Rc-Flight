<template lang="pug">
section.info
  .info__image
    img(alt="" src="../assets/images/water.jpg").info__image-img
  title-section(
    :titleData="titleData"
  )
  article.article
    | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  button(type="button").button
    | Читать полностью
</template>

<script>
import titleSection from "@/components/title-section.vue"
export default {
  components: {
    titleSection
  },
  data() {
    return {
      titleData: {
        title: "Авиамоделизм",
        text: "Это не только спорт. Это нечто большее. Образ жизни, умение строить модели и быть летчиком испытателем, не рискуя жизнью. В статье немного подробнее об этом!"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  background-color: #fff;
  width: 100%;
  padding-bottom: 20px;
}
.info__image {
  width: 90%;
  margin: 0 auto;
  max-height: 550px;
  overflow: hidden;
}
.info__image-img {
  width: 100%;
}
.article {
  width: 90%;
  margin: 0 auto;
  text-align: left;
  font-size: 20px;
  font-weight: 300;
  padding-bottom: 20px;
  margin-top: -40px;
  text-indent: 20px;
}
.button {
  padding: 10px 20px;
  margin: 0 auto;
  font-size: 16px;
  background-color: #df7366;
  color: #fff;
  border-radius: 5px;
  transition: background-color .3s;

  &:hover {
    background-color: #ef8376;
  }
}
</style>
