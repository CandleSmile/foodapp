<template>
  <AppLoader v-if="loading" />

  <article v-else class="food">
    <div class="food__picture">
      <img
        class="food__picture-image"
        :src="foodData.image"
        :alt="foodData.name"
      />
    </div>
    <div class="food__info">
      <h1 class="food__info-name">{{ foodData.name }}</h1>
      <div class="food__info-category">
        <span>Category: </span>
        <RouterLink
          class="food__info-category-link"
          :to="{
            name: 'meal',
            query: { [categoryFilter]: foodData.category?.name },
          }"
          >{{ foodData.strCategory }}</RouterLink
        >
      </div>
      <div class="food__info-instructions">{{ foodData.description }}</div>
      <div class="food__info-ingredients">
        <p class="food__info-ingredients-title">Ingredients:</p>
        <ul class="food__info-ingredients-list">
          <li v-for="item in ingredientsList" :key="item.id">
            <RouterLink
              class="food__info-ingredients-list-link"
              :to="{
                name: 'meal',
                query: { [ingredientFilter]: item.id },
              }"
            >
              {{ item }}</RouterLink
            >
          </li>
        </ul>
      </div>
      <div class="food__info-item-to-cart">
        <AppQuantityBox
          class="food__info-item-to-cart-quantity"
          :modelValue="foodData.quantity"
          @update:modelValue="(newValue) => updateQuantity(newValue)"
        />
        <AddToCartButton
          class="food__info-item-to-cart-button"
          @add-to-cart="addToCart(foodData)"
        />
      </div>
    </div>
  </article>
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import { FilterType } from "../const/filterType";
import {
  GET_FOOD_ACTION,
  FOOD,
  LOADING,
  ADD_TO_CART_ACTION,
  UPDATE_QUANTITY_OF_FOOD_ACTION,
} from "@/store/storeConstants";
import AppLoader from "@/components/general/AppLoader.vue";
import AddToCartButton from "@/components/AddToCartButton.vue";
import AppQuantityBox from "@/components/general/AppQuantityBox.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useGetters, useActions } = createNamespacedHelpers("meals");

const { useActions: useCartActions } = createNamespacedHelpers("cart");
export default {
  name: "FoodPage",
  components: { AppLoader, AddToCartButton, AppQuantityBox },
  setup() {
    const route = useRoute();

    const { [FOOD]: foodData, [LOADING]: loading } = useGetters([
      FOOD,
      LOADING,
    ]);

    const { [ADD_TO_CART_ACTION]: addToCart } = useCartActions([
      ADD_TO_CART_ACTION,
    ]);
    const {
      [GET_FOOD_ACTION]: getFood,
      [UPDATE_QUANTITY_OF_FOOD_ACTION]: updateQuantity,
    } = useActions([GET_FOOD_ACTION, UPDATE_QUANTITY_OF_FOOD_ACTION]);

    const categoryFilter = FilterType.CATEGORY;
    const ingredientFilter = FilterType.INGREDIENTS;

    const ingredientsList = computed(() => {
      if (!foodData.value) return [];
      const infoMeal = foodData.value;
      return infoMeal.ingredients ?? [];
    });

    onMounted(() => {
      getFood(route.params.id);
    });

    return {
      foodData,
      ingredientsList,
      categoryFilter,
      ingredientFilter,
      loading,
      addToCart,
      updateQuantity,
    };
  },
};
</script>
<style scoped lang="scss">
.food {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  &__picture {
    flex-basis: 30%;

    &-image {
      width: 100%;
    }
  }

  &__info {
    flex-basis: 70%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    text-align: left;

    &-name {
      font-weight: 600;
      font-size: 2rem;
      padding-bottom: 20px;
      margin: 0;
    }

    &-category {
      padding-bottom: 20px;

      & span {
        font-weight: 600;
      }
    }

    &-category-link {
      color: $link-color;
      text-decoration: none;
    }

    &-instructions {
      font-size: 0.9 rem;
    }

    &-ingredients {
      border: 1px #000;
      font-size: 0.9em;
    }

    &-ingredients-title {
      font-weight: 600;
    }

    &-ingredients-list {
      list-style: none;
      padding: 0;
    }

    &-ingredients-list-link {
      color: $link-color;
      text-decoration: none;
    }

    &-item-to-cart {
      display: flex;
      gap: 20px;
      padding: 20px 0;
      justify-content: flex-start;
      align-items: center;
    }
  }
}

@media only screen and (max-width: $mediaMobile) {
  .food {
    flex-direction: column;

    &__picture {
      width: 100%;
      margin: auto;
    }

    &__info {
      padding-top: 20px;
      text-align: center;

      &-item-to-cart {
        justify-content: center;
      }
    }
  }
}
</style>
