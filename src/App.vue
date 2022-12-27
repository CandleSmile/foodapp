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
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script>
import SearchInput from "./components/SearchInput.vue";
import { watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { parseQueryStringToFilters } from "./filters";
export default {
  name: "App",
  components: {
    SearchInput,
  },

  setup() {
    console.log("app setup begin");
    const route = useRoute();

    watch(
      () => route.query,
      (newVaue) => {
        parseQueryStringToFilters(newVaue);
      }
    );

    onMounted(() => {
      parseQueryStringToFilters(route.query);
    });
  },
};
</script>

<style lang="scss">
@import "./assets/styles/index.scss";
</style>
