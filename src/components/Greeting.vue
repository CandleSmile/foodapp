<template>
  <div>
    <h1 class="greeting">{{ msg }}</h1>
  </div>
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
  color: aquamarine;
}
</style>
