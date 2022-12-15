<template>
  <Greeting msg="THE BEST FOOD" />
  <Listfood></Listfood>
</template>

<script>
import Greeting from "./components/Greeting.vue";
import Listfood from "./components/Listfood.vue";

export default {
  name: "App",
  components: {
    Greeting,
    Listfood,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
