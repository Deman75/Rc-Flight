<template lang="pug">
section.slider
  ul.slider__list
    li(
      v-for="slide in slides"
      :key="slide.id"
      ).slider__item
      button(
        type="button"
        @click="showSlideShow = true, slideshowId = slide.id"
        ).slider__img
        img(
          :alt="slide.title"
          :src="slide.image"
        ).slider__img-img
      .slider__desc
        h3.slider__title {{slide.title}}
        article.slider__text {{slide.desc}}
  button(
    type="button"
    @click="prevBtn"
    ).slider__prev
    .arrow
  button(
    type="button"
    @click="nextBtn"
    ).slider__next
    .arrow.arrow_next
  slideshow(
    v-if="showSlideShow"
    @close="showSlideShow = false"
    :id="slideshowId"
    )
</template>

<script>
import slides from '../data/galery.json';
import slideshow from './slideshow.vue';

export default {
  components: {
    slideshow
  },
  data: () => {
    return {
      transformActualPosition: 0,
      slides,
      showSlideShow: false,
      slideshowId: 0,
    }
  },
  methods: {
    nextBtn: function () {
      const slider = document.querySelector('.slider__list');
      const items = document.querySelectorAll('.slider__item');
      const width = items[0].offsetWidth;
      const marginRight = parseInt(getComputedStyle(items[0]).getPropertyValue('margin-right').match(/\d+/)[0]);
      const sliderWidth = (width + marginRight) * items.length - slider.offsetWidth + marginRight;
      this.transformActualPosition += width + marginRight;
      if (this.transformActualPosition > sliderWidth) {
        this.transformActualPosition = sliderWidth;
      }
      slider.style=`transform: translateX(-${this.transformActualPosition}px)`;
    },
    prevBtn: function () {
      const slider = document.querySelector('.slider__list');
      const item = document.querySelector('.slider__item');
      const width = item.offsetWidth;
      const sliderWidth = slider.offsetWidth;
      let marginRight = marginRight = parseInt(getComputedStyle(item).getPropertyValue('margin-right').match(/\d+/)[0]);
      this.transformActualPosition -= width + marginRight;
      if (this.transformActualPosition < 0) {
        this.transformActualPosition = 0;
      }

      slider.style=`transform: translateX(-${this.transformActualPosition}px)`;
    },
  }
}
</script>

<style lang="scss" scoped>
.slider {
  background-color: #f0f4f4;
  position: relative;
  overflow: hidden;
}
.slider__list {
  padding: 20px 0;
  display: flex;
  flex-wrap: nowrap;
  transform: translateX(0%);
  transition: transform .5s;
}
.slider__item {
  // display: inline-block;
  display: flex;
  flex-direction: column;
  width: 330px;
  min-width: 330px;
  height: 460px;
  margin-right: 20px;
  background-color: #fff;
  text-align: center;
  will-change: transform;
  transition: transform 1.5s;
  position: relative;

  &:first-child {
    margin-left: 20px;
  }

  @include phone {
    width: 100vw;
    min-width: 100vw;
    margin-right: 0;

    &:first-child {
      margin-left: 0;
    }
  }

  @include phoneLand {
    height: 100vh;
  }
}
.slider__img {
  width: 100%;
  height: 50%;
  max-height: 50%;
  overflow: hidden;

  @include phoneLand {
    height: 100%;
    max-height: 100%;
  }
}
.slider__img-img {
  width: 100%;
}
.slider__desc {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50%;

  @include phoneLand {
    position: absolute;
    height: auto;
    left: 0;
    top: 10px;
    bottom: 10px;
    right: 0;
    justify-content: space-between;
  }
}
.slider__title {
  font-size: 23px;
  margin: 20px 0;

  @include phoneLand {
    color: #fff;
    margin: 0;
    padding: 10px 10px;
    background-color: rgba(0, 0, 0, .5);
  }
}
.slider__text {
  @include phoneLand {
    color: #fff;
    padding: 10px 10px;
    background-color: rgba(0, 0, 0, .5);
  }
}
.slider__prev, .slider__next {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%) translateX(-50%);
  width: 100px;
  height: 100px;
  padding: 10px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, .35);
  transition: background-color .3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(239, 131, 118, 0.75);
  }

  @include phone {
    width: 70px;
    height: 70px;
  }
}
.slider__next {
  left: 100%;
  justify-content: flex-start;
  transform: translateY(-50%) translateX(-50%);
}
.arrow {
  display: block;
  width: 20px;
  height: 20px;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  transform: rotate(-45deg);

  @include phone {
    width: 15px;
    height: 15px;
  }
}
.arrow_next {
  transform: rotate(135deg);
}
</style>
