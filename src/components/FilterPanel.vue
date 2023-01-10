<template>
  <section class="filter-panel">
    <div class="filter-panel__toggle-button-wrapper">
      <ActionButton
        class="action-button--theme-light action-button--filter-icon filter-panel__action-button"
        @click="onToggleFilterPanelClass"
      >
        {{ showFilterPanel ? "Hide filters" : "Open filters" }}
      </ActionButton>
    </div>

    <Transition name="fade">
      <div v-if="showFilterPanel" class="filter-panel__box">
        <SelectContainer
          :options="catOptions"
          v-model="category"
          :filterable="true"
          placeholder="Select category"
          :multiple="false"
          title="Category"
        ></SelectContainer>

        <SelectContainer
          :options="ingredientsOptions"
          v-model="checkedIngredients"
          :filterable="true"
          placeholder="Select ingredients"
          :multiple="true"
          title="Ingredients"
        ></SelectContainer>

        <div class="filter-panel__button-wrapper">
          <span class="filter-panel__fix-span">&nbsp;</span>
          <ActionButton class="action-button--theme-dark" @click="onFilter"
            >Filter
          </ActionButton>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import ActionButton from "@/components/general/ActionButton.vue";
import SelectContainer from "@/components/general/SelectContainer.vue";
import {
  SET_SELECTED_CATEGORY,
  SET_SELECTED_INGREDIENTS,
} from "@/store/storeConstants";
export default {
  name: "FilterPanel",
  components: {
    ActionButton,
    SelectContainer,
  },

  emits: ["onFilter"],
  setup(props, { emit }) {
    const store = useStore();
    let showFilterPanel = ref(false);
    let activeClass = "filter-panel-box--active";

    const ingredientsOptions = computed(
      () => store.state.filters.ingredientsOptions
    );

    const catOptions = computed(() => store.state.filters.categoryOptions);

    const checkedIngredients = computed({
      get() {
        return store.state.filters.selectedFilters.ingredients;
      },
      set(value) {
        store.commit(`filters/${SET_SELECTED_INGREDIENTS}`, value);
      },
    });

    const category = computed({
      get() {
        return store.state.filters.selectedFilters.category;
      },
      set(value) {
        store.commit(`filters/${SET_SELECTED_CATEGORY}`, value);
      },
    });

    const onToggleFilterPanelClass = () => {
      showFilterPanel.value = !showFilterPanel.value;
    };
    const onFilter = () => {
      emit("onFilter", category.value, checkedIngredients.value);
    };

    return {
      category,
      checkedIngredients,
      catOptions,
      ingredientsOptions,
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
  &__action-button {
    width: 150px;
  }
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

@media only screen and (max-width: $mediaMinWidth) {
  .filter-panel-box {
    flex-direction: column;
  }
}
</style>
