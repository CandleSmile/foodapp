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
        <AppSearch
          id="searchQuery"
          @search="onSearch"
          placeholder="Search products"
          :query="searchString"
          @update-query="updateQuery"
          class="header__search-form"
        />
        <LogPanel v-if="isLogPanelShown" @logout="logOut" />
        <CartButton @view-cart="onViewCart" :count-items="countItems" />
      </div>
    </div>
  </header>
  <main class="main-block"><RouterView></RouterView></main>
</template>
<script setup>
import AppSearch from "@/components/general/AppSearch.vue";
import LogPanel from "@/components/LogPanel.vue";
import {
  LOGOUT_ACTION,
  SEARCH_STRING,
  UPDATE_SEARCH_ACTION,
  CART_COUNT,
} from "@/store/storeConstants";
import { useRouter, useRoute } from "vue-router";
import { FilterType } from "@/const/filterType";
import { computed } from "@vue/runtime-core";
import { createNamespacedHelpers } from "vuex-composition-helpers";

import CartButton from "@/components/CartButton.vue";
const router = useRouter();
const route = useRoute();
const { useActions: useAuthActions } = createNamespacedHelpers("auth");
const { useGetters: useFilterGetters, useActions: useFilterActions } =
  createNamespacedHelpers("filters");
const { useGetters: useCartGetters } = createNamespacedHelpers("cart");
const { [LOGOUT_ACTION]: logOutAction } = useAuthActions([LOGOUT_ACTION]);

const { [SEARCH_STRING]: searchString } = useFilterGetters([SEARCH_STRING]);
const { [UPDATE_SEARCH_ACTION]: updateQuery } = useFilterActions([
  UPDATE_SEARCH_ACTION,
]);

const { [CART_COUNT]: countItems } = useCartGetters([CART_COUNT]);
const onSearch = (searchString) => {
  if (route.name != "meal") {
    router.push({ name: "meal", query: { [FilterType.SEARCH]: searchString } });
  } else {
    let routeQuery = Object.assign({}, route.query);
    routeQuery[[FilterType.SEARCH]] = searchString;
    router.push({ name: "meal", query: routeQuery });
  }
};
const onViewCart = () => {
  router.push({ name: "cart" });
};

const isLogPanelShown = computed(() => route.name != "login");

const logOut = () => {
  logOutAction();
  router.push({ name: "home" });
};
</script>
<style lang="scss">
.header {
  &__search {
    &-form {
      align-self: center;
    }

    &-log-wrapper {
      display: flex;
      gap: 10px 20px;
      font-size: 12px;
      align-items: center;
    }
  }
}
@media only screen and (max-width: $mediaTablets) {
  .header__search-log-wrapper {
    justify-content: center;
  }
}
</style>
