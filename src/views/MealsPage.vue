<template>
  <FilterTags
    :initial-filter-tags="selectedFilterTags"
    @on-delete="onDeleteFromFilters"
  ></FilterTags>
  <FilterPanel
    :ingredients-options="ingredientsOptions"
    :cat-options="catOptions"
    v-model:initial-category="selectedCategory"
    v-model:initial-ingredients-options="selectedIngredients"
    @on-filter="onFilter"
  ></FilterPanel>
  <LoadingContent v-if="loading" />
  <ListFood v-else title-list="Meals" :is-latest-meals="false"></ListFood>
</template>
<script>
import ListFood from "../components/ListFood.vue";
import FilterTags from "../components/FilterTags.vue";
import FilterPanel from "../components/FilterPanel.vue";
import { FilterType } from "@/const/filterType";
import LoadingContent from "../components/general/LoadingContent.vue";
import { watch, ref, toRaw, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { parseQueryStringToFilters } from "../helpers/filters";
import { foodApi } from "../api/index.js";
import { useStore } from "vuex";
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
    const meals = ref(null);
    const error = ref(null);
    const catOptions = ref([]);
    const ingredientsOptions = ref([]);
    const selectedCategory = ref("");
    const selectedIngredients = ref([]);
    const selectedFilterTags = ref([]);
    let filters = parseQueryStringToFilters(route.query);
    const loading = computed(() => store.state.meals.loading);
    //getting filter's options
    const fetchFiltersOptions = async () => {
      try {
        const catList = await foodApi.categories.get.listCategories();
        if (catList.ok && catList.data?.length > 0) {
          catList.data.forEach((cat) => catOptions.value.push(cat.strCategory));
        } else if (!catList.ok) {
          catOptions.value.push("can't load categories");
        }
      } catch (err) {
        catOptions.value.push("can't load categories");
      }
      const ingredientList = await foodApi.ingredients.get.ingredients();
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

    // press on filter button
    const onFilter = (category, checkedIngredients) => {
      let routeQuery = Object.assign({}, route.query);
      console.log(category);
      console.log(checkedIngredients);
      if (category && category != "") {
        routeQuery[[FilterType.CATEGORY]] = category;
      } else {
        delete routeQuery[[FilterType.CATEGORY]];
      }

      if (checkedIngredients != "")
        routeQuery[[FilterType.INGREDIENTS]] = checkedIngredients.join(",");
      else delete routeQuery[[FilterType.INGREDIENTS]];

      router.push({ name: "meal", query: routeQuery });
    };

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
        updateSelectedFilters(filters);
        updateSelectedFilterTags(filters);
        store.dispatch("meals/getFilteringMeals", filters);
      }
    );
    //get and set initial info and filters
    onMounted(() => {
      fetchFiltersOptions();
      store.dispatch("meals/getFilteringMeals", filters);
      updateSelectedFilters(filters);
      updateSelectedFilterTags(filters);
    });

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
      onFilter,
      onDeleteFromFilters,
    };
  },
};
</script>

<style></style>
