<template lang="pug">
  .info
    .info__row(
      @mouseover="hover=true"
      @mouseleave="hover=false"
      )
      .title__icon
        extra300(
          :hover="hover"
          )
      h1.title Rc-Flight
    .info__row
      .line
    .info__row
      span.info__desc
        | Сайт авиамоделистов Одинцово!
    button(
      type="button"
      @click="arrowDown"
      ).start
    .background
      video(poster='../assets/images/bg.png' autoplay playsinline muted loop).video
        source(type='video/webm', src='../assets/video/rc-flight.webm')
        source(type='video/mp4', src='../assets/video/rc-flight.mp4')
</template>

<script>
import logo from "./icons/logo.vue";
import extra300 from "./icons/extra300.vue";
//
export default {
  components: {
    logo,
    extra300
  },
  data: () => {
    return {
      width: 0,
      height: 0,
      hover: false,
      playVideo: true,
      dateLastActive: 0
    }
  },
  props: {

  },
  created() {
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  mounted() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.videoSizeInit();

    this.mousemove();
    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("scroll", this.mousemove);
    setInterval(this.checkBrowserActive, 2000);
  },
  methods: {
    mousemove () { // Любое движение мыши на сайте обнуляет отсчет "бездействия" и видео не останавливается.
      this.dateLastActive = Date.now();
      if (!this.playVideo) { // Если произашло событие а видео не "идет" то запускаем.
        this.playVideo = true;
        this.startStopVideo(true);
      }
    },
    checkBrowserActive () { // Если на сайте нет активности то останавливаем проигрываение видео
      if ( Date.now() - this.dateLastActive > 120000 && this.playVideo) { // Проверяем сеолько времени прошло с последней активности
        this.playVideo = false;
        this.startStopVideo(false);
      }
    },
    startStopVideo ( start ) { // Запуск - остановка видео. true - играем.
      const video = document.querySelector('.video');
      if ( start ) {
        video.play();
      } else if ( !start ) {
        video.pause();
      }
    },
    resize(e) {
      // Задаем значения для установки новой высоты и ширины видео, чтобы центр видео был в центре окна
      this.width = e.currentTarget.innerWidth;
      this.height = e.currentTarget.innerHeight;
      setTimeout(() => { // Задержка на изменение размера окна.
        this.changeSize();
      },40);
    },
    changeSize () { // smooth animation on change size background video
      const video = document.querySelector('.video');
      const aspectRatio = 1.7777777778; // aspect Ratio 16/9 width/height

      if (this.width / this.height < aspectRatio) { // Узнаем, что нужно увеличивать, ширину или высоту видое.
        video.style.height ='';
        video.style.top = '';

        const startTime = Date.now() // Стартовое время для анимации
        const duration = 200 // Время анимации в миллисекундах
        const value = video.offsetWidth // Нынешняя ширина видео.
        const need = (this.height * aspectRatio) - value // Нужная ширина видео.
        let left = 0; // Смещение влево, для центровки видео.
        const anim = () => {
          let progress = (Date.now() - startTime)/duration // Установка актуального положения прогресса
          if (progress > 1) { // Проверка крайнего состояния
            progress = 1
          }
          progress = Math.sin(Math.acos(progress**1.4 - 1)); //График скорости анимации.
          video.style.width = (need * progress) + value + 'px' // Подсчет ширины на данном шаге
          left = (((need * progress) + value)/2) - (this.width / 2); // считаем смещение влево.
          video.style.left = `-${left}px`;
          if (progress == 1) {
            return
          }
          requestAnimationFrame(anim)
        }
        anim()
        this.videoSizeInit(); // Если анимация "проскочила" нужный размер то эта функция мгновенно установит правильене размеры.
      } else if (this.width / this.height > aspectRatio) { // все тоже самое, только для случая, когда нужно изменять высоту.
        video.style.width ='';
        video.style.left = '';
        const startTime = Date.now()
        const duration = 200
        const value = video.offsetHeight
        const need = (this.width / aspectRatio) - value
        let top = 0;
        const anim = () => {
          let progress = (Date.now() - startTime)/duration

          if (progress > 1) {
            progress = 1
          }
          progress = Math.sin(Math.acos(progress**1.4 - 1));
          video.style.height = (need * progress) + value + 'px'
          top = (((need * progress) + value)/2) - (this.height / 2);
          video.style.top = `-${top}px`;
          if (progress == 1) {
            return
          }
          requestAnimationFrame(anim)
        }
        anim()
        this.videoSizeInit();
      }
    },
    videoSizeInit () { // Мгновенная установка нужного размера и смещения видео.
      const video = document.querySelector('.video');
      const aspectRatio = 1.7777777778; // aspect Ratio 16/9 width/height

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
        video.style.top = `-${top}px`
      }
    },
    arrowDown () { // функция прокрутки страницы вниз при нажатии на стрелку "вниз"
      const startTime = Date.now();
      const scroll = window.scrollY;
      const height = this.height - scroll; // для учета нанешнего скролла, чтобы сместиться только на нужную высоту
      const duration = height * 1.2;

      const scrollDown = () => {
        let progress = ((Date.now() - startTime)/duration);

        if (progress > 1) {
          progress = 1;
        }
        progress = Math.sin(Math.acos((progress)**1.5 - 1));

        window.scrollTo(0, ((height) * progress) + scroll);

        if (progress == 1) {
          return;
        }

        requestAnimationFrame(scrollDown);
      };

      scrollDown();
    },
  },
};
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
  }
  @include phoneLand {
    width: 95%;
    flex-direction: row;
  }
}
.info__row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
  position: relative;

  @include phone {
    margin: 10px 0;
  }
}
.title__icon {
  position: absolute;
  z-index: 0;
  top: -70%;
  left: 50%;
  width: 300px;
  height: 150px;
  fill: #4ca764;
  color: #df7466;
  transform: rotate(180deg) translateX(50%);

  @include phone {
    width: 200px;
    height: 100px;
  }

  @include phoneLand {
    width: 150px;
    height: 80px;
    top: -90%;
  }

  &:hover {
    fill: #4A7D58;
    color: #A76B63;
  }
}
.title {
  color: #fff;
  font-weight: 400;
  font-size: 74px;
  position: relative;
  z-index: 2;

  @include phone {
    font-size: 50px;
  }
  @include phoneLand {
    font-size: 40px;
  }
}
.line {
  width: 100%;
  height: 3px;
  border-top: 1px solid rgba(255, 255, 255, 0.35);
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);

  @include phoneLand {
    display: none;
  }
}
.info__desc {
  font-size: 23px;
}
.start {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, .0);
  font-weight: 300;
  transition: background-color 0.3s;

  &::after {
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    border-top: 3px solid #fff;
    border-left: 3px solid #fff;
    transform: rotate(-135deg);
    transition: border .3s;
  }

  @include tablet {
    width: 70px;
    height: 70px;
    bottom: 10px;

    &::after {
      width: 25px;
      height: 25px;
      border-top: 2px solid #fff;
      border-left: 2px solid #fff;
    }
  }

  @include phoneLand {
    bottom: 0;
  }

  &:hover {
    &:after {
      border-color: #df7366;
    }
  }

  @include phone {
    width: 80px;
    height: 80px;
    font-size: 17px;
    font-weight: 400;
  }
}

.background {
  background-position: center center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 100%;
  z-index: -10;
  will-change: transform;
  transition: height .3s;

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
  background-position: center center;
  background-repeat: no-repeat;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  z-index: -10;
}
</style>
