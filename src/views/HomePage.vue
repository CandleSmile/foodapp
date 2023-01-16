<template>
  <LoadingContent v-if="loadingCat" />
  <ListCategories
    :error="errorCat"
    :categories-list="categoriesList"
    v-else
  ></ListCategories>
  <LoadingContent v-if="loading" />
  <ListFood
    v-else
    title-list="Latest Meals"
    :is-latest-meals="true"
    :error="errorMeal"
    :meals-list="mealsList"
    @change-quantity="updateQuantity"
    @on-add-to-cart="addToCart"
  ></ListFood>
</template>

<script>
import { onMounted } from "vue";
import ListFood from "../components/ListFood.vue";
import ListCategories from "../components/ListCategories.vue";
import LoadingContent from "../components/general/LoadingContent.vue";

import { createNamespacedHelpers } from "vuex-composition-helpers";
import {
  GET_LATEST_MEAL_ACTION,
  GET_CATEGORIES_ACTION,
  CATEGORIES,
  LOADING,
  ERROR,
  MEALS,
  UPDATE_QUANTITY_OF_MEAL_ACTION,
  ADD_TO_CART_ACTION,
} from "@/store/storeConstants";

const { useGetters: useCategoriesGetters, useActions: useCategoriesActions } =
  createNamespacedHelpers("categories");
const { useGetters: useMealsGetters, useActions: useMealsActions } =
  createNamespacedHelpers("meals");
const { useActions: useCartActions } = createNamespacedHelpers("cart");
export default {
  name: "HomePage",
  components: {
    ListFood,
    ListCategories,
    LoadingContent,
  },
  setup() {
    const {
      [CATEGORIES]: categoriesList,
      [ERROR]: errorCat,
      [LOADING]: loadingCat,
    } = useCategoriesGetters([CATEGORIES, ERROR, LOADING]);

    const {
      [MEALS]: mealsList,
      [ERROR]: errorMeal,
      [LOADING]: loading,
    } = useMealsGetters([MEALS, ERROR, LOADING]);

    const { [GET_CATEGORIES_ACTION]: getCategories } = useCategoriesActions([
      GET_CATEGORIES_ACTION,
    ]);

    const {
      [GET_LATEST_MEAL_ACTION]: getMeals,
      [UPDATE_QUANTITY_OF_MEAL_ACTION]: updateQuantity,
    } = useMealsActions([
      GET_LATEST_MEAL_ACTION,
      UPDATE_QUANTITY_OF_MEAL_ACTION,
    ]);
    const { [ADD_TO_CART_ACTION]: addToCart } = useCartActions([
      ADD_TO_CART_ACTION,
    ]);

    onMounted(() => {
      getCategories();
      getMeals();
    });

    return {
      loading,
      loadingCat,
      categoriesList,
      errorCat,
      mealsList,
      errorMeal,
      updateQuantity,
      addToCart,
    };
  },
};
</script>
