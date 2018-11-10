<template lang="pug">
svg(
  version='1.1'
  xmlns='http://www.w3.org/2000/svg'
  xmlns:xlink='http://www.w3.org/1999/xlink'
  x='0px'
  y='0px'
  viewBox='0 0 512 512'
  xml:space='preserve'
  ).icon
  g
    path(d='M288,176v-64c0-17.664,14.336-32,32-32h32V0h-64c-53.024,0-96,42.976-96,96v80h-64v80h64v256h96V256h64l32-80H288z')
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.icon {
  width: 100%;
  height: 100%;
  fill: inherit;
  transition: fill .3s;
}
</style>
