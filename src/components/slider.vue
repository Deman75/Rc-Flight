<template lang="pug">
-
  var slides = [
    {
      "image": "../assets/images/slider/pic01.jpg",
      "title": "Полет одного из пилотов",
      "desc" : "Пролет на не большой высоте и на малой скорости"
    },
    {
      "image": "../assets/images/slider/pic02.jpg",
      "title": "Недавние полеты",
      "desc" : "Пролет на не большой высоте и на малой скорости"
    },
    {
      "image": "../assets/images/slider/pic03.jpg",
      "title": "Полет одного из пилотов",
      "desc" : "Пролет на не большой высоте и на малой скорости"
    },
    {
      "image": "../assets/images/slider/pic04.jpg",
      "title": "Полет одного из пилотов",
      "desc" : "Пролет на не большой высоте и на малой скорости"
    },
    {
      "image": "../assets/images/slider/pic05.jpg",
      "title": "Полет одного из пилотов",
      "desc" : "Пролет на не большой высоте и на малой скорости"
    },
    {
      "image": "../assets/images/slider/pic01.jpg",
      "title": "Полет одного из пилотов",
      "desc" : "Пролет на не большой высоте и на малой скорости"
    },
    {
      "image": "../assets/images/slider/pic02.jpg",
      "title": "Полет одного из пилотов",
      "desc" : "Пролет на не большой высоте и на малой скорости"
    }
  ]
section.slider
  ul.slider__list
    each slide in slides
      li.slider__item
        button(type="button").slider__img
          img(alt="" src=`${slide.image}`).slider__img-img
        .slider__desc
          h3.slider__title=slide.title
          article.slider__text=slide.desc
  button(type="button").slider__back
    .arrow
  button(type="button").slider__forw
    .arrow.arrow_forw
</template>

<script>
export default {
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
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;

  &:hover {
    .slider__item {
      transform: translateX(-300%);
    }
  }
}
.slider__item {
  display: inline-block;
  width: 330px;
  min-width: 330px;
  height: 460px;
  margin-right: 20px;
  background-color: #fff;
  overflow: hidden;
  text-align: center;
  transform: translateX(0%);
  will-change: transform;
  transition: transform 1.5s;

  &:first-child {
    margin-left: 20px;
  }
}
.slider__img {
  width: 100%;
  height: 50%;
  max-height: 50%;
  overflow: hidden;
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
}
.slider__title {
  font-size: 23px;
  margin: 20px 0;
}
.slider__back, .slider__forw {
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
}
.slider__forw {
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
}
.arrow_forw {
  transform: rotate(135deg);
}
</style>
