<template>
  <FilterTags @on-delete="onDeleteFromFilters"></FilterTags>
  <FilterPanel @on-filter="onFilter"></FilterPanel>
  <LoadingContent v-if="loading" />
  <ListFood v-else title-list="Meals" :is-latest-meals="false"></ListFood>
</template>
<script>
import ListFood from "../components/ListFood.vue";
import FilterTags from "../components/FilterTags.vue";
import FilterPanel from "../components/FilterPanel.vue";
import LoadingContent from "../components/general/LoadingContent.vue";
import { FilterType } from "@/const/filterType";
import { watch, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { parseQueryStringToFilters } from "../helpers/filters";
import { useStore } from "vuex";
import {
  GET_FILTERING_MEAL_ACTION,
  UPDATE_SELECTED_FILTERS_ACTION,
  UPDATE_FILTER_TAGS_ACTION,
  GET_INGREDIENTS_OPTIONS_ACTION,
  GET_CATEGORY_OPTIONS_ACTION,
} from "@/store/storeConstants";

export default {
  name: "MealsPage",
  components: {
    ListFood,
    FilterTags,
    FilterPanel,
    LoadingContent,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    let filters = parseQueryStringToFilters(route.query);
    const loading = computed(() => store.state.meals.loading);

    // press on filter button
    const onFilter = (category, checkedIngredients) => {
      let routeQuery = Object.assign({}, route.query);

      if (category && category != "") {
        routeQuery[[FilterType.CATEGORY]] = category;
      } else {
        delete routeQuery[[FilterType.CATEGORY]];
      }

      if (checkedIngredients != "") {
        routeQuery[[FilterType.INGREDIENTS]] = checkedIngredients.join(",");
      } else delete routeQuery[[FilterType.INGREDIENTS]];

      router.push({ name: "meal", query: routeQuery });
    };

    //press on delete icon in filter tags
    const onDeleteFromFilters = (tag) => {
      let routeQuery = Object.assign({}, route.query);
      if (tag.type === FilterType.INGREDIENTS) {
        let ingredientsArr = routeQuery[[tag.type]]
          ? routeQuery[[tag.type]].split(",")
          : [];
        ingredientsArr = ingredientsArr.filter((ing) => ing != tag.val);
        ingredientsArr.length > 0
          ? (routeQuery[[tag.type]] = ingredientsArr.join(","))
          : delete routeQuery[[tag.type]];
      } else delete routeQuery[[tag.type]];

      router.push({ name: "meal", query: routeQuery });
    };

    watch(
      () => route.query,
      (newValue) => {
        filters = parseQueryStringToFilters(newValue);

        store.dispatch(`filters/${UPDATE_SELECTED_FILTERS_ACTION}`, filters);
        store.dispatch(`filters/${UPDATE_FILTER_TAGS_ACTION}`, filters);
        store.dispatch(`meals/${GET_FILTERING_MEAL_ACTION}`, filters);
      }
    );

    //get and set initial info and filter's object
    onMounted(() => {
      store.dispatch(`filters/${GET_INGREDIENTS_OPTIONS_ACTION}`, filters);
      store.dispatch(`filters/${GET_CATEGORY_OPTIONS_ACTION}`, filters);
      store.dispatch(`filters/${UPDATE_SELECTED_FILTERS_ACTION}`, filters);
      store.dispatch(`filters/${UPDATE_FILTER_TAGS_ACTION}`, filters);
      store.dispatch(`meals/${GET_FILTERING_MEAL_ACTION}`, filters);
    });

    return {
      loading,
      onFilter,
      onDeleteFromFilters,
    };
  },
};
</script>

<style></style>
