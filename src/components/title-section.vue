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
  padding: 80px 0;
  width: 100%;
  background-color: #fff;

  @include phone {
    padding: 10px 0;
  }

  @include phoneLand {
    padding: 0;
  }
}
.subtitle {
  font-size: 53px;

  @include phone {
    font-size: 35px;
  }

  @include phoneLand {
    font-size: 30px;
  }
}
.desc {
  padding: 0 40px;
  margin-top: 28px;
  font-size: 28px;
  font-weight: 300;

  @include phone {
    padding: 0 10px;
    font-size: 20px;
    margin-top: 15px;
  }

  @include phoneLand {
    font-size: 20px;
  }
}
</style>
