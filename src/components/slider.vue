<template lang="pug">
section(
  @mousewheel="slideScroll"
  @touchstart="touchStartFunc"
  @touchmove="touchMoveFunc"
  @touchend="touchEndFunc"
  ).slider
  ul.slider__list
    li(
      v-for="slide in slides"
      :key="slide.id"
      @click="showSlideShow = true, slideshowId = slide.id"
      ).slider__item
      button(
        type="button"
        ).slider__img
        img(
          alt=""
          src=""
        ).slider__img-img
      .slider__desc
        h3.slider__title {{slide.title}}
        article.slider__text {{slide.desc}}
  button(
    type="button"
    @click="sliderButton(0)"
    :class="{'slider__button_hover' : !touchDevice}"
    ).slider__prev
    .arrow
  button(
    type="button"
    @click="sliderButton(1)"
    :class="{'slider__button_hover' : !touchDevice}"
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
import { mapState } from 'vuex';

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
      sliderWidth: 0,
      slideWidth: 0,
      touchStart: false,
      touchAnimate: false,
      touchStartX: 0,
    }
  },
  created() {
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  computed: {
    ...mapState('commons',[
        'touchDevice'
    ])
  },
  mounted() {

    this.resize();

    const images = document.querySelectorAll('.slider__img-img');
    const slides = this.slides;

    // Поочередная закрузка картинок для слйдшоу
    async function loadImage() {
      for (var i = 0; i < slides.length; i++) {
        await new Promise((resolve) => {
          images[i].src = slides[i].image;
          images[i].alt = slides[i].title;
          images[i].addEventListener('load', function () {
            resolve();
          })
        })
      }
    };
    loadImage();
  },
  methods: {
    touchStartFunc(e) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStart = true;
    },
    touchMoveFunc(e) {
      if ( !this.touchAnimate ) {
        if (e.touches[0].clientX > this.touchStartX && e.touches[0].clientX - this.touchStartX > 30) {
          // prev
          this.sliderButton(0);
          this.touchAnimate = true;
          setTimeout(() => {
            this.touchAnimate = false;
          }, 500)
        } else if (e.touches[0].clientX < this.touchStartX && this.touchStartX - e.touches[0].clientX > 30) {
          // next
          this.sliderButton(1);
          this.touchAnimate = true;
          setTimeout(() => {
            this.touchAnimate = false;
          }, 500)
        }
      } else {
        e.preventDefault();
      }

    },
    touchEndFunc() {
      this.touchStart = false;
    },
    resize(){
      const slider = document.querySelector('.slider__list');
      const items = document.querySelectorAll('.slider__item');
      const marginRight = parseInt(getComputedStyle(items[0]).getPropertyValue('margin-right').match(/\d+/)[0]);
      this.slideWidth = items[0].offsetWidth + marginRight;
      this.sliderWidth = this.slideWidth * items.length - slider.offsetWidth + marginRight;
    },
    sliderButton(direction) { // 1 - next slide, 0 - prev slide
      const slider = document.querySelector('.slider__list');
      this.transformActualPosition = Math.floor(this.transformActualPosition / this.slideWidth) * this.slideWidth;
      if (direction === 1) {
        this.transformActualPosition += this.slideWidth;
        if (this.transformActualPosition > this.sliderWidth) {
          this.transformActualPosition = this.sliderWidth;
        }
      } else if (direction === 0) {
        this.transformActualPosition -= this.slideWidth;
        if (this.transformActualPosition < 0) {
          this.transformActualPosition = 0;
        }
      }
      slider.style=`transform: translateX(-${this.transformActualPosition}px); transition: transform .6s`;
    },
    slideScroll(e) {
      if (e.deltaX !== 0) {
        e.preventDefault();
        const slider = document.querySelector('.slider__list');

        this.transformActualPosition += e.deltaX;
        if (this.transformActualPosition < 0) {
          this.transformActualPosition = 0;
        } else if (this.transformActualPosition > this.sliderWidth) {
          this.transformActualPosition = this.sliderWidth;
        }
        slider.style=`transform: translateX(-${this.transformActualPosition}px)`;
      }
    }
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

}
.slider__item {
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
  box-sizing: border-box;

  &:first-child {
    margin-left: 20px;
  }

  @include tablet {
    height: 380px;
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
    width: 100vw;
    min-width: 100vw;
    margin-right: 0;
    padding: 0 10px;
    height: 100vh;
    flex-direction: row;
    &:first-child {
      margin-left: 0;
    }
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
    width: 60%;
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
    height: 100%;
    width: 40%;
  }
}
.slider__title {
  font-size: 23px;
  margin: 20px 0;

  @include phoneLand {
    margin: 0;
    padding: 10px 10px;
  }
}
.slider__text {
  @include phoneLand {
    padding: 10px 10px;
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

  &:active {
    background-color: rgba(239, 131, 118, 0.75);
  }

  @include tablet {
    width: 80px;
    height: 100px;
  }

  @include phone {
    width: 70px;
    height: 70px;
  }
  @include phoneLand {
    width: 70px;
    height: 70px;
  }
}
.slider__button_hover{
  &:hover {
    background-color: rgba(239, 131, 118, 0.75);
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

  @include tablet {
    width: 18px;
    height: 18px;
  }

  @include phone {
    width: 15px;
    height: 15px;
  }
  @include phoneLand {
    width: 15px;
    height: 15px;
  }
}
.arrow_next {
  transform: rotate(135deg);
}
</style>
