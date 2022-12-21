<template>
  <h1 class="greeting header__greeting">{{ msg }}</h1>
</template>

<script>
export default {
  name: "greeting-comp",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.greeting {
  color: $greeting-color;
}
</style>
