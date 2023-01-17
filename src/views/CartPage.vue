<template>
  <article class="cart" v-if="mealsInCart.length > 0 || loading">
    <h1 class="cart-title">Your Cart Items</h1>
    <ul class="cart-list">
      <li class="cart-list__item cart-list__item--title">
        <div
          class="cart-list__item-col cart-list__item-col--first cart-list__item-col--45"
        >
          Meal
        </div>
        <div class="cart-list__item-col cart-list__item-col--25">Quantity</div>
        <div class="cart-list__item-col cart-list__item-col--25">
          Price/unit
        </div>
        <div class="cart-list__item-col cart-list__item-col--5">&nbsp;</div>
      </li>
      <li class="cart-list__item" v-for="meal in mealsInCart" :key="meal.id">
        <div
          class="cart-list__item-col cart-list__item-col--first cart-list__item-col--45"
        >
          {{ meal.title }}
        </div>
        <div class="cart-list__item-col cart-list__item-col--25">
          {{ meal.quantity }}
        </div>
        <div class="cart-list__item-col cart-list__item-col--25">
          {{ meal.price }}
        </div>
        <div class="cart-list__item-col cart-list__item-col--5">
          <span
            @click="deleteFromCart(meal)"
            class="cart-list__item-col-remove-from-cart"
          ></span>
        </div>
      </li>
      <li class="cart-list__item cart-list__item--total">
        <div
          class="cart-list__item-col cart-list__item-col--first cart-list__item-col--45"
        >
          Totals:
        </div>
        <div class="cart-list__item-col cart-list__item-col--25">
          {{ countItems }}
        </div>
        <div class="cart-list__item-col cart-list__item-col--25">
          {{ totalPrice }}
        </div>
        <div class="cart-list__item-col cart-list__item-col--5">&nbsp;</div>
      </li>
    </ul>
    <div class="cart-buttons">
      <action-button
        class="cart-buttons-purchase action-button--theme-light"
        @click="goToPurchase"
        :disabled="loading"
        >Continue purchase</action-button
      >
      <action-button
        class="cart-buttons-buy action-button--theme-dark"
        @click="buy"
        :disabled="loading"
        >Buy</action-button
      >
    </div>
    <LoadingContent v-if="loading">
      Your purchase is processing
    </LoadingContent>
  </article>
  <article v-else class="cart-empty">
    <h1 class="cart-empty-title">Your cart is empty now.</h1>
    <action-button
      @click="goToPurchase"
      class="cart-empty-start-button action-button--theme-dark"
      >Start purchase</action-button
    >
  </article>
  <article v-if="checkOutStatus != null" class="">
    <p>{{ checkOutStatus }}</p>
  </article>
</template>
<script setup>
import ActionButton from "@/components/general/ActionButton.vue";
import LoadingContent from "@/components/general/LoadingContent.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  CART_COUNT,
  CART_TOTAL_PRICE,
  MEALS_IN_CART,
  DELETE_FROM_CART_ACTION,
  BUY_ACTION,
  LOADING,
  CHECKOUT_STATUS,
  CLEAR_CHECKOUT_ACTION,
} from "@/store/storeConstants";
const router = useRouter();
const { useGetters, useActions } = createNamespacedHelpers("cart");
const {
  [CART_COUNT]: countItems,
  [CART_TOTAL_PRICE]: totalPrice,
  [MEALS_IN_CART]: mealsInCart,
  [LOADING]: loading,
  [CHECKOUT_STATUS]: checkOutStatus,
} = useGetters([
  CART_COUNT,
  CART_TOTAL_PRICE,
  MEALS_IN_CART,
  LOADING,
  CHECKOUT_STATUS,
]);
const {
  [DELETE_FROM_CART_ACTION]: deleteFromCart,
  [BUY_ACTION]: buy,
  [CLEAR_CHECKOUT_ACTION]: clearCheckout,
} = useActions([DELETE_FROM_CART_ACTION, BUY_ACTION, CLEAR_CHECKOUT_ACTION]);

const goToPurchase = () => {
  router.push({ name: "meal" });
};
onMounted(() => {
  clearCheckout();
});
</script>
<style lang="scss">
.cart {
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  &-title {
    font-size: 1.2em;
  }
  &-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    width: 400px;
    font-size: 12px;
    padding: 0;
    &__item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 10px 10px;
      &-col {
        justify-content: flex-end;
        display: flex;
        flex-basis: 33%;

        &--first {
          justify-content: flex-start;
          text-align: left;
        }
        &--25 {
          flex-basis: 25%;
        }
        &--45 {
          flex-basis: 45%;
        }
        &--5 {
          flex-basis: 5%;
        }
        &-remove-from-cart {
          display: inline-flex;
          width: 1rem;
          height: 1rem;
          position: relative;
          cursor: pointer;
          &::before,
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0.8rem;
            height: 0.11rem;
            background-color: $primary-dark-color;
            margin: -0.05rem 0 0 -0.2rem;
            transform: rotate(-45deg);
          }
          &::after {
            transform: rotate(45deg);
          }
        }
      }

      &--title {
        font-weight: 700;
        border-bottom: 1px dashed $secondary-dark-color;
        padding-bottom: 5px;
      }
      &--total {
        font-weight: 700;
        border-top: 1px dashed $secondary-dark-color;
        padding-top: 5px;
      }
    }
  }
  &-buttons {
    display: flex;
    gap: 10px;
    &-purchase {
      width: 150px;
    }
  }
  &-empty {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    &-title {
      font-size: 1.2em;
    }
    &-start-button {
      width: 150px;
    }
  }
}
@media only screen and (max-width: $mediaTablets) {
  .cart-list {
    width: 80%;
  }
}
@media only screen and (max-width: $mediaMobile) {
  .cart-list {
    width: 100%;
  }
}
</style>
