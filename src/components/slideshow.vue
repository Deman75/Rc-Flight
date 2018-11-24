<template lang="pug">
  .wrapper(
    @mouseleave="mouseOverFunc"
    @mouseup="mouseUpFunc"
    @touchmove.prevent
    )
    .image
      ul(
        @mousewheel.prevent="scroll"
        @mousedown="mouseDownFunc"
        @mousemove="mousemove"
        @mouseup="mouseUpFunc"
        @touchstart="mouseDownFunc"
        @touchmove="mousemove"
        @touchend="mouseUpFunc"
        :class="{'image__list_transition' : !mouseDown}"
      ).image__list
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
      mouseMoveX: 0,
      mousePosY: 0,
      mouseDirect: 0,
      slideScroll: 0,
      rate: 0.6 // Коэффициент влияния перемещения на движение слайдера.
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  created() {
    if (this.slideshow[this.id] === undefined) { // Если для этого id  нет слайдов то выходим и еммитим событие выхода.
      this.$emit('close');
    };
  },
  methods: {
    mouseDownFunc(e) {
      e.preventDefault(); // Нужно для того чтобы не "таскать" за мышкой картинку.
      if (e.type === 'touchstart') { // Если событие с тач устройства, то берем первое касание
        this.mousePosX = e.touches[0].clientX * this.rate; // Начальное положение стартовой точки
      } else {
        this.mousePosX = e.clientX; // Начальное положение стартовой точки
      }
      this.mouseDown = true; // Говорим что кнопка нажата для отслеживания движения.
      this.slideScroll = this.actualSlide * 100; // Инициализация начального положения для скроллинга.
      this.animFlag = true; // Эта переменная отвечает за включение класса с уменшьением размера картинки при перемещении.
    },
    mousemove(e) {
      if (this.mouseDown) {

        e.preventDefault(); // для отмены скролла на бакграунде

        const imageList = document.querySelector('.image__list');
        const sliderWidth = (this.slideshow[this.id].length - 1) * 100; // узнаем колличество всех слайдов и получаем максимальный сдвиг в процентах.
        let transformX = 0; // переменная для хранения готового числа для подстановки в translateX
        let clientX = 0;

        if (e.type === 'touchmove') { // Если событие с тач устройства, то берем первое касание
          clientX = e.touches[0].clientX;  // Нужна для сохранения сдвига при выходе курсора из поля слайдера
        } else {
          clientX = e.clientX;
        }
        clientX *= this.rate;

        this.mouseMoveX = clientX;  // Нужна для сохранения сдвига при выходе курсора из поля слайдера

        if (clientX > this.mousePosX) {  // move to right
          if (this.mouseDirect !== 0) { // если было изменено направление движения, обнуляем точку старта, чтобы слайдер срезу начал двигаться в другом напривлении
            this.mouseDirect = 0;
            this.mousePosX = clientX;
          }
        } else if (clientX < this.mousePosX) {  // move to left
          if (this.mouseDirect !== 1) {
            this.mouseDirect = 1;
            this.mousePosX = clientX;
          }
        }

        transformX = this.slideScroll - (clientX) + this.mousePosX; // вычисляем необходимое смещения. В переменной slideScroll хранится начальное положение
                                                                      // слайдера. От него и начинаем двигаться. Дальше отнимаем на сколько мы отъехали от старта.
        // Проверяем крайние положения.
        if (transformX < 0) transformX = 0;
        if (transformX > sliderWidth) transformX = sliderWidth;

        imageList.style=`transform: translateX(-${transformX}%)`; // применяем трансформирование.
      }
    },
    mouseUpFunc() {
      if (this.mouseDown) { // Делаем что-то только если кнопка мыши была нажата.
        this.slideScroll -= this.mouseMoveX - this.mousePosX; // Присваеваем новое значение, для подсчета нужного слайда.

        const sliderWidth = (this.slideshow[this.id].length - 1) * 100; // узнаем колличество всех слайдов и получаем максимальный сдвиг в процентах.
        // Проверяем крайние положения.
        if (this.slideScroll < 0) {
          this.slideScroll = 0;
        } else if (this.slideScroll > sliderWidth) {
          this.slideScroll = sliderWidth;
        }

        const needSlide = Math.round((this.slideScroll)/100); // Округляем до ближайшего целого, для понимания какой по номеру слад ближе.

        this.moveToSlide(needSlide); // Двигаемся к нужному слайду.
        this.mouseDown = false;
      }
    },
    mouseOverFunc() { // отрабатываем событие "выхода" из поля.
      if (this.mouseDown) {
        this.mouseUpFunc();
      }
    },
    scroll(e) { // Фунцкия для смены кадров скроллом.
      if (e.deltaX > 5 && !this.animFlag) {
        this.nextSlide();
      }
      if (e.deltaX < -5 && !this.animFlag) {
        this.prevSlide();
      }
    },
    moveToSlide(numberSlide) {
      const slideCount = this.slideshow[this.id].length; // колличество слйдов.
      const imageList = document.querySelector('.image__list');

      clearTimeout(this.timer); // Обнуляем таймаут, на сулчай если во время анимации еще раз нажать кнопку смены слайда
      this.timer = setTimeout(() => {
        this.animFlag = false; // Отменяет анимацию уменшьения картинки при завершении анимации (которая длиться 1 секунду)
      }, 900);

      if (numberSlide > this.actualSlide) { // Проверка, в какую сторону двигаемся.

        if (this.actualSlide + 1 < slideCount) { // Двигаеся только если значения отличаюься. Актуально для крайних кадров.
          this.actualSlide = numberSlide; // Сохраняем к какому слайду нужно
          this.animFlag = true; // Запуск анимации уменьшения картинки
        } else { // Если двигаться не надо, все обнуляем.
          clearTimeout(this.timer)
          this.animFlag = false;
        }

      } else { // Здесь все тоже самое только если двигаться нужно в другую сторону.

        if (this.actualSlide - 1 >= 0) {
          this.actualSlide = numberSlide;
          this.animFlag = true;
        } else {
          clearTimeout(this.timer)
          this.animFlag = false;
        }
      }

      setTimeout(() => {
        imageList.style=`transform: translateX(-${this.actualSlide * 100}%)`; // Присваиваем смещение в процентах
      }, 1);
    },
    nextSlide() { // Кнопки слайдера
      this.moveToSlide(this.actualSlide + 1);
    },
    prevSlide() { // Кнопки слайдера
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
