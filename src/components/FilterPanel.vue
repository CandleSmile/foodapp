<template>
  <section class="filter-panel">
    <div class="filter-panel__toggle-button-wrapper">
      <AppButton
        class="app-button--theme-light app-button--filter-icon filter-panel__app-button"
        @click="onToggleFilterPanelClass"
      >
        {{ showFilterPanel ? "Hide filters" : "Open filters" }}
      </AppButton>
    </div>

    <Transition name="fade">
      <div v-if="showFilterPanel" class="filter-panel__box">
        <AppSelect
          :options="catOptions"
          :modelValue="category"
          :filterable="true"
          placeholder="Select category"
          :multiple="false"
          @update:modelValue="(newValue) => $emit('updateCategory', newValue)"
          title="Category"
          id="catFilter"
        />

        <AppSelect
          :options="ingredientsOptions"
          :modelValue="checkedIngredients"
          :filterable="true"
          placeholder="Select ingredients"
          :multiple="true"
          title="Ingredients"
          @update:modelValue="
            (newValue) => $emit('updateIngredients', newValue)
          "
          id="ingFilter"
        />

        <div class="filter-panel__button-wrapper">
          <span class="filter-panel__fix-span">&nbsp;</span>
          <AppButton class="app-button--theme-dark" @click="onFilter"
            >Filter
          </AppButton>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script>
import { ref } from "vue";
import AppButton from "@/components/general/AppButton.vue";
import AppSelect from "@/components/general/AppSelect.vue";

export default {
  name: "FilterPanel",
  components: {
    AppButton,
    AppSelect,
  },
  props: {
    ingredientsOptions: Array,
    catOptions: Array,
    checkedIngredients: Array,
    category: String,
  },
  emits: ["filter", "updateCategory", "updateIngredients"],
  setup(props, { emit }) {
    let showFilterPanel = ref(false);
    let activeClass = "filter-panel-box--active";

    const onToggleFilterPanelClass = () => {
      showFilterPanel.value = !showFilterPanel.value;
    };
    const onFilter = () => {
      emit("filter", props.category, props.checkedIngredients);
    };

    return {
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

  &__app-button {
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

@media only screen and (max-width: $mediaMobile) {
  .filter-panel-box {
    flex-direction: column;
  }
}
</style>
