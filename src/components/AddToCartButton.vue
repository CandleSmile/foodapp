<template>
  <action-button class="add-to-cart-btn" @click="$emit('addToCart')"
    ><i class="add-to-cart-btn__icon"></i>
  </action-button>
</template>
<script setup>
import ActionButton from "@/components/general/ActionButton.vue";
import { defineEmits } from "vue";
defineEmits(["addToCart"]);
</script>
<style lang="scss">
.add-to-cart-btn {
  background-color: $add-to-cart-background-color;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  &__icon {
    content: "";
    background: url("@/assets/images/addToCartWhite.png");
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
  }
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  &--in-cart {
    background-color: $in-cart-background-color;
  }
}
</style>
