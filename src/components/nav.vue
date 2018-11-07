<template lang="pug">
nav.nav
  .heder-line
  ul.nav__list
    li.nav__item
      router-link(to="/").nav__link Главная
    li.nav__item
      router-link(to="/about").nav__link О нас
    li.nav__item
      router-link(to="/where").nav__link Где мы
    li.nav__item
      router-link(to="/contact").nav__link Контакты
    li.nav__item
      router-link(to="/blog").nav__link Блог
  .heder-line
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.nav {
  position: absolute;
  left: 0;
  top: 0;
  padding: 28px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 10;
}
.heder-line {
  display: inline;
  width: 100%;
  height: 3px;
  border-top: 1px solid rgba(255, 255, 255, 0.35);
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
}
.nav__list {
  height: 21px;
  border-left: 1px solid rgba(255, 255, 255, 0.35);
  border-right: 1px solid rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  position: relative;
  flex-shrink: 0;
}
.nav__item {
  padding: 5px 15px;
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 5px;
  transition: border .2s;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.35);
  }
}
.nav__link {
  font-size: 19px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
}
</style>
