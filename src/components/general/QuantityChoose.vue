<template>
  <div class="quantity-choose">
    <div class="quantity-choose__wrapper">
      <button @click="onDecrement" class="quantity-choose__btn-minus">-</button>
      <input
        class="quantity-choose__quantity"
        type="text"
        :value="modelValue"
        @keypress="updateAfterCheck($event)"
        @input="$emit('update:modelValue', Number($event.target.value))"
      />
      <button @click="onIncrement" class="quantity-choose__btn-plus">+</button>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const updateAfterCheck = (ev) => {
  var charCode = ev.which ? ev.which : ev.keyCode;
  if (charCode >= 48 && charCode <= 57) {
    return true;
  } else {
    ev.preventDefault();
  }
};
const onDecrement = () => {
  if (props.modelValue > 0) emit("update:modelValue", props.modelValue - 1);
};
const onIncrement = () => {
  emit("update:modelValue", props.modelValue + 1);
};
</script>
<style scoped lang="scss">
.quantity-choose {
  display: flex;
  flex-direction: row;
  color: $secondary-dark-color;
  &__wrapper {
    display: flex;
    flex-direction: row;
    border: 1px solid $secondary-dark-color;
  }
  &__quantity {
    width: 50px;
    max-height: 20px;
    font-size: 14px;
    border: 0;
    text-align: center;
    border-right: 1px solid $secondary-dark-color;
    border-left: 1px solid $secondary-dark-color;
    &:focus {
      outline-width: 0;
    }
  }
  &__btn-minus,
  &__btn-plus {
    width: 26px;
    height: 20px;
    font-size: 15px;
    line-height: 0;
    border: 0;
    background-color: rgba($secondary-dark-color, 0.12);
  }
}
</style>
