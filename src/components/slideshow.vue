<template lang="pug">
  .wrapper(
    v-on:scroll.prevent="onScroll"
    )
    .image
      ul.image__list
        li(
          v-if="slideshow[id] !== undefined"
          v-for="slide in slideshow[id]"
          :key="slide.image"
        ).image__item
          img(
            alt="slide.title"
            :src="slide.image"
            :class="{'image__img_width' : animFlag}"
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
      animFlag: false,
      actualSlide: 0,
      timer: 0
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  created() {
    if (this.slideshow[this.id] === undefined) {
      this.$emit('close');
    };
    window.addEventListener('scroll', function(e) {
      e.preventDefault();
    });
  },
  mounted() {
    this.fixedScroll(true);
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
    scroll(e) {
      console.log(e);
    },
    nextSlide() {
      const slideCount = this.slideshow[this.id].length;
      const imageList = document.querySelector('.image__list');

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.animFlag = false;
      }, 900);

      if (this.actualSlide + 1 < slideCount) {
        this.actualSlide++;
        this.animFlag = true;
      } else {
        clearTimeout(this.timer)
        this.animFlag = false;
      }

      setTimeout(() => {
        imageList.style=`transform: translateX(-${this.actualSlide * 100}%)`;
      }, 100);

    },
    prevSlide() {
      const imageList = document.querySelector('.image__list');

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.animFlag = false;
      }, 900);

      if (this.actualSlide - 1 >= 0) {
        this.actualSlide--;
        this.animFlag = true;
      } else {
        clearTimeout(this.timer)
        this.animFlag = false;
      }

      setTimeout(() => {
        imageList.style=`transform: translateX(-${this.actualSlide * 100}%)`;
      }, 100);
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
}
.image__list {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform: translateX(0);
  will-change: auto;
}
.image__item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.image__img {
  width: 100%;
  transition: width .5s;
  will-change: auto;
}
.image__img_width {
  width: 90%;
}

.next, .prev {
  position: absolute;
  top: 0;
  width: 20%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color .3s;

  &:hover {
    background-color: rgba(0, 0, 0, .3);
  }
}
.prev {
  left: 0;
  border-radius: 0 30% 30% 0;
}
.next {
  right: 0;
  border-radius: 30% 0 0 30%;
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
  border-radius: 50%;
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
    transform: rotate(45deg) translateY(200%) translateX(-15%);
  }
  &::before {
    left: 0;
    transform: rotate(-45deg) translateY(200%) translateX(15%);
  }
  &:hover {
    &::after, &::before {
      background-color: #fff;
    }
  }
}
</style>
