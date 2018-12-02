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
import Hero from "@/components/hero.vue";
import titleSection from "@/components/title-section.vue";
import slider from "@/components/slider.vue";
import info from "@/components/info.vue";
import { mapState } from 'vuex';

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
      },
      width: 0,
      height: 0,
      dateLastActive: 0,
      playVideo: true
    }
  },
  created() {
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  computed: {
    ...mapState({
      touchDevice: 'touchDevice'
    }),
  },
  mounted() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const hero = document.querySelector('.hero');
    hero.style.height=`${this.height}px`;
  },
  methods: {
    resize (e) {
      this.height = e.currentTarget.innerHeight;
      this.changeSize();
    },
    changeSize () { // Плавное изменение размеров секции hero, так как она должна быть всегда про размеру окна (на браузерах ios изменяется высота окна при появлении навигации)
      const hero = document.querySelector(".hero");

      const startTime = Date.now();
      const duration = 300;
      const height = hero.offsetHeight;
      const need = this.height - height;

      const anim = () => {
        let progress = (Date.now() - startTime) / duration;

        if (progress > 1) {
          progress = 1;
        }
        progress = Math.sin(Math.acos(progress ** 1.4 - 1));

        hero.style.height = need * progress + height + "px";
        if (progress == 1) {
          return;
        }
        requestAnimationFrame(anim);
      };
      anim();
    }
  }
};
</script>

<style lang="scss">
.hero {
  min-height: 400px;
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
