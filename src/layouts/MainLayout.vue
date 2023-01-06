<template>
  <header class="header">
    <div class="header-info-wrapper">
      <router-link to="/" class="logo-title-block">
        <img
          class="logo-title-block__logo"
          src="@/assets/images/logo.svg"
          alt="THE BEST FOOD"
        />
        <h1 class="logo-title-block__site-title">THE <span>BEST </span>FOOD</h1>
      </router-link>
      <SearchInput
        id="searchQuery"
        @on-search="onSearch"
        placeholder="Search products"
        class="header__search-form"
        v-model="searchQuery"
      ></SearchInput>
    </div>
  </header>
  <main class="main-block"><slot /></main>
</template>
<script setup>
import SearchInput from "@/components/general/SearchInput.vue";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { FilterType } from "@/const/filterType";

const router = useRouter();
const route = useRoute();

const searchQuery = ref(
  route.query && route.name == "meal"
    ? route.query[[FilterType.SEARCH]] || ""
    : ""
);

//clear search
watch(
  () => route.query,
  () => {
    searchQuery.value =
      route.query && route.name == "meal"
        ? route.query[[FilterType.SEARCH]] || ""
        : "";
  }
);
const onSearch = (searchString) => {
  if (route.name != "meal") {
    router.push({ name: "meal", query: { [FilterType.SEARCH]: searchString } });
  } else {
    let routeQuery = Object.assign({}, route.query);
    routeQuery[[FilterType.SEARCH]] = searchString;
    router.push({ name: "meal", query: routeQuery });
  }
};
</script>
<style></style>
