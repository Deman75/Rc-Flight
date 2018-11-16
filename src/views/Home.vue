<template lang="pug">
div.home
  section.hero
    Hero(
      :play-video="playVideo"
      )
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
  mounted() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const hero = document.querySelector('.hero');
    hero.style.height=`${this.height}px`;

    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("scroll", this.mousemove);
    setInterval(this.checkBrowserActive, 2000);
  },
  methods: {
    resize (e) {
      this.height = e.currentTarget.innerHeight;
      this.changeSize();
    },
    changeSize () {
      const hero = document.querySelector('.hero');

      const startTime = Date.now()
      const duration = 300
      const height = hero.offsetHeight
      const need = this.height - height

      const anim = () => {
        let progress = (Date.now() - startTime)/duration

        if (progress > 1) {
          progress = 1
        }
        progress = Math.sin(Math.acos(progress**1.4 - 1));

        hero.style.height = (need * progress) + height + 'px'


        if (progress == 1) {
          return
        }

        requestAnimationFrame(anim)
      }

      anim()
    },
    mousemove () {
      this.dateLastActive = Date.now();
      console.log('acteve');
      this.playVideo = true;
    },
    checkBrowserActive () {
      // if ( Date.now() - this.dateLastActive > 4000) {
      //   console.log('sleep');
      // }
      if (document.hidden) {
        console.log('sleep');
        this.playVideo = false;
      }
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
