<template>
  <div class="app-select">
    <label class="app-select__title">{{ title }}</label>
    <v-select
      :options="options"
      v-model="vModel"
      :filterable="filterable"
      :placeholder="placeholder"
      :clearable="true"
      :multiple="multiple"
      :close-on-select="true"
      class="app-select__custom-select"
      :id="id"
    ></v-select>
  </div>
</template>
<script setup>
import vSelect from "vue-select";

import { defineEmits, defineProps, computed } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  title: String,
  options: Array,
  modelValue: [String, Object],
  filterable: Boolean,
  placeholder: String,
  multiple: Boolean,
  id: String,
});

const vModel = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<style lang="scss">
.app-select {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  &__title {
    font-size: 0.6em;
    color: $select-title;
  }

  &__custom-select {
    margin: auto;

    .vs__dropdown-toggle {
      border-color: $select-border;
    }

    .v-select {
      width: 200px;
      font-size: 12px;
    }

    .vs__selected-options {
      width: 150px;
    }

    .vs__search,
    .vs__search:focus,
    .vs__selected {
      font-size: 12px;
      color: $select-text;
    }

    .vs__clear,
    .vs__open-indicator {
      fill: $select-text;
    }

    .vs__dropdown-menu li {
      color: $select-text;
    }

    .vs__dropdown-option--highlight {
      background-color: $primary-light-color;
    }
  }
}
</style>
