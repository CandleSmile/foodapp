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
      <div class="header__search-log-wrapper">
        <SearchInput
          id="searchQuery"
          @on-search="onSearch"
          placeholder="Search products"
          class="header__search-form"
        ></SearchInput>
        <LogPanel v-if="isLogPanelShown" @on-logout="LogOut"></LogPanel>
      </div>
    </div>
  </header>
  <main class="main-block"><RouterView></RouterView></main>
</template>
<script setup>
import SearchInput from "@/components/general/SearchInput.vue";
import LogPanel from "@/components/LogPanel.vue";
import { LOGOUT_ACTION } from "@/store/storeConstants";
import { useRouter, useRoute } from "vue-router";
import { FilterType } from "@/const/filterType";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
const router = useRouter();
const route = useRoute();
const store = useStore();

const onSearch = (searchString) => {
  if (route.name != "meal") {
    router.push({ name: "meal", query: { [FilterType.SEARCH]: searchString } });
  } else {
    let routeQuery = Object.assign({}, route.query);
    routeQuery[[FilterType.SEARCH]] = searchString;
    router.push({ name: "meal", query: routeQuery });
  }
};
const isLogPanelShown = computed(() => route.name != "login");
const LogOut = () => {
  store.dispatch(`auth/${LOGOUT_ACTION}`);
  router.push({ name: "home" });
};
</script>
<style lang="scss">
.header__search-log-wrapper {
  display: flex;
  gap: 10px 20px;
  font-size: 12px;
}
@media only screen and (max-width: $mediaBp2Width) {
  .header__search-log-wrapper {
    justify-content: center;
  }
}
</style>
