<template>
  <section class="filter-panel">
    <div class="filter-panel-box">
      <div class="filter-panel-box__category">
        <span class="filter-panel-box__cat-title">Category</span>

        <v-select
          :options="catOptions"
          v-model="category"
          :filterable="true"
          placeholder="Select category"
          :clearable="true"
          :close-on-select="true"
        ></v-select>
      </div>
      <div class="filter-panel-box__ingredients">
        <span class="filter-panel-box__ingred-title">Ingredients</span>
        <v-select
          :options="ingridientsOptions"
          v-model="checkedIngridients"
          :filterable="true"
          placeholder="Select ingredients"
          :clearable="true"
          :multiple="true"
          :close-on-select="true"
        ></v-select>
      </div>
      <input
        type="button"
        @click="filter"
        class="filter-panel-box__button"
        value="Filter"
      />
    </div>
  </section>
</template>

<script>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import vSelect from "vue-select";

import "vue-select/dist/vue-select.css";
import { FilterType } from "@/const/filterType";

export default {
  name: "FilterPanel",
  components: {
    vSelect,
  },
  props: {
    ingridientsOptions: Array,
    catOptions: Array,
    initialCategory: String,
    initialIngredientsOptions: Array,
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
    let checkedIngridients = ref(props.initialIngredientsOptions);
    let category = ref(props.initialCategory);

    // press on filter button
    const filter = () => {
      let routeQuery = Object.assign({}, route.query);

      if (category.value && category.value != "") {
        routeQuery[[FilterType.CATEGORY]] = category.value;
      } else {
        delete routeQuery[[FilterType.CATEGORY]];
      }

      if (checkedIngridients.value != "")
        routeQuery[[FilterType.INGRIDIENTS]] =
          checkedIngridients.value.join(",");
      else delete routeQuery[[FilterType.INGRIDIENTS]];

      router.push({ name: "meal", query: routeQuery });
    };

    //to update category selects after deleting category filter in filter tags bar
    watch(
      () => props.initialCategory,
      (first) => {
        category.value = first;
      }
    );

    //to update ingredient selects after deleting ingredient filter in filter tags bar
    watch(
      () => props.initialIngredientsOptions,
      (first) => {
        checkedIngridients.value = first;
      }
    );

    return {
      category,
      checkedIngridients,
      filter,
    };
  },
};
</script>

<style lang="scss">
.filter-panel-box {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-end;
  padding-bottom: 10px;
  flex-wrap: wrap;
  &__category,
  &__ingredients {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  &__cat-title,
  &__ingred-title {
    font-size: 0.6em;
    color: $select-title;
  }
  &__cat-select,
  &__ingred-select {
    margin: auto;
  }
  &__button {
    background: $filter-button-background;
    width: 100px;
    border-radius: 4px;
    border: 1px solid rgb(241, 241, 241);
    box-shadow: 0px 2px 8px 0px rgba(153, 153, 153, 0.2);
    font-size: 0.8rem;
    padding: 4px;
    color: $filter-button-text;
    &:hover {
      border: 1px solid $filter-button-border;
    }
  }
}
.v-select {
  width: 200px;
  font-size: 12px;
}
.vs__selected-options {
  width: 150px;
}
.vs__search,
.vs__search:focus {
  font-size: 12px;
}
</style>
