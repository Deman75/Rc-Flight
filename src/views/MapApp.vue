<template lang="html">
  <div>
    <TopTitle title="Где мы летаем" image="images/bg/map_bg.jpg"/>
    <YandexMap/>
  </div>
</template>

<script>
import YandexMap from '../components/YMap';
import TopTitle from '../components/TopTitle';

export default {
  components: {
    YandexMap,
    TopTitle,
  }
}
</script>

<style lang="scss" scoped>

</style>
