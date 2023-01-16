<template>
  <h1>Your Cart Items</h1>
  <div class="cart">
    <ul class="cart-list">
      <li class="cart-list__item cart-list__item--title">
        <div class="cart-list__item-col cart-list__item-col--first">Meal</div>
        <div class="cart-list__item-col">Quantity</div>
        <div class="cart-list__item-col">Price/unit</div>
      </li>
      <li class="cart-list__item" v-for="meal in mealsInCart" :key="meal.id">
        <div class="cart-list__item-col cart-list__item-col--first">
          {{ meal.title }}
        </div>
        <div class="cart-list__item-col">{{ meal.quantity }}</div>
        <div class="cart-list__item-col">{{ meal.price }}</div>
      </li>
      <li class="cart-list__item cart-list__item--total">
        <div class="cart-list__item-col cart-list__item-col--first">
          Totals:
        </div>
        <div class="cart-list__item-col">{{ countItems }}</div>
        <div class="cart-list__item-col">{{ totalPrice }}</div>
      </li>
    </ul>

    <action-button class="cart-buy-button" @click="buy">Buy</action-button>
  </div>
</template>
<script setup>
import ActionButton from "@/components/general/ActionButton.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import {
  CART_COUNT,
  CART_TOTAL_PRICE,
  MEALS_IN_CART,
} from "@/store/storeConstants";

const { useGetters } = createNamespacedHelpers("cart");
const {
  [CART_COUNT]: countItems,
  [CART_TOTAL_PRICE]: totalPrice,
  [MEALS_IN_CART]: mealsInCart,
} = useGetters([CART_COUNT, CART_TOTAL_PRICE, MEALS_IN_CART]);
const buy = () => {
  alert("Buy!!!");
};
</script>
<style lang="scss">
.cart {
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  &-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    &__item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &-col {
        justify-content: flex-end;
        display: flex;
        flex-basis: 33%;
        &--first {
          justify-content: flex-start;
          text-align: left;
        }
      }

      &--title,
      &--total {
        font-weight: 700;
      }
    }
  }
}
</style>
