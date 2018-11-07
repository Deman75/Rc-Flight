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
}
.subtitle {
  font-size: 53px;
}
.desc {
  padding: 0 40px;
  margin-top: 28px;
  font-size: 28px;
  font-weight: 300;
}
</style>
