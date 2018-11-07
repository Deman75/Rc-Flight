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
          a.socials__link
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: #2b252c;
  color: #fff;
  width: 100%;
  height: 200px;
  padding: 20px 0;
}
.top {
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
.title {

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
}
.copiright__desc {
  margin-left: 20px;
  width: 50%;
  text-align: left;
}
.copiright__socials {
  width: 50%;
}
.socials__link {
  width: 20px;
  height: 20px;
}
.socials__icon {
  fill: #fff;
  width: 100%;
  height: 100%;
}
</style>
