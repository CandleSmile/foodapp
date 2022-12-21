<template>
  <div class="search-form header__search-form">
    <input
      type="text"
      :placeholder="placeholder"
      class="search-form__input"
      :id="id"
      v-model="query"
      v-on:keyup.enter="onSearch"
    />
    <span class="search-form__icon" v-on:click="onSearch"></span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, inject, watch } from "vue";
defineProps({
  id: String,
  placeholder: String,
});
const emit = defineEmits(["entersearch"]);
const query = ref("");

const onSearch = () => {
  emit("entersearch", query.value);
};
const clearSearchForm = inject("clearSearchForm");
watch(clearSearchForm, (newVaue) => {
  if (newVaue) {
    query.value = "";
  }
});
</script>

<style scoped lang="scss">
.header__search-form {
  align-self: center;
}
.search-form {
  position: relative;

  &__input {
    height: 25px;
    background: $search-background-color;
    border: 2px solid $search-border-color;
    border-radius: 50px;
    padding-left: 35px;
    padding-right: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    font-size: 14px;
    color: $search-text-color;
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
    &:after {
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
