<template lang="pug">
.wrap
  ul.card__list
    li.card__item
      .card__image
        img(alt="" src="../assets/images/dmitriy.jpg").card__image-img
      .card__desc
        h3.desc__title="Дмитрий Шапиро"
        article.desc__text
          p
            | С детства увлекаюсь авиамоделизмом. Занимался в кружке с 9 лет, даже получил КМС по свободнолетающим моделям. Это не единственное мое хобби, так же увлекаюсь программированием, изготовлением всяких поделок на основе микроконтроллеров,
            | играю на гитаре, 3d моделирование. В общем люблю заниматься всем, результат чего видно сразу.
    li.card__item
      .card__image
        img(alt="" src="../assets/images/vlad.jpg").card__image-img
      .card__desc
        h3.desc__title="Влад"
        article.desc__text
          p
            | В основном увлекаюсь моделями с ФПВ
            |
    li.card__item
      .card__image
        img(alt="" src="../assets/images/dmitriy.jpg").card__image-img
      .card__desc
        h3.desc__title="Дмитрий Шапиро"
        article.desc__text
          p
            | С детства увлекаюсь авиамоделизмом. Занимался в кружке с 9 лет, даже получил КМС по свободнолетающим моделям. Это не единственное мое хобби, так же увлекаюсь программированием, изготовлением всяких поделок на основе микроконтроллеров,
            | играю на гитаре, 3d моделирование. В общем люблю заниматься всем, результат чего видно сразу.
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.card__list {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-weight: 300;

  @include tablet {
    flex-wrap: wrap;
    justify-content: space-around;
  }
  @include phoneLand {
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
.card__item {
  width: 30%;

  @include tablet {
    width: 45%;
    margin-bottom: 60px;
  }

  @include phone {
    width: 100%;
    margin-bottom: 60px;
  }

  @include phoneLand {
    width: 45%;
    margin-bottom: 60px;
  }
}
.card__image {
  width: 100%;
  height: 220px;
  overflow: hidden;

  @include phoneLand {
    height: auto;
  }
}
.card__image-img {
  width: 100%;
}
.card__desc {
  padding-top: 10px;

  @include phone {
    padding-top: 0;
  }
}
.desc__title {
  margin: 15px 0;
  text-align: center;
  font-weight: 400;
  font-size: 22px;

  @include phone {
    margin: 15px 0 5px 0;
  }
}
.desc__text {
  font-size: 18px;
  text-align: justify;
  text-align-last: justify;
}
</style>
