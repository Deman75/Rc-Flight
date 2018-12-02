<template lang="pug">
.about
</template>

<script>
import { mapState } from 'vuex'

export default {
  created() {
    window.addEventListener("resize", this.minHeightInit);
  },
  destroyed() {
    window.removeEventListener("resize", this.minHeightInit);
  },
  computed:  {
    ...mapState('commons', [
      'footerHeight'
    ]),
  },
  mounted() {
    this.minHeightInit();
  },
  methods: {
    minHeightInit() {
      const windowHeight = window.innerHeight;
      const wrap = document.querySelector('.about');

      wrap.style.height = `${windowHeight - this.footerHeight}px`
    }
  }
}
</script>

<style lang="scss" scoped>
.about {

}
</style>
