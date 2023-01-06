<template>
  <LoadingContent v-if="loadingCat" />

  <ListCategories v-else :data="categories" :error="errorCat"></ListCategories>
  <LoadingContent v-if="loading" />
  <Listfood
    v-else
    title-list="Latest Meals"
    :meals="meals"
    :error="error"
  ></Listfood>
</template>

<script>
import Listfood from "../components/Listfood.vue";
import ListCategories from "../components/ListCategories.vue";
import LoadingContent from "../components/general/LoadingContent.vue";
import { foodApi } from "../api/index.js";
import { ref } from "vue";
export default {
  name: "HomePage",
  components: {
    Listfood,
    ListCategories,
    LoadingContent,
  },
  async setup() {
    let meals = ref(null);
    let loading = ref(true);
    let error = ref(null);

    let categories = ref(null);
    let loadingCat = ref(true);
    let errorCat = ref(null);

    try {
      const catInfo = await foodApi.category.get.allCategoriesWithImages();
      if (!catInfo.ok) {
        errorCat.value = catInfo.error?.message;
      } else {
        categories.value = catInfo.data ?? [];
      }
    } catch (err) {
      errorCat.value = err.message;
    } finally {
      loadingCat.value = false;
    }

    try {
      const info = await foodApi.food.get.initialFoods();
      if (!info.ok) {
        error.value = info.error?.message;
      } else {
        meals.value = info.data ?? [];
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }

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
