<template>
  <article class="user-order-history">
    <ul
      v-if="orders && orders.length > 0"
      class="user-order-history__order-list"
    >
      <li
        v-for="order in orders"
        :key="order.id"
        class="user-order-history__order-list-item"
      >
        <div class="user-order-history__order-list-item-num">
          <label class="user-order-history__order-list-item-num-label"
            >Order # {{ order.id }}</label
          >
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
            class="user-order-history__order-list-item-meals-table-td user-order-history__order-list-item-meals-table-td--header user-order-history__order-list-item-meals-table-td--right"
          >
            Price
          </div>
          <div
            class="user-order-history__order-list-item-meals-table-td user-order-history__order-list-item-meals-table-td--header user-order-history__order-list-item-meals-table-td--right"
          >
            Quantity
          </div>
          <template v-for="orderItem in order.orderItems" :key="orderItem.id">
            <div class="user-order-history__order-list-item-meals-table-td">
              {{ orderItem.title }}
            </div>
            <div
              class="user-order-history__order-list-item-meals-table-td user-order-history__order-list-item-meals-table-td--right"
            >
              {{ orderItem.price }}
            </div>
            <div
              class="user-order-history__order-list-item-meals-table-td user-order-history__order-list-item-meals-table-td--right"
            >
              {{ orderItem.quantity }}
            </div>
          </template>
        </div>
      </li>
    </ul>
    <div v-else>
      <p>You haven't orders yet.</p>
    </div>
  </article>
</template>
<script setup>
import { defineProps } from "vue";
defineProps({ orders: Array });
</script>
<style lang="scss">
.user-order-history {
  &__title {
    padding-bottom: 20px;
    font-size: 1em;
    font-weight: 600;
    text-align: left;
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
      background: $secondary-light-color;
      text-align: left;
      gap: 0;
      padding: 10px 10px;
      box-shadow: 0px 3px 3px 0px rgba($secondary-dark-color, 0.17);
      border: 1px solid rgba($secondary-dark-color, 0.17);
      border-radius: 5px;
      &-date {
        //   grid-area: date;
        font-size: 14px;

        &-label {
          font-weight: 500;
          color: $secondary-dark-color;
        }
      }
      &-num {
        font-size: 14px;
        // grid-area: num;
        &-label {
          font-weight: bold;
          color: $secondary-dark-color;
        }
      }
      &-price {
        font-size: 14px;
        padding-bottom: 5px;
        //  grid-area: price;
        &-label {
          font-weight: 500;
          color: $secondary-dark-color;
        }
      }

      &-meals-table {
        border-top: 1px dashed $secondary-dark-color;
        display: grid;
        padding-top: 5px;
        grid-template-columns: 5fr 1fr 1fr;
        font-size: 12px;
        gap: 5px;
        &-td {
          &--header {
            font-weight: bold;
          }
          &--right {
            text-align: right;
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
@media only screen and (max-width: $mediaMobile) {
  .user-order-history__order-list {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
