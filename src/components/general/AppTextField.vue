<template>
  <div
    class="app-text-field"
    :class="{ 'app-text-field--error': errors.length }"
  >
    <input
      class="app-text-field__input"
      :placeholder="placeholder"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <div
      class="app-text-field__error"
      v-for="error of errors"
      :key="error.$uid"
    >
      {{ error.$message }}
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
defineProps(["placeholder", "modelValue", "errors"]);
defineEmits(["update:modelValue"]);
</script>
<style lang="scss">
.app-text-field {
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

  &__error {
    color: $primary-dark-color;
    font-size: 0.7rem;
  }

  &--error {
    .app-text-field {
      &__input {
        border-color: $input-field-border-error-color;
      }
    }
  }
}
</style>
