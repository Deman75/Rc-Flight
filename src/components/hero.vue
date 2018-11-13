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
      video(poster='../assets/images/bg.png' autoplay playsinline muted loop).video
        source(type='video/webm', src='../assets/video/rc-flight.webm')
        source(type='video/mp4', src='../assets/video/rc-flight.mp4')
</template>

<script>
export default {
  data: () => {
    return {
      width: 0,
      height: 0
    }
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  mounted() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.changeSize();
  },
  methods: {
    myEventHandler(e) {
      this.width = e.currentTarget.innerWidth;
      this.height = e.currentTarget.innerHeight;
      this.changeSize();

    },
    changeSize () {
      const video = document.querySelector('.video');
      const aspectRatio = 1.7777777778; // соотношение 16/9 width/height

      if (this.width / this.height < aspectRatio) {
        let videoWidth = this.height * aspectRatio;
        let left = (videoWidth/2) - (this.width / 2); // считаем смещение влево.
        video.style.width = `${videoWidth}px`;
        video.style.left = `-${left}px`;
        video.style.height ='';
        video.style.top = '';
      } else if (this.width / this.height > aspectRatio) {
        let videoHeight = this.width / aspectRatio;
        let top = (videoHeight/2) - (this.height / 2);
        video.style.width ='';
        video.style.left = '';
        video.style.height = `${videoHeight}px`;
        video.style.top = `-${top}px`;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  width: 400px;
  color: #fff;

  @include phone {
    width: 95%;
    overflow: hidden;
  }
}
.info__row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 30px 0;

  @include phone {
    margin: 10px 0;
  }
}
.title {
  color: #fff;
  font-weight: 400;
  font-size: 74px;

  @include phone {
    font-size: 50px;
  }
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

  @include phone {
    width: 80px;
    height: 80px;
    font-size: 17px;
    font-weight: 400;
  }
}

.background {
  // background: url("../assets/images/yak54.jpg") center center no-repeat;
  // background-size: cover;
  background-position: center center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 100%;
  z-index: -10;
  will-change: transform;
  transition: height .3s;

  // &:after {
  //   content: "";
  //   position: absolute;
  //   left: 0;
  //   right: 0;
  //   top: 0;
  //   bottom: 0;
  //   display: block;
  //   background: url("../assets/images/yak54.jpg") center center no-repeat;
  //   background-size: cover;
  //   filter: blur(5px);
  //   will-change: transform;
  // }

  &:after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: -5;
  }
}
.video {
  // min-width: 100%;
  // min-height: 100%;
  // position: relative;
  background-position: center center;
  background-repeat: no-repeat;
  position: absolute;
  width: 100%;
  // height: 100%;
  left: 0;
  top: 0;
  z-index: -10;
}
</style>
