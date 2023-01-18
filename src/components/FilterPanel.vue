<template>
  <section class="filter-panel">
    <div class="filter-panel__toggle-button-wrapper">
      <action-button
        class="action-button--theme-light action-button--filter-icon filter-panel__action-button"
        @click="onToggleFilterPanelClass"
      >
        {{ showFilterPanel ? "Hide filters" : "Open filters" }}
      </action-button>
    </div>

    <Transition name="fade">
      <div v-if="showFilterPanel" class="filter-panel__box">
        <SelectContainer
          :options="catOptions"
          :modelValue="category"
          :filterable="true"
          placeholder="Select category"
          :multiple="false"
          @update:modelValue="(newValue) => $emit('updateCategory', newValue)"
          title="Category"
          id="catFilter"
        ></SelectContainer>

        <SelectContainer
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
        ></SelectContainer>

        <div class="filter-panel__button-wrapper">
          <span class="filter-panel__fix-span">&nbsp;</span>
          <action-button class="action-button--theme-dark" @click="onFilter"
            >Filter
          </action-button>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script>
import { ref } from "vue";
import ActionButton from "@/components/general/ActionButton.vue";
import SelectContainer from "@/components/general/SelectContainer.vue";

export default {
  name: "FilterPanel",
  components: {
    ActionButton,
    SelectContainer,
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

@media only screen and (max-width: $mediaMobile) {
  .filter-panel-box {
    flex-direction: column;
  }
}
</style>
