<template>
  <button :disabled="disabled" class="app-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  emits: ["click"],
  props: {
    title: String,
    disabled: Boolean,
  },
  setup() {},
};
</script>

<style lang="scss">
.app-button {
  font-size: 0.8rem;
  padding: 6px;
  width: 100px;

  &:hover {
    border: 1px solid $filter-button-border;
    cursor: pointer;
  }

  &--theme-light {
    border: 1px solid $filter-button-background;
    border-radius: 4px;
    background: #fff;
    color: $filter-panel-toggle-button-color;
  }

  &--theme-dark {
    background: $filter-button-background;
    width: 100px;
    border-radius: 4px;
    border: 1px solid rgb(241, 241, 241);
    box-shadow: 0px 2px 8px 0px rgba(153, 153, 153, 0.2);
    color: $filter-button-text;
  }

  &--filter-icon {
    position: relative;
    &::after {
      content: "\21C5";
      right: 0;
      position: absolute;
      padding-right: 5px;
    }
  }
}
</style>
