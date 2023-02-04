<template>
  <FilterTags @delete-tag="deleteFromFilters" :filter-tags="filterTags" />
  <FilterPanel
    :ingredients-options="ingredientsOptions"
    :checked-ingredients="checkedIngredients"
    :cat-options="catOptions"
    :category="category"
    @filter="onFilter"
    @update-category="updateSelectedCat"
    @update-ingredients="updateSelectedIngredients"
  />
  <AppLoader v-if="loading" :is-dark="false" />
  <template v-else>
    <ListFood
      v-if="mealsList && mealsList.length > 0"
      :meals-list="mealsList"
      title-list="Meals"
      @change-quantity="updateQuantity"
      @add-to-cart="addToCart"
    />
    <div
      class="list-food__no-meals-data"
      v-else-if="mealsList && mealsList.length == 0"
    >
      <p>Meals were not found</p>
    </div>
    <div class="list-food__error" v-else>
      <p>There war an error {{ error }}</p>
    </div>
  </template>
</template>
<script>
import ListFood from "../components/ListFood.vue";
import FilterTags from "../components/FilterTags.vue";
import FilterPanel from "../components/FilterPanel.vue";
import AppLoader from "../components/general/AppLoader.vue";
import { FilterType } from "@/const/filterType";
import { watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { parseQueryStringToFilters } from "../helpers/filters";
import { createNamespacedHelpers } from "vuex-composition-helpers";

import {
  GET_FILTERING_MEAL_ACTION,
  UPDATE_SELECTED_FILTERS_ACTION,
  UPDATE_FILTER_TAGS_ACTION,
  GET_INGREDIENTS_OPTIONS_ACTION,
  GET_CATEGORY_OPTIONS_ACTION,
  LOADING,
  ERROR,
  MEALS,
  FILTER_TAGS,
  INGREDIENT_OPTIONS,
  CATEGORY_OPTIONS,
  SELECTED_CATEGORY,
  SELECTED_INGREDIENTS,
  UPDATE_SELECTED_CATEGORY_ACTION,
  UPDATE_SELECTED_INGREDIENTS_ACTION,
  UPDATE_QUANTITY_OF_MEAL_ACTION,
  ADD_TO_CART_ACTION,
} from "@/store/storeConstants";

const { useGetters: useMealsGetters, useActions: useMealsActions } =
  createNamespacedHelpers("meals");
const { useActions: useFiltersActions, useGetters: useFiltersGetters } =
  createNamespacedHelpers("filters");
const { useActions: useCartActions } = createNamespacedHelpers("cart");
export default {
  name: "MealsPage",
  components: {
    ListFood,
    FilterTags,
    FilterPanel,
    AppLoader,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();

    let filters = parseQueryStringToFilters(route.query);
    const {
      [MEALS]: mealsList,
      [ERROR]: error,
      [LOADING]: loading,
    } = useMealsGetters([MEALS, ERROR, LOADING]);
    const {
      [GET_FILTERING_MEAL_ACTION]: getMeals,
      [UPDATE_QUANTITY_OF_MEAL_ACTION]: updateQuantity,
    } = useMealsActions([
      GET_FILTERING_MEAL_ACTION,
      UPDATE_QUANTITY_OF_MEAL_ACTION,
    ]);

    const {
      [FILTER_TAGS]: filterTags,
      [INGREDIENT_OPTIONS]: ingredientsOptions,
      [CATEGORY_OPTIONS]: catOptions,
      [SELECTED_CATEGORY]: category,
      [SELECTED_INGREDIENTS]: checkedIngredients,
    } = useFiltersGetters([
      FILTER_TAGS,
      INGREDIENT_OPTIONS,
      CATEGORY_OPTIONS,
      SELECTED_CATEGORY,
      SELECTED_INGREDIENTS,
    ]);
    const {
      [UPDATE_SELECTED_FILTERS_ACTION]: updateSelectedFilters,
      [UPDATE_FILTER_TAGS_ACTION]: updateFilterTags,
      [GET_INGREDIENTS_OPTIONS_ACTION]: getIngredientsOptions,
      [GET_CATEGORY_OPTIONS_ACTION]: getCategoryOptions,
      [UPDATE_SELECTED_CATEGORY_ACTION]: updateSelectedCat,
      [UPDATE_SELECTED_INGREDIENTS_ACTION]: updateSelectedIngredients,
    } = useFiltersActions([
      UPDATE_SELECTED_FILTERS_ACTION,
      UPDATE_FILTER_TAGS_ACTION,
      GET_INGREDIENTS_OPTIONS_ACTION,
      GET_CATEGORY_OPTIONS_ACTION,
      UPDATE_SELECTED_CATEGORY_ACTION,
      UPDATE_SELECTED_INGREDIENTS_ACTION,
    ]);
    const { [ADD_TO_CART_ACTION]: addToCart } = useCartActions([
      ADD_TO_CART_ACTION,
    ]);

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
    const deleteFromFilters = (tag) => {
      let routeQuery = Object.assign({}, route.query);
      if (tag.type === FilterType.INGREDIENTS) {
        let ingredientsArr = routeQuery[[tag.type]]
          ? routeQuery[[tag.type]].split(",")
          : [];
        ingredientsArr = ingredientsArr.filter((ing) => ing != tag.val.id);
        ingredientsArr.length > 0
          ? (routeQuery[[tag.type]] = ingredientsArr.join(","))
          : delete routeQuery[[tag.type]];
      } else delete routeQuery[[tag.type]];

      router.push({ name: "meal", query: routeQuery });
    };

    watch(
      () => route.query,
      (newValue) => {
        if (route.name == "meal") {
          filters = parseQueryStringToFilters(newValue);
          updateSelectedFilters(filters);
          updateFilterTags(filters);
          getMeals(filters);
        }
      }
    );

    //get and set initial info and filter's object
    onMounted(async () => {
      getMeals(filters);
      await getIngredientsOptions(filters);
      await getCategoryOptions(filters);
      updateSelectedFilters(filters);
      updateFilterTags(filters);
    });

    return {
      loading,
      mealsList,
      error,
      filterTags,
      onFilter,
      deleteFromFilters,
      ingredientsOptions,
      catOptions,
      category,
      checkedIngredients,
      updateSelectedCat,
      updateSelectedIngredients,
      updateQuantity,
      addToCart,
    };
  },
};
</script>

<style></style>
