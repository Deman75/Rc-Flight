<template lang="pug">
div.home
  section.hero
    Hero
  title-section(
    :titleData="titleData"
    )
  slider
  info
</template>

<script>
import Hero from "@/components/hero.vue"
import titleSection from "@/components/title-section.vue"
import slider from "@/components/slider.vue"
import info from "@/components/info.vue"

export default {
  name: "home",
  components: {
    Hero,
    titleSection,
    slider,
    info
  },
  data() {
    return {
      titleData: {
        title: "Так мы летаем!",
        text: "Летаем круглогодично. Здесь мы собрали немного фотографий с полетов."
      }
    }
  }
};
</script>

<style lang="scss">
.hero {
  min-height: 650px;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @include tablet {
    min-height: auto;
  }
}
</style>
