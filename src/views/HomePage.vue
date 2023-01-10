<template>
  <LoadingContent v-if="loadingCat" />
  <ListCategories v-else></ListCategories>
  <LoadingContent v-if="loading" />
  <ListFood v-else title-list="Latest Meals" :is-latest-meals="true"></ListFood>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import ListFood from "../components/ListFood.vue";
import ListCategories from "../components/ListCategories.vue";
import LoadingContent from "../components/general/LoadingContent.vue";
import {
  GET_LATEST_MEAL_ACTION,
  GET_CATEGORIES_ACTION,
} from "@/store/storeConstants";
export default {
  name: "HomePage",
  components: {
    ListFood,
    ListCategories,
    LoadingContent,
  },
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.meals.loading);
    const loadingCat = computed(() => store.state.categories.loading);
    onMounted(() => {
      store.dispatch(`categories/${GET_CATEGORIES_ACTION}`);
      store.dispatch(`meals/${GET_LATEST_MEAL_ACTION}`);
    });

    return {
      loading,
      loadingCat,
    };
  },
};
</script>
