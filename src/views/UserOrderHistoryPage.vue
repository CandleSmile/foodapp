<template>
  <AppLoader v-if="loading" :is-dark="false" />
  <article v-else class="user-order-history">
    <h1 class="user-order-history__title">Orders history</h1>
    <ul v-if="!error" class="user-order-history__order-list">
      <li
        v-for="order in orders"
        :key="order.id"
        class="user-order-history__order-list-item"
      >
        <div class="user-order-history__order-list-item-num">
          <label class="user-order-history__order-list-item-num-label"
            >Order # </label
          >{{ order.id }}
        </div>
        <div class="user-order-history__order-list-item-date">
          <label class="user-order-history__order-list-item-date-label"
            >Date: </label
          >{{ order.dateCreated }}
        </div>
        <div class="user-order-history__order-list-item-price">
          <label class="user-order-history__order-list-item-price-label"
            >Total Price: </label
          >{{ order.totalPrice }}
        </div>

        <div class="user-order-history__order-list-item-meals-table">
          <div
            class="user-order-history__order-list-item-meals-table-td user-order-history__order-list-item-meals-table-td--header"
          >
            Title
          </div>
          <div
            class="user-order-history__order-list-item-meals-table-td user-order-history__order-list-item-meals-table-td--header"
          >
            Price
          </div>
          <div
            class="user-order-history__order-list-item-meals-table-td user-order-history__order-list-item-meals-table-td--header"
          >
            Quantity
          </div>
          <template v-for="orderItem in order.orderItems" :key="orderItem.id">
            <div class="user-order-history__order-list-item-meals-table-td">
              {{ orderItem.title }}
            </div>
            <div class="user-order-history__order-list-item-meals-table-td">
              {{ orderItem.price }}
            </div>
            <div class="user-order-history__order-list-item-meals-table-td">
              {{ orderItem.quantity }}
            </div>
          </template>
        </div>
      </li>
    </ul>
    <div class="user-order-history__error" v-else>
      <p>There war an error {{ error }}</p>
    </div>
  </article>
</template>
<script setup>
import { onMounted } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";

import {
  GET_ORDERS_ACTION,
  ORDERS,
  ERROR,
  LOADING,
} from "@/store/storeConstants";
const { useGetters, useActions } = createNamespacedHelpers("orders");
const {
  [ORDERS]: orders,
  [ERROR]: error,
  [LOADING]: loading,
} = useGetters([ORDERS, ERROR, LOADING]);
const { [GET_ORDERS_ACTION]: getOrders } = useActions([GET_ORDERS_ACTION]);

onMounted(async () => {
  await getOrders();
});
</script>
<style lang="scss">
.user-order-history {
  &__title {
    padding-bottom: 20px;
  }
  &__order-list {
    list-style: none;
    padding-left: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    &-item {
      grid-template-columns: 1fr;
      grid-template-rows: 20px 20px 20px 1fr;
      justify-items: center;
      display: grid;
      /*   grid-template-areas:
        "num date"
        "price price"
        "mealTable mealTable"; */
      text-align: left;
      gap: 0;
      padding: 10px 10px;
      border: 1px solid $secondary-dark-color;
      border-radius: 5px;
      &-date {
        //   grid-area: date;
        font-size: 14px;

        &-label {
          font-weight: bold;
        }
      }
      &-num {
        font-size: 14px;
        // grid-area: num;
        &-label {
          font-weight: bold;
        }
      }
      &-price {
        font-size: 14px;
        padding-bottom: 5px;
        //  grid-area: price;
        &-label {
          font-weight: bold;
        }
      }

      &-meals-table {
        border-top: 1px dashed $secondary-dark-color;
        display: grid;
        //grid-area: mealTable;

        padding-top: 5px;
        grid-template-columns: 5fr 1fr 1fr;
        font-size: 12px;
        &-td {
          &--header {
            font-weight: bold;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: $mediaExtraLarge) {
  .user-order-history__order-list {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}
@media only screen and (max-width: $mediaSmallScreen) {
  .user-order-history__order-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
@media only screen and (max-width: $mediaTablets) {
  .user-order-history__order-list {
    grid-template-columns: 1fr;
  }
}
</style>
