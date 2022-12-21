<template>
  <header class="header">
    <router-link to="/" class="logo-title-block">
      <img class="logo" src="@/assets/images/logo.svg" />
      <h1 class="site-title">THE BEST FOOD</h1>
    </router-link>
    <SearchInput
      id="searchQuery"
      placeholder="Search products"
      @entersearch="doSearch"
    ></SearchInput>
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
import { provide, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "App",
  components: {
    SearchInput,
  },

  setup() {
    const searchString = ref("");
    const router = useRouter();
    const route = useRoute();

    const doSearch = (query) => {
      if (route.name != "home") {
        router.push({ name: "home" });
      }

      searchString.value = query;
    };
    const clearSearchForm = ref(false);

    watch(
      () => route.name,
      (name) => {
        if (name != "home") {
          clearSearchForm.value = true;
        }
      }
    );

    provide("clearSearchForm", clearSearchForm);
    provide("serchStr", searchString);

    return {
      doSearch,
    };
  },
};
</script>

<style lang="scss">
@import "./assets/styles/index.scss";
</style>
