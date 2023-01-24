<template>
  <div class="cart-button">
    <AppButton class="cart-button-btn" @click="$emit('viewCart')"
      ><i class="cart-button-btn-icon"></i
    ></AppButton>
    <div class="cart-button-count" v-if="countItems > 0">{{ countItems }}</div>
  </div>
</template>

<script setup>
import AppButton from "@/components/general/AppButton.vue";
import { defineProps, defineEmits } from "vue";

defineProps({ countItems: Number });
defineEmits(["viewCart"]);
</script>
<style lang="scss">
.cart-button {
  display: flex;
  flex-direction: column;
  position: relative;

  &-btn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0;
    background: none;

    &-icon {
      content: "";
      background: url("@/assets/images/viewCart.png");
      background-size: 30px 30px;
      width: 30px;
      height: 30px;
    }

    &:hover {
      cursor: pointer;
      border: none;
    }
  }

  &-count {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 14px;
    height: 14px;
    top: 1px;
    right: -5px;
    color: #fff;
    font-size: 9px;
    background-color: $primary-light-color;
    border-radius: 14px;
  }
}
</style>
