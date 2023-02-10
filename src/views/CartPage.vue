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
    <div class="cart__delivery">
      <h3 class="cart__delivery-title">
        Choose your date and time slot for delivery:
      </h3>
      <AppDatePicker
        :available-dates="deliveryAvailableDates"
        :show-available-dates="true"
        :enable-time-picker="false"
        :modelValue="deliveryDate"
        @handle-date="onHandleDate"
        placeholder="Select delivery date"
        :errors="v$.deliveryDate.$errors"
        class="cart__delivery-date"
      />
      <AppSelect
        :options="deliveryAvailableTimeSlots"
        :modelValue="deliveryTime"
        @update:modelValue="(newValue) => updateSelectedTime(newValue)"
        placeholder="Select time slot"
        :multiple="false"
        id="time"
        :errors="v$.deliveryTime.$errors"
        class="cart__delivery-time"
        label="time"
      />
    </div>
    <div class="cart-buttons">
      <AppButton
        class="cart-buttons-purchase app-button--theme-light"
        @click="goToPurchase"
        :disabled="loading"
        >Continue purchase</AppButton
      >
      <AppButton
        class="cart-buttons-buy app-button--theme-dark"
        @click="makeOrder"
        :disabled="loading"
        >Buy</AppButton
      >
    </div>
    <AppLoader v-if="loading" :is-dark="true"> </AppLoader>
  </article>
  <article v-else class="cart-empty">
    <h1 class="cart-empty-title">Your cart is empty now.</h1>
    <AppButton
      @click="goToPurchase"
      class="cart-empty-start-button app-button--theme-dark"
      >Start purchase</AppButton
    >
  </article>
  <article v-if="checkOutStatus != null" class="">
    <p>{{ checkOutStatus }}</p>
  </article>
</template>
<script setup>
import AppButton from "@/components/general/AppButton.vue";
import AppSelect from "@/components/general/AppSelect.vue";
import AppLoader from "@/components/general/AppLoader.vue";
import AppDatePicker from "@/components/general/AppDatePicker.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

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
  GET_AVAILABLE_DATES_ACTION,
  UPDATE_DATA_AND_AVAILABLE_TIME_OPTIONS,
  DELIVERY_AVAILABLE_DATE_OPTIONS,
  DELIVERY_AVAILABLE_TIME_OPTIONS,
  DELIVERY_DATE,
  DELIVERY_TIME,
  UPDATE_SELECTED_TIME_ACTION,
} from "@/store/storeConstants";
const router = useRouter();
const { useGetters, useActions } = createNamespacedHelpers("cart");
const {
  [CART_COUNT]: countItems,
  [CART_TOTAL_PRICE]: totalPrice,
  [MEALS_IN_CART]: mealsInCart,
  [LOADING]: loading,
  [CHECKOUT_STATUS]: checkOutStatus,
  [DELIVERY_AVAILABLE_DATE_OPTIONS]: deliveryAvailableDates,
  [DELIVERY_AVAILABLE_TIME_OPTIONS]: deliveryAvailableTimeSlots,
  [DELIVERY_DATE]: deliveryDate,
  [DELIVERY_TIME]: deliveryTime,
} = useGetters([
  CART_COUNT,
  CART_TOTAL_PRICE,
  MEALS_IN_CART,
  LOADING,
  CHECKOUT_STATUS,
  DELIVERY_AVAILABLE_DATE_OPTIONS,
  DELIVERY_AVAILABLE_TIME_OPTIONS,
  DELIVERY_DATE,
  DELIVERY_TIME,
]);
const {
  [DELETE_FROM_CART_ACTION]: deleteFromCart,
  [BUY_ACTION]: buy,
  [CLEAR_CHECKOUT_ACTION]: clearCheckout,
  [GET_AVAILABLE_DATES_ACTION]: getDates,
  [UPDATE_DATA_AND_AVAILABLE_TIME_OPTIONS]: updateDateAndTimeOptions,
  [UPDATE_SELECTED_TIME_ACTION]: updateSelectedTime,
} = useActions([
  DELETE_FROM_CART_ACTION,
  BUY_ACTION,
  CLEAR_CHECKOUT_ACTION,
  GET_AVAILABLE_DATES_ACTION,
  UPDATE_DATA_AND_AVAILABLE_TIME_OPTIONS,
  UPDATE_SELECTED_TIME_ACTION,
]);

const rules = {
  deliveryDate: { required },
  deliveryTime: { required },
};
const v$ = useVuelidate(rules, { deliveryDate, deliveryTime });

const goToPurchase = () => {
  router.push({ name: "meal" });
};

const onHandleDate = (modelData) => {
  updateDateAndTimeOptions(modelData);
};

const makeOrder = async () => {
  const isDataCorrect = await v$.value.$validate();
  if (!isDataCorrect) {
    return;
  }

  await buy();
};

onMounted(() => {
  getDates();
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
  &__delivery {
    &-title {
      font-size: 1em;
      font-weight: 600;
    }
    &-time {
      .v-select {
        width: 100%;
      }
      & .app-select__custom-select .vs__search,
      & .app-select__custom-select .vs__selected {
        font-size: 1rem;
        line-height: 1.5rem;
        &:focus {
          font-size: 1rem;
          line-height: 1.5rem;
        }
      }
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
