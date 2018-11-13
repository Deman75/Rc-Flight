<template lang="pug">
footer.footer
  .top
    h3.title
      | Сайт разработан для ознакомления с движением авиамоделистов.
    p.desc Базируемся мы на юго-западе, в Московской области. Тусовка у нас не большая, но очень интересная!
  .line
  .copiright
    .copiright__desc
      p © Сайт является открытым. На сайте используется технологии: HTML5 CSS JS Vue.js.
      p Создатель: Дмитрий Шапиро!
    .copiright__socials
      ul.socials
        li.socials__item
          a(href="#").socials__link
            facebook
        li.socials__item
          a(href="#").socials__link
            instagram
        li.socials__item
          a(href="#").socials__link
            vk
</template>

<script>
import facebook from "./icons/facebook.vue"
import instagram from "./icons/instagram.vue"
import vk from "./icons/vk.vue"

export default {
  components: {
    facebook,
    instagram,
    vk
  },
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: rgba(43, 37, 44, .8);
  color: #fff;
  width: 100%;
  height: 200px;
  padding: 20px 0;

  @include phone {
    padding: 0;
  }
}
.top {
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
.title {
  @include phone {
    font-size: 16px;
  }
}
.desc{
  @include phone {
    font-size: 14px;
  }
}
.line {
  width: 100%;
  height: 3px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}
.copiright {
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: rgba(128, 128, 128, 0.75);

  @include phone {
    font-size: 12px;
  }
}
.copiright__desc {
  margin-left: 20px;
  width: 50%;
  text-align: left;
}
.copiright__socials {
  width: 50%;
}
.socials {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
}
.socials__link {
  display: block;
  width: 30px;
  height: 30px;
  padding: 10px;
  fill: #ccc;

  &:hover {
    fill: rgba(239, 131, 118, 1);
  }

  @include phone {
    width: 20px;
    height: 20px;
  }
}
</style>
