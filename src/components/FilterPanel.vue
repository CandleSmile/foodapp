<template>
  <section class="filter-panel">
    <div class="filter-panel-toggle-button-wrapper">
      <button
        class="filter-panel-toggle-button"
        @click="toggleFilterPanelClass"
      >
        {{ showFilterPanel ? "Hide filters" : "Open filters" }}
      </button>
    </div>

    <Transition name="fade">
      <div v-if="showFilterPanel" class="filter-panel-box">
        <div class="filter-panel-box__category">
          <span class="filter-panel-box__cat-title">Category</span>

          <v-select
            :options="catOptions"
            v-model="category"
            :filterable="true"
            placeholder="Select category"
            :clearable="true"
            :close-on-select="true"
            class="custom-select"
          ></v-select>
        </div>
        <div class="filter-panel-box__ingredients">
          <span class="filter-panel-box__ingred-title">Ingredients</span>
          <v-select
            :options="ingredientsOptions"
            v-model="checkedIngredients"
            :filterable="true"
            placeholder="Select ingredients"
            :clearable="true"
            :multiple="true"
            :close-on-select="true"
            class="custom-select"
          ></v-select>
        </div>
        <div class="filter-panel-box__button-wrapper">
          <span class="filter-panel-box__fix-span">&nbsp;</span>
          <input
            type="button"
            @click="filter"
            class="filter-panel-box__button"
            value="Filter"
          />
        </div>
      </div>
    </Transition>
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
    ingredientsOptions: Array,
    catOptions: Array,
    initialCategory: String,
    initialIngredientsOptions: Array,
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
    let checkedIngredients = ref(props.initialIngredientsOptions);
    let category = ref(props.initialCategory);
    let showFilterPanel = ref(false);
    let activeClass = "filter-panel-box--active";

    const toggleFilterPanelClass = () => {
      console.log("FSA");
      showFilterPanel.value = !showFilterPanel.value;
    };
    // press on filter button
    const filter = () => {
      let routeQuery = Object.assign({}, route.query);

      if (category.value && category.value != "") {
        routeQuery[[FilterType.CATEGORY]] = category.value;
      } else {
        delete routeQuery[[FilterType.CATEGORY]];
      }

      if (checkedIngredients.value != "")
        routeQuery[[FilterType.INGREDIENTS]] =
          checkedIngredients.value.join(",");
      else delete routeQuery[[FilterType.INGREDIENTS]];

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
        checkedIngredients.value = first;
      }
    );

    return {
      category,
      checkedIngredients,
      showFilterPanel,
      activeClass,
      toggleFilterPanelClass,
      filter,
    };
  },
};
</script>

<style lang="scss">
.filter-panel-toggle-button-wrapper {
  display: flex;
  justify-content: flex-start;
  padding: 5px 0 15px;
}
.filter-panel-toggle-button {
  border: 1px solid $filter-button-background;
  width: 150px;
  border-radius: 4px;
  background: #fff;
  font-size: 0.8rem;
  padding: 6px;
  color: $filter-panel-toggle-button-color;
  text-align: left;
  position: relative;

  &::after {
    content: "\21C5";
    right: 0;
    position: absolute;
    padding-right: 5px;
  }
}
.filter-panel-box {
  // display: none;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: 10px;
  flex-wrap: wrap;
  &--active {
    display: flex;
  }
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
  &__button-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  &__fix-span {
    font-size: 0.6em;
  }
  &__button {
    background: $filter-button-background;
    width: 100px;
    border-radius: 4px;
    border: 1px solid rgb(241, 241, 241);
    box-shadow: 0px 2px 8px 0px rgba(153, 153, 153, 0.2);
    font-size: 0.8rem;
    padding: 6px;
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

//transition  toggle filter panel
.fade-enter-active {
  transition: opacity 0.3s ease;
}
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media only screen and (max-width: 480px) {
  .filter-panel-box {
    flex-direction: column;
  }
}
</style>
