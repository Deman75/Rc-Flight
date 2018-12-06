<template lang="pug">
.about
  .top-block
    h2.title="Наша команда"
  .about__wrap
    titleSection(
      :titleData="titleData"
      )
    .about__image
      img(alt='' src='../assets/images/we.jpeg').image
    .desc__wrap
      h3.subtitle="Немного он нашем хобби"
      article.desc
        p
          | Авиамоделизм - наше хобби. Хобби которое позволяет отдохнуть, отвлечься от работы. Один из главных плюсов этого хобби в том, что летать нужно на открытом воздухе и большом пространстве, что дает возможность отдахнуть глазам и подышать свежим воздухом. Так же этот вид спорта воспитывает аккуратность и техническую мысль, как правило авиамоделисты очень много делают своими руками а полеты это результат большой работы проведенной по сборке и настройке модели.
      h3.subtitle="Еще один абзац"
      article.desc
        p
          | Сюда бы еще пару абзацев сочинить. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    .line
    .cards
      cards
  .bottom-line
</template>

<script>
import titleSection from "@/components/title-section.vue";
import cards from "@/components/cards.vue";

export default {
  components: {
    titleSection,
    cards
  },
  data() {
    return {
      titleData: {
        title: "Кто мы?",
        text: "Небольшая команда авиамоделистов любителей. Летаем в свое удовольствие!"
      },
    }
  },

}
</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.about__wrap {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 95%;
  max-width: 1200px;
}
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

  &::after {
    content: '';
    position: absolute;
    display: block;
    background: url('../assets/images/about_bg.jpg') center center no-repeat;
    background-size: cover;
    top: -10%;
    left: -10%;
    right: -10%;
    bottom: -10%;
    z-index: -1;
    filter: blur(3px) brightness(40%);
  }

  @include phone {
    height: 150px;
  }

  @include phoneLand {
    height: 130px;
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
.about__image {
  width: 100%;
  margin: 0 auto;
  max-height: 550px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  @include phone {
    margin-top: 20px;
    max-height: 200px;
  }
  @include phoneLand {
    max-height: 200px;
    width: 80%;
  }
}
.image {
  width: 100%;
  flex-shrink: 0;
}
.desc__wrap {
  margin-top: 30px;
}
.desc {
  padding: 15px 0 40px 0;
  width: 100%;
  text-align: left;
  letter-spacing: 1.1px;
  line-height: 1.42;
  font-size: 18px;
  font-weight: 300;
}
.subtitle {
  font-size: 22px;
  margin: 0;
  text-align: left;
  font-weight: 400;
}
.line {
  width: 100%;
  height: 6px;
  margin: 20px 0;
  border-top: solid 1px rgba(128, 128, 128, 0.2);
  border-bottom: solid 1px rgba(128, 128, 128, 0.2);
}
.cards {
  padding: 40px 0;
}
.bottom-line {
  width: 100%;
  height: 40px;
  background-color: #f0f4f4;
}
</style>
