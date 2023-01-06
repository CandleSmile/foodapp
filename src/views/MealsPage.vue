<template>
  <FilterTags :initial-filter-tags="selectedFilterTags"></FilterTags>
  <FilterPanel
    :ingredients-options="ingredientsOptions"
    :cat-options="catOptions"
    v-model:initial-category="selectedCategory"
    v-model:initial-ingredients-options="selectedIngredients"
  ></FilterPanel>
  <LoadingContent v-if="loading" />
  <Listfood v-else title-list="Meals" :meals="meals" :error="error"></Listfood>
</template>
<script>
import Listfood from "../components/Listfood.vue";
import FilterTags from "../components/FilterTags.vue";
import FilterPanel from "../components/FilterPanel.vue";
import LoadingContent from "../components/general/LoadingContent.vue";
import { watch, ref, toRaw } from "vue";
import { useRoute } from "vue-router";
import { parseQueryStringToFilters } from "../helpers/filters";
import { foodApi } from "../api/index.js";
import { FilterType } from "@/const/filterType";
export default {
  name: "MealsPage",
  components: {
    Listfood,
    FilterTags,
    FilterPanel,
    LoadingContent,
  },

  async setup() {
    const route = useRoute();

    const meals = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const catOptions = ref([]);
    const ingredientsOptions = ref([]);
    const selectedCategory = ref("");
    const selectedIngredients = ref([]);
    const selectedFilterTags = ref([]);
    let filters = parseQueryStringToFilters(route.query);

    //getting data of meals by parsed filters
    const fetchData = async (filtersFromQuery) => {
      loading.value = true;
      try {
        const info = await foodApi.food.get.foodByFilters(filtersFromQuery);
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
    };

    //getting filter's options
    const fetchFiltersOptions = async () => {
      try {
        const catList = await foodApi.category.get.listCategories();
        if (catList.ok && catList.data?.length > 0) {
          catList.data.forEach((cat) => catOptions.value.push(cat.strCategory));
        } else if (!catList.ok) {
          catOptions.value.push("can't load categories");
        }
      } catch (err) {
        catOptions.value.push("can't load categories");
      }
      const ingredientList = await foodApi.ingredients.get.ingredientsList();
      try {
        if (ingredientList.ok & (ingredientList.data?.length > 0)) {
          ingredientList.data.forEach((ing) =>
            ingredientsOptions.value.push(ing.strIngredient)
          );
        } else if (!ingredientList.ok) {
          ingredientsOptions.value.push("can't load ingredients");
        }
      } catch (err) {
        ingredientsOptions.value.push("can't load ingredients");
      }
    };

    //update selected filters with parsed filters
    const updateSelectedFilters = (filtersFromQuery) => {
      selectedCategory.value = toRaw(filtersFromQuery[[FilterType.CATEGORY]]);
      selectedIngredients.value =
        filtersFromQuery[[FilterType.INGREDIENTS]] &&
        filtersFromQuery[[FilterType.INGREDIENTS]] != ""
          ? toRaw(filtersFromQuery[[FilterType.INGREDIENTS]]).split(",")
          : [];
    };

    //update selectedFilterTages with parsed filters
    const updateSelectedFilterTags = (filtersFromQuery) => {
      selectedFilterTags.value = [];
      for (let key in filters) {
        if (key === FilterType.INGREDIENTS && filtersFromQuery[key] != "") {
          const ingredientsArr = filtersFromQuery[key].split(",");
          ingredientsArr.forEach((ing) =>
            selectedFilterTags.value.push({
              type: FilterType.INGREDIENTS,
              val: ing,
            })
          );
        } else if (filtersFromQuery[key] != "") {
          selectedFilterTags.value.push({
            type: key,
            val: filtersFromQuery[key],
          });
        }
      }
    };
    watch(
      () => route.query,
      (newValue) => {
        filters = parseQueryStringToFilters(newValue);
        updateSelectedFilters(filters);
        updateSelectedFilterTags(filters);
        fetchData(filters);
      }
    );
    //get and set initial info and filters
    await fetchFiltersOptions();
    await fetchData(filters);
    updateSelectedFilters(filters);
    updateSelectedFilterTags(filters);

    //get and set info and filters after changes in url

    return {
      meals,
      loading,
      error,
      catOptions,
      ingredientsOptions,
      selectedCategory,
      selectedIngredients,
      selectedFilterTags,
    };
  },
};
</script>

<style></style>
