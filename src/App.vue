<template>
  <component :is="route.meta.layoutComponent">
    <RouterView />
  </component>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style lang="scss">
@import "./assets/styles/index.scss";
</style>
