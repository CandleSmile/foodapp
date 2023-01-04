<template>
  <ListCategories
    :data="categories"
    :loading="loadingCat"
    :error="errorCat"
  ></ListCategories>
  <Listfood
    title-list="Latest Products"
    :meals="meals"
    :loading="loading"
    :error="error"
  ></Listfood>
</template>

<script>
import Listfood from "../components/Listfood.vue";
import ListCategories from "../components/ListCategories.vue";
import { foodApi } from "../api/index.js";
import { ref } from "vue";
export default {
  name: "HomePage",
  components: {
    Listfood,
    ListCategories,
  },
  setup() {
    let meals = ref(null);
    let loading = ref(true);
    let error = ref(null);

    let categories = ref(null);
    let loadingCat = ref(true);
    let errorCat = ref(null);

    foodApi.food.get
      .initialFoods()
      .then((info) => {
        loading.value = false;
        if (!info.ok) {
          error.value = info.error;
        } else {
          meals.value = info.data ?? [];
        }
      })
      .catch((err) => {
        loading.value = false;
        error.value = err;
      });

    foodApi.category.get
      .allCategoriesWithImages()
      .then((info) => {
        loadingCat.value = false;
        if (!info.ok) {
          errorCat.value = info.error;
        } else {
          categories.value = info.data ?? [];
        }
      })
      .catch((err) => {
        loadingCat.value = false;
        errorCat.value = err;
      });

    return {
      meals,
      loading,
      error,
      categories,
      loadingCat,
      errorCat,
    };
  },
};
</script>
