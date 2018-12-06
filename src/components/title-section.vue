<template lang="pug">
  .title-wrap
    h2.subtitle {{titleData.title}}
    .desc {{titleData.text}}
</template>

<script>
export default {
  props: {
    titleData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.title-wrap {
  padding-top: 80px;
  padding-bottom: 80px;
  width: 100%;
  background-color: #fff;

  @include tablet {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  @include phone {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  @include phoneLand {
    padding: 0 0 10px 0;
  }
}
.subtitle {
  font-size: 53px;

  @include tablet {
    font-size: 33px;
  }

  @include phone {
    font-size: 25px;
  }

  @include phoneLand {
    font-size: 20px;
  }
}
.desc {
  padding: 0 40px;
  margin-top: 28px;
  font-size: 28px;
  font-weight: 300;

  @include tablet {
    font-size: 24px;
    padding: 0 20px;
    margin-top: 20px;
  }

  @include phone {
    padding: 0 10px;
    font-size: 18px;
    margin-top: 15px;
  }

  @include phoneLand {
    font-size: 18px;
  }
}
</style>
