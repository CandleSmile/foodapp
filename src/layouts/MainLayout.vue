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
          :query="searchString"
          @on-update-query="updateQuery"
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
import {
  LOGOUT_ACTION,
  SEARCH_STRING,
  UPDATE_SEARCH_ACTION,
} from "@/store/storeConstants";
import { useRouter, useRoute } from "vue-router";
import { FilterType } from "@/const/filterType";
import { computed } from "@vue/runtime-core";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const router = useRouter();
const route = useRoute();
const { useActions: useAuthActions } = createNamespacedHelpers("auth");
const { useGetters: useFilterGetters, useActions: useFilterActions } =
  createNamespacedHelpers("filters");
const { [LOGOUT_ACTION]: logOutAction } = useAuthActions([LOGOUT_ACTION]);

const { [SEARCH_STRING]: searchString } = useFilterGetters([SEARCH_STRING]);
const { [UPDATE_SEARCH_ACTION]: updateQuery } = useFilterActions([
  UPDATE_SEARCH_ACTION,
]);

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
  logOutAction();
  router.push({ name: "home" });
};
</script>
<style lang="scss">
.header__search-log-wrapper {
  display: flex;
  gap: 10px 20px;
  font-size: 12px;
}
@media only screen and (max-width: $mediaTablets) {
  .header__search-log-wrapper {
    justify-content: center;
  }
}
</style>
