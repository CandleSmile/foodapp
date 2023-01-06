<template>
  <section class="filter-panel">
    <div class="filter-panel__toggle-button-wrapper">
      <ActionButton
        class="action-button action-button--theme-light action-button--theme-width150 action-button--theme-filter-icon"
        @on-click="onToggleFilterPanelClass"
      >
        {{ showFilterPanel ? "Hide filters" : "Open filters" }}
      </ActionButton>
    </div>

    <Transition name="fade">
      <div v-if="showFilterPanel" class="filter-panel__box">
        <CustomSelect
          :options="catOptions"
          v-model="category"
          :filterable="true"
          placeholder="Select category"
          :multiple="false"
          title="Category"
        ></CustomSelect>

        <CustomSelect
          :options="ingredientsOptions"
          v-model="checkedIngredients"
          :filterable="true"
          placeholder="Select ingredients"
          :multiple="true"
          title="Ingredients"
        ></CustomSelect>

        <div class="filter-panel__button-wrapper">
          <span class="filter-panel__fix-span">&nbsp;</span>
          <ActionButton
            class="action-button action-button--theme-dark"
            @on-click="onFilter"
            >Filter
          </ActionButton>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import ActionButton from "@/components/general/ActionButton.vue";
import CustomSelect from "@/components/general/CustomSelect.vue";

import "vue-select/dist/vue-select.css";
import { FilterType } from "@/const/filterType";

export default {
  name: "FilterPanel",
  components: {
    ActionButton,
    CustomSelect,
  },
  props: {
    ingredientsOptions: Array,
    catOptions: Array,
    initialCategory: String,
    initialIngredientsOptions: Array,
  },
  emits: ["update:initialIngredientsOptions", "update:initialCategory"],
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();

    let showFilterPanel = ref(false);
    let activeClass = "filter-panel-box--active";
    const checkedIngredients = computed({
      get() {
        return props.initialIngredientsOptions;
      },
      set(value) {
        emit("update:initialIngredientsOptions", value);
      },
    });

    const category = computed({
      get() {
        return props.initialCategory;
      },
      set(value) {
        emit("update:initialCategory", value);
      },
    });

    const onToggleFilterPanelClass = () => {
      showFilterPanel.value = !showFilterPanel.value;
    };

    // press on filter button
    const onFilter = () => {
      let routeQuery = Object.assign({}, route.query);
      console.log(category.value);
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

    return {
      category,
      checkedIngredients,
      showFilterPanel,
      activeClass,
      onToggleFilterPanelClass,
      onFilter,
    };
  },
};
</script>

<style lang="scss">
.filter-panel {
  display: flex;
  flex-direction: column;
  &__toggle-button-wrapper {
    display: flex;
    justify-content: flex-start;
    padding: 5px 0 15px;
  }

  &__box {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    align-items: flex-start;
    padding-bottom: 10px;
    flex-wrap: wrap;
    &--active {
      display: flex;
    }
  }
  &__button-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  &__fix-span {
    font-size: 0.6em;
  }
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
