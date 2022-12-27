<template>
  <section class="filter-panel">
    <fieldset class="filter-panel-box">
      <legend class="filter-panel-box__legend">Choose your filters:</legend>
      <span class="filter-panel-box__cat-title">Category</span>
      <vue-select
        class="filter-panel-box__cat-select"
        @selected="onSelected"
        placeholder="Select category"
        searchable="true"
        v-model="category"
        :options="catOptions"
        :maxHeight="200"
        close-on-select
      ></vue-select>
      <span>Ingridients</span>
      <div v-for="ingridient in ingridientsOptions" :key="ingridient.id">
        <input
          type="checkbox"
          id="ing{{ ingridient.id }}"
          name="ingridients"
          value="{{ ingridient.id }}"
        />
        <label for="ing{{ ingridient.id }}">{{ ingridient.val }}</label>
      </div>

      <input type="button" @click="filter" value="Filter" />
    </fieldset>
  </section>
</template>
<script>
import VueSelect from "vue-next-select";
import "vue-next-select/dist/index.min.css";
import { ref, reactive, onMounted, toRaw, watch } from "vue";
import FoodApi from "../api/food.js";
import { filters } from "@/filters";
import { FilterType } from "@/const/filterType";

import { useRouter, useRoute } from "vue-router";

export default {
  name: "FilterPanel",
  components: {
    VueSelect,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const catOptions = reactive([]);
    const ingridientsOptions = reactive([]);
    const checkedIngridients = ref([]);
    let category = ref("");
    let tempFilters = {};
    const changeTempFilters = () => {
      tempFilters = toRaw(filters);

      const initialCat = tempFilters[[FilterType.CATEGORY]][0];
      //  const initialIngridients = tempFilters[[FilterType.INGRIDIENTS]]; to do
      category.value =
        tempFilters[[FilterType.CATEGORY]].length > 0 ? initialCat : "";
    };

    const onSelected = (opt) => {
      category.value = opt;
      tempFilters[[FilterType.CATEGORY]][0] = opt;
    };

    const filter = () => {
      let routeQuery = Object.assign({}, route.query);
      if (tempFilters[[FilterType.CATEGORY]].length > 0) {
        routeQuery[[FilterType.CATEGORY]] =
          tempFilters[[FilterType.CATEGORY]][0];
      }
      router.push({ name: "meal", query: routeQuery });
    };

    onMounted(async () => {
      const catList = await FoodApi.getListCategories();
      if (catList.ok && catList.data?.length > 0) {
        catList.data.forEach((cat) => catOptions.push(cat.strCategory));
      }

      const ingridientList = await FoodApi.getIngridientsList();
      if (ingridientList.ok && ingridientList.data?.length > 0) {
        ingridientList.data.forEach((ing) =>
          ingridientsOptions.push({
            id: ing.idIngredient,
            val: ing.strIngredient,
          })
        );
      }

      changeTempFilters();
    });

    watch(filters, () => changeTempFilters());

    return {
      category,
      catOptions,
      ingridientsOptions,
      checkedIngridients,
      onSelected,
      filter,
    };
  },
};
</script>
<style>
.filter-panel-box__cat-select {
  margin: auto;
}
.filter-panel-box__cat-select .vue-dropdown-item.highlighted {
  background-color: #e8e8e8; /* не видет variables (разобраться)*/
}
</style>
