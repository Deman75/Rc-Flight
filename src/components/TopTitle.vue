<template lang="html">
  <div class="top-block">
    <h2 class="title" v-html='title'></h2>
    <div
      class="background"
      :style='`background-image: url(${image})`'
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: 'images/bg/about_bg.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.top-block {
  width: 100%;
  height: 250px;
  position: relative;
  overflow: hidden;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;

  @include tablet {
    height: 180px;
  }

  @include phone {
    height: 120px;
  }

  @include phoneLand {
    height: 130px;
  }
}
.background {
  position: absolute;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  top: -10%;
  left: -10%;
  right: -10%;
  bottom: -10%;
  z-index: -1;
  filter: blur(3px) brightness(50%);

  @include phone {
    filter: blur(2px) brightness(50%);
  }
}
.title {
  font-size: 50px;

  @include phone {
    font-size: 30px;
  }
  @include phoneLand {
    font-size: 30px;
  }
}
</style>
