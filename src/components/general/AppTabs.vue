<template>
  <div class="tabs">
    <ul class="tabs__header">
      <li
        v-for="(tab, index) in state.tabs"
        :key="tab.props.title"
        @click="selectTab(index)"
        class="tabs__header-item"
        :class="{
          'tabs__header-item--selected': index == state.selectedIndex,
        }"
      >
        {{ tab.props.title }}
      </li>
    </ul>

    <slot></slot>
  </div>
</template>
<script setup>
import { onMounted, onBeforeMount, reactive, provide, useSlots } from "vue";
const slots = useSlots();
const state = reactive({
  selectedIndex: 0,
  tabs: [],
  count: 0,
});
provide("TabsProvider", state);
const selectTab = (i) => {
  state.selectedIndex = i;
};
onBeforeMount(() => {
  if (slots.default) {
    state.tabs = slots
      .default()
      .filter((child) => child.type.__name === "AppTab");
  }
});
onMounted(() => {
  selectTab(0);
});
</script>
<style lang="scss">
.tabs {
  color: #000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 800px;
  border-radius: 10px;
  min-height: 400px;
  &__header {
    display: flex;
    flex-direction: row;
    list-style: none;
    gap: 5px;
    padding: 0;
    &-item {
      padding: 5px 10px;
      cursor: pointer;
      background-color: $secondary-light-color;
      color: $secondary-dark-color;
      box-shadow: 0px 3px 3px 0px rgb(137 110 105 / 17%);
      border: 1px solid rgba(137, 110, 105, 0.17);
      border-radius: 5px;
      &--selected {
        color: $primary-light-color;
        font-weight: bold;
      }
    }
  }
}
</style>
