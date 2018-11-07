<template lang="pug">
  div.home
    Hero
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/hero.vue"

export default {
  name: "home",
  components: {
    Hero
  }
};
</script>
