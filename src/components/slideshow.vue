<template lang="pug">
  .wrapper(
    @mouseleave="mouseOverFunc"
    @touchmove.prevent
    )
    .image
      ul(
        @mousewheel.prevent="scroll"
        @mousemove="mousemove"
        @mousedown="mouseDownFunc"
        @mouseup="mouseUpFunc"
        :class="{'image__list_transition' : !mouseDown}"
      ).image__list#image__list
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
          :class="{'display_none' : mouseDown}"
        ).prev
      button(
          type="button"
          @click="nextSlide"
          :class="{'display_none' : mouseDown}"
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
      timer: 0,
      mouseDown: false,
      mousePosX: 0,
      mouseStartX: 0,
      mousePosY: 0,
      mouseDirect: 0,
      slideScroll: 0,
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
  },
  mounted() {

  },
  destroyed() {

  },
  methods: {
    mouseDownFunc(e) {
      e.preventDefault();
      this.mouseDown = true;
      this.slideScroll = this.actualSlide * 100;
      this.mousePosX = e.clientX;
      this.animFlag = true;
    },
    mousemove(e) {
      if (this.mouseDown) {

        e.preventDefault();

        const imageList = document.querySelector('.image__list');
        const sliderWidth = (this.slideshow[this.id].length - 1) * 100;

        if (e.clientX > this.mousePosX) {  // move to left
          if (this.mouseDirect !== 0) {
            this.mouseDirect = 0;
            console.log(this.mouseDirect);
          }
          this.mousePosX = e.clientX;
          this.slideScroll -= 2;
        } else if (e.clientX < this.mousePosX) {  // move to right
          if (this.mouseDirect !== 1) {
            this.mouseDirect = 1;
            console.log(this.mouseDirect);
          }
          this.mousePosX = e.clientX;
          this.slideScroll += 2;
        }
        if (this.slideScroll < 0) this.slideScroll = 0;
        if (this.slideScroll > sliderWidth) this.slideScroll = sliderWidth;

        imageList.style=`transform: translateX(-${this.slideScroll}%)`;
      }
    },
    mouseUpFunc() {
      const needSlide = Math.round((this.slideScroll)/100);
      this.moveToSlide(needSlide);
      this.mouseDown = false;
    },
    mouseOverFunc() {
      if (this.mouseDown) {
        this.mouseUpFunc();
      }
    },
    scroll(e) {
      if (e.deltaX > 5 && !this.animFlag) {
        this.nextSlide();
      }
      if (e.deltaX < -5 && !this.animFlag) {
        this.prevSlide();
      }
    },
    moveToSlide(numberSlide) {
      const slideCount = this.slideshow[this.id].length;
      const imageList = document.querySelector('.image__list');

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.animFlag = false;
      }, 900);

      if (numberSlide > this.actualSlide) {

        if (this.actualSlide + 1 < slideCount) {
          this.actualSlide = numberSlide;
          this.animFlag = true;
        } else {
          clearTimeout(this.timer)
          this.animFlag = false;
        }

      } else {

        if (this.actualSlide - 1 >= 0) {
          this.actualSlide = numberSlide;
          this.animFlag = true;
        } else {
          clearTimeout(this.timer)
          this.animFlag = false;
        }
      }

      setTimeout(() => {
        imageList.style=`transform: translateX(-${this.actualSlide * 100}%)`;
      }, 1);
    },
    nextSlide() {
      this.moveToSlide(this.actualSlide + 1);
    },
    prevSlide() {
      this.moveToSlide(this.actualSlide - 1);
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
  background-color: rgba(0, 0, 0, .95);
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
  transform: translateX(0);
  will-change: auto;
}
.image__list_transition {
  transition: transform 1s;
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
  max-width: 100%;
  max-height: 100%;
  transition: max-width .5s, max-height .5s;
  will-change: auto;
}
.image__img_width {
  max-width: 90%;
  max-height: 90%;
}

.next, .prev {
  position: absolute;
  top: 0;
  width: 15%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color .3s;

  &:hover {
    background-color: rgba(0, 0, 0, .3);
  }
}
.prev {
  left: 0;
  // border-radius: 0 30% 30% 0;
}
.next {
  right: 0;
  // border-radius: 30% 0 0 30%;
}
.display_none {
  display: none;
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
