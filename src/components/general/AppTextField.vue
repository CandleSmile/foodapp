<template>
  <input
    class="app-text-field__input"
    :class="{ 'app-text-field-input--error': errors.length }"
    :placeholder="placeholder"
    :type="typeOfInput"
    :value="modelValue"
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
    autocomplete="on"
  />

  <div class="app-text-field__error" v-for="error of errors" :key="error.$uid">
    {{ error.$message }}
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps([
  "placeholder",
  "modelValue",
  "errors",
  "isPassword",
]);
defineEmits(["update:modelValue"]);
const typeOfInput = props.isPassword ? "password" : "text";
</script>
<style lang="scss">
.app-text-field {
  &__input {
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

  &__error {
    color: $primary-dark-color;
    font-size: 0.7rem;
  }
}
</style>
