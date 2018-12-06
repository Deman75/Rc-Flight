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
      playVideo: true,
      timerOnResize: 0,
    }
  },
  created() {
    window.addEventListener("resize", this.resize);
    window.addEventListener("scroll", this.scroll);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("scroll", this.scroll);
  },
  computed: {
    ...mapState('commons',[
        'touchDevice'
    ])
  },
  mounted() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const hero = document.querySelector('.hero');
    hero.style.height=`${this.height}px`;
  },
  methods: {
    scroll (e) {
      clearTimeout(this.timerOnResize);
      if (e.currentTarget.scrollY === 0) { // Если изменили размер окна когда скролл был не в ноле, выполняем изменение размера блока
        this.resize();
      }
    },
    resize (e) {
      this.height = window.innerHeight;
      if (window.scrollY === 0) { // Меняем размеры виде только если находимся в верху страницы. Чтобы не прыгало содержимое
        clearTimeout(this.timerOnResize);
        this.timerOnResize = setTimeout(() => { // Задержка на изменение размера окна.
          this.changeSize();
        },100);
      }
    },
    changeSize () { // Плавное изменение размеров секции hero, так как она должна быть всегда про размеру окна (на браузерах ios изменяется высота окна при появлении навигации)
      const hero = document.querySelector(".hero");
      const startTime = Date.now();
      const duration = 400;
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
  will-change:transform;
  overflow: hidden;

  @include tablet {
    min-height: auto;
  }
}
</style>
