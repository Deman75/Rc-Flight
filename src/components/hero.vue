<template lang="pug">
  .info
    .info__row
      h1.title Rc-Flight
    .info__row
      .line
    .info__row
      span.info__desc
        | Сайт авиамоделистов Одинцово!
    .info__row
      button(type="button").start Поехали
    .background
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.info {
  flex-direction: column;
  width: 400px;
  color: #fff;
}
.info__row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 30px 0;
}
.title {
  color: #fff;
  font-weight: 400;
  font-size: 74px;
}
.line {
  width: 100%;
  height: 3px;
  border-top: 1px solid rgba(255, 255, 255, 0.35);
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
}
.info__desc {
  font-size: 23px;
}
.start {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 23px;
  background-color: #df7366;
  font-weight: 300;
  color: #fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ef8376;
  }
}

.background {
  background: url("../assets/images/yak54.jpg") center center no-repeat;
  background-size: cover;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  will-change: transform;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: block;
    background: url("../assets/images/yak54.jpg") center center no-repeat;
    background-size: cover;
    filter: blur(5px);
    will-change: transform;
  }
}
</style>
