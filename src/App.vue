<template>
  <header class="header">
    <router-link to="/">
      <img class="logo" src="@/assets/images/logo.svg" />
    </router-link>
    <SearchInput
      id="searchQuery"
      placeholder="Search products"
      @entersearch="doSearch"
    />
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script>
import SearchInput from "./components/SearchInput.vue";
import { provide, ref } from "vue";

export default {
  name: "App",
  components: {
    SearchInput,
  },

  setup() {
    const searchString = ref("");
    const doSearch = (query) => {
      searchString.value = query;
    };
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
