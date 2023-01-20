<template>
  <input
    class="app-text-field-input"
    :class="{ 'app-text-field-input--error': errors.length }"
    :placeholder="placeholder"
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />

  <div class="app-text-field-error" v-for="error of errors" :key="error.$uid">
    {{ error.$message }}
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
defineProps(["placeholder", "modelValue", "errors"]);
defineEmits(["update:modelValue"]);
</script>
<style lang="scss">
.app-text-field {
  &-input {
    font-size: 0.8rem;
    padding: 6px;
    width: 100px;
    border-radius: 4px;
    border: 1px solid $input-field-border-color;
    outline: none;
    color: $input-field-color;
    margin-bottom: 5px;
    &--error {
      border-color: $input-field-border-error-color;
    }
  }

  &-error {
    color: $primary-dark-color;
    font-size: 0.7rem;
  }
}
</style>
