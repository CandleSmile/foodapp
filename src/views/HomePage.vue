<template>
  <LoadingContent :is-visible="loadingCat || loading" />

  <template v-if="!loadingCat && !loading">
    <ListCategories
      :categories-list="categoriesList"
      v-if="categoriesList && categoriesList.length > 0"
    ></ListCategories>
    <div
      class="categories-item__no-category-data"
      v-else-if="categoriesList && categoriesList.length == 0"
    >
      <p>Categories were not found</p>
    </div>
    <div class="categories-item__error" v-else>
      <p>There war an error {{ errorCat }}</p>
    </div>

    <ListFood
      v-if="mealsList && mealsList.length > 0"
      title-list="Latest Meals"
      :meals-list="mealsList"
      @change-quantity="updateQuantity"
      @add-to-cart="addToCart"
    ></ListFood>
    <div
      class="list-food__no-meals-data"
      v-else-if="mealsList && mealsList.length == 0"
    >
      <p>Meals were not found</p>
    </div>
    <div class="list-food__error" v-else>
      <p>There war an error {{ errorMeal }}</p>
    </div>
  </template>
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
