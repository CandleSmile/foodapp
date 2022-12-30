<template>
  <FilterTags :initial-filter-tags="selectedFilterTages"></FilterTags>
  <FilterPanel
    :ingridients-options="ingridientsOptions"
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
import FoodApi from "../api/food.js";
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
    const ingridientsOptions = ref([]);
    const selectedCategory = ref("");
    const selectedIngredients = ref([]);
    const selectedFilterTages = ref([]);
    let filters = parseQueryStringToFilters(route.query);

    //getting data of meals by parsed filters
    const fetchData = (filtersFromQuery) => {
      loading.value = true;
      FoodApi.getFoodByFilters(filtersFromQuery)
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
      FoodApi.getListCategories().then((catList) => {
        if (catList.ok && catList.data?.length > 0) {
          catList.data.forEach((cat) => catOptions.value.push(cat.strCategory));
        }
      });

      FoodApi.getIngridientsList().then((ingridientList) => {
        if (ingridientList.ok & (ingridientList.data?.length > 0)) {
          ingridientList.data.forEach((ing) =>
            ingridientsOptions.value.push(ing.strIngredient)
          );
        }
      });
    };

    //update selected filters with parsed filters
    const updateSelectedFilters = (filtersFromQuery) => {
      selectedCategory.value = toRaw(filtersFromQuery[[FilterType.CATEGORY]]);
      selectedIngredients.value =
        filtersFromQuery[[FilterType.INGRIDIENTS]] != ""
          ? toRaw(filtersFromQuery[[FilterType.INGRIDIENTS]]).split(",")
          : [];
    };

    //update selectedFilterTages with parsed filters
    const updateSelectedFilterTags = (filtersFromQuery) => {
      selectedFilterTages.value = [];
      for (let key in filters) {
        if (key === FilterType.INGRIDIENTS && filtersFromQuery[key] != "") {
          const ingridientsArr = filtersFromQuery[key].split(",");
          ingridientsArr.forEach((ing) =>
            selectedFilterTages.value.push({
              type: FilterType.INGRIDIENTS,
              val: ing,
            })
          );
        } else if (filtersFromQuery[key] != "") {
          selectedFilterTages.value.push({
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
      (newVaue) => {
        filters = parseQueryStringToFilters(newVaue);
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
      ingridientsOptions,
      selectedCategory,
      selectedIngredients,
      selectedFilterTages,
    };
  },
};
</script>

<style></style>
