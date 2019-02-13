<template lang="pug">
nav.nav(
  @mousewheel="scroll"
  @touchmove="scroll"
  )
  .heder-line
  ul(
    :class="{'nav__item_hover' : !touchDevice}"
    ).nav__list
    li.nav__item(@click="hamburgerButton('close')")
      router-link(to="/").nav__link Главная
    li.nav__item(@click="hamburgerButton('close')")
      router-link(to="/about").nav__link О нас
    li.nav__item(@click="hamburgerButton('close')")
      router-link(to="/map").nav__link Где мы
    li.nav__item(@click="hamburgerButton('close')")
      .nav__link Контакты
    li.nav__item(@click="hamburgerButton('close')")
      .nav__link Блог
  .heder-line
  .hamburger(
    @click="hamburgerButton"
    :class="{'hamburger_hover' : !touchDevice}"
    )
    svg.hamburger__icon(version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 35" enable-background="new 0 0 40 35" xml:space="preserve")
        path.hamburger__icon-top(d="M40,2.5C40,3.881,38.881,5,37.5,5h-35C1.119,5,0,3.881,0,2.5l0,0C0,1.119,1.119,0,2.5,0h35C38.881,0,40,1.119,40,2.5L40,2.5z")
        path.hamburger__icon-center(d="M40,17.5c0,1.381-1.119,2.5-2.5,2.5h-35C1.119,20,0,18.881,0,17.5l0,0C0,16.119,1.119,15,2.5,15h35C38.881,15,40,16.119,40,17.5L40,17.5z")
        path.hamburger__icon-bottom(d="M40,32.5c0,1.381-1.119,2.5-2.5,2.5h-35C1.119,35,0,33.881,0,32.5l0,0C0,31.119,1.119,30,2.5,30h35C38.881,30,40,31.119,40,32.5L40,32.5z")
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('commons',[
        'touchDevice'
    ]),
  },
  mounted() {
    this.navHeight();
  },
  methods: {
    ...mapActions({
      changeNavHeight: 'commons/changeNavHeight'
    }),
    scroll (e) {
      if (this.touchDevice) {
        e.preventDefault();
      }
    },
    hamburgerButton: (close) => {
      const nav = document.querySelector(".nav__list");
      const icon = document.querySelector(".hamburger__icon");
      const hamburger = document.querySelector(".hamburger");

      if (nav.classList.contains('nav__list_active') || close === 'close') {
        nav.classList.remove('nav__list_active');
        icon.classList.remove('hamburger__icon_active');
        hamburger.classList.remove('hamburger_background');
      } else {
        nav.classList.add('nav__list_active');
        icon.classList.add('hamburger__icon_active');
        hamburger.classList.add('hamburger_background');
      }

    },
    navHeight() {
      const nav = document.querySelector('.nav');
      this.changeNavHeight(nav.offsetHeight);
    },
  }
}
</script>

<style lang="scss" scoped>
.nav {
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 200;

  @include tablet {
    background-color: rgba(0, 0, 0, .8);
    padding: 0;
    position: fixed;
    top: 0;
  }

  @include phoneLand {
    padding: 0;
  }
}
.heder-line {
  display: inline;
  width: 100%;
  height: 3px;
  border-top: 1px solid rgba(255, 255, 255, 0.35);
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);

  @include tablet {
    display: none;
  }
}
.nav__list {
  height: 21px;
  border-left: 1px solid rgba(255, 255, 255, 0.35);
  border-right: 1px solid rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  flex-shrink: 0;
  transition: height .3s;

  @include tablet {
    flex-direction: column;
    overflow: hidden;
    border: none;
    height: 0;
    margin: 0 28px;
  }

  @include phoneLand {
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
}
.nav__list_active {
  @include tablet {
    height: 100vh;
  }
  @include phoneLand {
    height: 100vh;
  }
}
.nav__item {
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 5px;
  transition: border .2s;

  &:active {
    border: 1px solid rgba(255, 255, 255, 0.35);
  }

  @include tablet {
    margin: 10px 0;
  }

  @include phoneLand {
    margin: 3px 0;
  }
}
.nav__link {
  padding: 5px 15px;
  font-size: 19px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  cursor: pointer;

  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 5px;
  transition: border .2s;

}
.nav__item_hover{
  .nav__item{
    .nav__link {
      &:hover {
        border: 1px solid rgba(255, 255, 255, 0.35);
      }
    }
  }
}
.router-link-exact-active {
  border: 1px solid rgba(255, 255, 255, 0.35);
  cursor: default;
}
.hamburger {
  display: none;
  position: absolute;
  bottom: -34px;
  border-radius: 0px 0px 7px 7px;
  background: rgba(127, 127, 127, .6);
  cursor: pointer;
  transition: background-color .3s;

  @include tablet {
    display: block;
  }
}
.hamburger_hover {
  &:hover {
    background-color: rgba(239, 131, 118, 0.75);
  }
}
.hamburger_background {
  top: 0;
  right: 0;
  bottom: auto;
  border-radius: 0;
  background-color: rgba(127, 127, 127, 0);
}
.hamburger__icon {
  padding: 7px 25px;
  fill: #fff;
  width: 20px;
  height: 15px;

  .hamburger__icon-top, .hamburger__icon-bottom, .hamburger__icon-center {
    transition: transform .5s, fill .3s;
    transform: none;
  }
  .hamburger__icon-top {
    transform-origin: top;
  }
  .hamburger__icon-bottom {
    transform-origin: bottom;
  }
}
.hamburger__icon_active {
  width: 30px;
  height: 25px;

  .hamburger__icon-center{
    fill: rgba(255,255,255, 0);
  }
  .hamburger__icon-top {
    transform: translateY(45%) rotate(45deg);
  }
  .hamburger__icon-bottom {
    transform: translateY(-45%) rotate(-45deg);
  }
}
</style>
