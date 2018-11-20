<template lang="pug">
  .wrapper(
    v-on:scroll.prevent="onScroll"
    )
    .image
      img(
        v-if="slideshow[id] !== undefined"
        alt="slideshow[id][slide].title"
        :src="slideshow[id][slide].image"
      ).image__img
      button(
          type="button"
          @click="prevSlide"
        ).prev
      button(
          type="button"
          @click="nextSlide"
        ).next
    .exit(
      @click="$emit('close')"
      )
</template>

<script>

import slideshow from '../data/galery-all.json';

export default {
  data: () => {
    return {
      slideshow,
      slide: 0
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  created() {
    if (this.slideshow[this.id] === undefined) this.$emit('close');
  },
  mounted() {
    this.fixedScroll(true)
  },
  destroyed() {
    this.fixedScroll(false)
  },
  methods: {
    fixedScroll(block) {
      const body = document.querySelector('body');
      if (block) {
        body.style.overflow='hidden';
      } else {
        body.style.overflow='';
      }
    },
    nextSlide() {
      const slideCount = this.slideshow[this.id].length;

      this.slide++;

      if (this.slide === slideCount) this.slide = 0;

    },
    prevSlide() {
      const slideCount = this.slideshow[this.id].length;

      this.slide--;

      if (this.slide < 0) this.slide = slideCount - 1;

    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
  overflow: hidden;
}
.image {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.next, .prev {
  position: absolute;
  top: 0;
  width: 20%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color .3s;

  &:hover {
    background-color: rgba(0, 0, 0, .4);
  }
}
.prev {
  left: 0;
  border-radius: 0 50% 50% 0;
}
.next {
  right: 0;
  border-radius: 50% 0 0 50%;
}
.image__img {
  width: 100%;
}
.exit {
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 40px;
  padding: 10px;
  margin: 5px;
  z-index: 200;
  box-sizing: border-box;
  cursor: pointer;
  background-color: rgba(0, 0, 0, .8);

  &::after, &::before {
    content: '';
    display: block;
    position: absolute;
    width: 70%;
    height: 5%;
    top: 50%;
    background-color: rgba(255,255,255, .7);
    transform-origin: center;
    transition: background-color .3s;
  }
  &::after {
    right: 0;
    transform: rotate(45deg) translateY(50%) translateX(-15%);
  }
  &::before {
    left: 0;
    transform: rotate(-45deg) translateY(200%) translateX(25%);
  }
  &:hover {
    &::after, &::before {
      background-color: #fff;
    }
  }
}
</style>
