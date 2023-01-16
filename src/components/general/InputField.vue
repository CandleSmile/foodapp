<template>
  <div class="input-field" :class="{ 'input-field--error': errors.length }">
    <input
      class="input-field__input"
      :placeholder="placeholder"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <div class="input-field__errors" v-for="error of errors" :key="error.$uid">
      <div class="input-field__errors-error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
defineProps(["placeholder", "modelValue", "errors"]);
defineEmits(["update:modelValue"]);
</script>
<style lang="scss">
.input-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  &__input {
    font-size: 0.8rem;
    padding: 6px;
    width: 100px;
    border-radius: 4px;
    border: 1px solid $input-field-border-color;
    outline: none;
    color: $input-field-color;
  }
  &__errors {
    &-error-msg {
      color: $primary-dark-color;
      font-size: 0.7rem;
    }
  }
  &--error {
    .input-field {
      &__input {
        border-color: $input-field-border-error-color;
      }
    }
  }
}
</style>
