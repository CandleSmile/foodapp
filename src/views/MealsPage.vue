<template>
  <FilterTags :initial-filter-tags="selectedFilterTags"></FilterTags>
  <FilterPanel
    :ingredients-options="ingredientsOptions"
    :cat-options="catOptions"
    :initial-category="selectedCategory"
    :initial-ingredients-options="selectedIngredients"
  ></FilterPanel>
  <Listfood
    title-list="Products"
    :meals="meals"
    :loading="loading"
    :error="error"
  ></Listfood>
</template>
<script>
import Listfood from "../components/Listfood.vue";
import FilterTags from "../components/FilterTags.vue";
import FilterPanel from "../components/FilterPanel.vue";
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
  },

  setup() {
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
    const fetchData = (filtersFromQuery) => {
      loading.value = true;
      foodApi.food.get
        .foodByFilters(filtersFromQuery)
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
    };

    //getting filter's options
    const fetchFiltersOptions = () => {
      foodApi.category.get.listCategories().then((catList) => {
        if (catList.ok && catList.data?.length > 0) {
          catList.data.forEach((cat) => catOptions.value.push(cat.strCategory));
        }
      });

      foodApi.ingredients.get.ingredientsList().then((ingredientList) => {
        if (ingredientList.ok & (ingredientList.data?.length > 0)) {
          ingredientList.data.forEach((ing) =>
            ingredientsOptions.value.push(ing.strIngredient)
          );
        }
      });
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

    //get and set initial info and filters
    fetchFiltersOptions();
    fetchData(filters);
    updateSelectedFilters(filters);
    updateSelectedFilterTags(filters);

    //get and set info and filters after changes in url
    watch(
      () => route.query,
      (newValue) => {
        filters = parseQueryStringToFilters(newValue);
        fetchData(filters);
        updateSelectedFilters(filters);
        updateSelectedFilterTags(filters);
      }
    );

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
