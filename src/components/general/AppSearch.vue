<template>
  <div class="app-search">
    <input
      type="text"
      :placeholder="placeholder"
      class="app-search__input"
      :value="query"
      @input="$emit('updateQuery', $event.target.value)"
      @keyup.enter="$emit('search', $event.target.value)"
    />
    <span class="app-search__icon" @click="$emit('search', query)"></span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
defineEmits(["search", "updateQuery"]);
defineProps({
  placeholder: String,
  query: String,
});
</script>

<style scoped lang="scss">
.app-search {
  position: relative;

  &__input {
    height: 25px;
    background: $search-background-color;
    border: 1px solid $search-border-color;
    border-radius: 50px;
    padding-left: 35px;
    padding-right: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    font-size: 14px;
    color: $search-text-color;
    //fixing probleams with autocomplete styles
    -webkit-background-clip: text;

    &::placeholder {
      color: $search-placeholder-color;
    }

    &:focus {
      outline: none;

      &::placeholder {
        opacity: 0;
      }
    }
  }

  &__icon {
    position: absolute;
    height: 12px;
    width: 12px;
    background: transparent;
    border: 3px solid $search-icon-color;
    left: 12px;
    top: 9px;
    border-radius: 100%;

    &::after {
      content: "";
      position: absolute;
      background: $search-icon-color;
      height: 6px;
      width: 3px;
      bottom: -5px;
      right: -3px;
      transform: rotate(-45deg);
    }
  }
}
</style>
