<template>
  <header class="header">
    <Greeting msg="THE BEST FOOD" />
    <Navigation></Navigation>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import Greeting from "./components/Greeting.vue";
import Navigation from "./components/Navigation.vue";
export default {
  name: "App",
  components: {
    Greeting,
    Navigation,
  },
};
</script>

<style lang="scss">
@import "./assets/styles/index.scss";
</style>
