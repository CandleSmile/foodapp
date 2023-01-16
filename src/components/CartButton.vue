<template>
  <div class="cart-button">
    <action-button class="cart-button-btn" @click="onViewCart"
      ><i class="cart-button-btn-icon"></i
    ></action-button>
    <div class="cart-button-count">{{ countItems }}</div>
  </div>
</template>

<script setup>
import ActionButton from "@/components/general/ActionButton.vue";
import { useRouter } from "vue-router";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { CART_COUNT } from "@/store/storeConstants";

const { useGetters } = createNamespacedHelpers("cart");
const { [CART_COUNT]: countItems } = useGetters([CART_COUNT]);
const router = useRouter();
const onViewCart = () => {
  router.push({ name: "cart" });
};
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
