<template>
  <component :is="route.meta.layoutComponent">
    <router-view v-slot="{ Component }">
      <suspense timeout="0">
        <component :is="Component" />
        <!-- loading state -->
        <template #fallback> Loading... </template>
      </suspense>
    </router-view>
  </component>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style lang="scss">
@import "./assets/styles/index.scss";
</style>
