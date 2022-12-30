<template>
  <header class="header">
    <div class="header-info-wrapper">
      <router-link to="/" class="logo-title-block">
        <img class="logo" src="@/assets/images/logo.svg" alt="THE BEST FOOD" />
        <h1 class="site-title logo-title-block__site-title">
          THE <span>BEST </span>FOOD
        </h1>
      </router-link>
      <SearchInput id="searchQuery" placeholder="Search products"></SearchInput>
    </div>
  </header>
  <main class="main-block">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </main>
</template>

<script>
import SearchInput from "./components/SearchInput.vue";

export default {
  name: "App",
  components: {
    SearchInput,
  },
  setup() {},
};
</script>

<style lang="scss">
@import "./assets/styles/index.scss";
</style>
