<template>
  <section class="list-food">
    <h2 class="list-food__title">{{ titleList }}</h2>
    <ul class="list-food__meals" v-if="mealsList && mealsList.length > 0">
      <li
        class="list-food__meals-item"
        v-for="meal in mealsList"
        :key="meal.idMeal"
      >
        <router-link
          :to="{ name: 'food', params: { id: meal.idMeal } }"
          class="list-food__meals-item-link"
        >
          <div class="list-food__meals-item-img-wrapper">
            <div
              v-if="meal.strTags && meal.strTags != ''"
              class="list-food__meals-item-tags"
            >
              {{ meal.checkSpacesTags }}
            </div>
            <img
              class="list-food__meals-item-img"
              :src="meal.strMealThumb"
              :alt="meal.strMeal"
            />
          </div>
          <div class="list-food__meals-item-info-wrapper">
            <div class="list-food__meals-item-name">{{ meal.strMeal }}</div>
          </div>
          <div class="list-food__meals-item-area-add-info">
            <div class="list-food__meals-item-area-add-info-cat">
              <div v-if="meal.strCategory && meal.strCategory != ''">
                <span class="list-food__meals-item-area-add-info-cat-title"
                  >Category:
                </span>
                <span> {{ meal.strCategory }}</span>
              </div>
              <div v-if="meal.strArea && meal.strArea != ''">
                <span class="list-food__meals-item-area-add-info-cat-title"
                  >Area:
                </span>
                <span>{{ meal.strArea }}</span>
              </div>
            </div>
            <div class="list-food__meals-item-area-add-info-price">
              ${{ meal.price }}
            </div>
          </div>
        </router-link>
        <div class="list-food__meals-item-to-cart">
          <quantity-choose
            :modelValue="meal.quantity"
            @update:modelValue="
              (newValue) => updateQuant(meal.idMeal, newValue)
            "
          />
          <add-to-cart-button
            @add-to-cart="$emit('addToCart', meal)"
          ></add-to-cart-button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import QuantityChoose from "@/components/general/QuantityChoose";
import AddToCartButton from "@/components/AddToCartButton.vue";
export default {
  name: "ListFood",
  props: {
    titleList: String,
    mealsList: Array,
  },
  emits: ["changeQuantity", "addToCart"],
  components: {
    QuantityChoose: QuantityChoose,
    AddToCartButton: AddToCartButton,
  },
  setup(props, ctx) {
    const updateQuant = (id, value) => {
      ctx.emit("changeQuantity", { id, value });
    };

    return {
      updateQuant,
    };
  },
};
</script>

<style lang="scss">
.list-food {
  &__title {
    font-size: 1em;
    font-weight: 600;
    text-align: left;
  }

  &__meals {
    display: grid;
    grid-template-columns: repeat($meal-count-supersize, 1fr);
    gap: $meal-items-gap-large;
    padding: 20px 0;
    &-item {
      display: grid;
      grid-template-columns: 1fr;
      background-color: $meal-item-background;
      min-height: 200px;
      box-shadow: 0px 3px 3px 0px $food-item-border-color;
      border-radius: 5px;
      overflow: hidden;

      &-link {
        display: grid;
        grid-template-columns: 1fr;
        text-decoration-line: none;
        color: $text-dark-color;
      }
      &-img-wrapper {
        overflow: hidden;
        max-height: 150px;
        display: grid;
        grid-template-rows: 1fr 1fr;
        align-content: center;
        position: relative;
      }
      &-img {
        width: 100%;
      }
      &-info-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        padding: 10px;
      }

      &-name {
        color: $text-dark-color;
        text-align: left;
        font-size: 0.8em;
        font-weight: 700;
        line-height: 1.3em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &-area-add-info {
        display: grid;
        grid-template-columns: 1fr 70px;
        border-top: 1px dashed $text-light-color;
        padding: 5px 10px;

        &-cat {
          flex-basis: 100%;
          color: $text-light-color;
          font-size: 0.6em;
          text-align: left;
          display: flex;
          flex-direction: column;
          line-height: 1.5em;
          min-height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &-title {
            font-weight: 700;
          }
          &-price {
          }
        }
      }
      &-tags {
        position: absolute;
        top: 0;
        right: 0;
        background: $meal-tags-color-background;
        border-end-start-radius: 5px;
        padding: 0.3em 0.7em;
        color: $meal-tags-color-text;
        font-size: 0.7em;
      }
      &-to-cart {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px;
      }
    }
  }
}
@media only screen and (max-width: $mediaExtraLarge) {
  .list-food__meals {
    gap: $meal-items-gap-large;
    &-item {
      width: itemWidth($meal-count-large, $meal-items-gap-large);
    }
  }
}

@media only screen and (max-width: $mediaSmallScreen) {
  .list-food__meals {
    gap: $meal-items-gap-large;
    &-item {
      width: itemWidth($meal-count-middle1, $meal-items-gap-large);
    }
  }
}

@media only screen and (max-width: $mediaTablets) {
  .list-food__meals {
    gap: $meal-items-gap-small;
    &-item {
      width: itemWidth($meal-count-middle2, $meal-items-gap-small);
    }
  }
}
@media only screen and (max-width: $mediaMobile) {
  .list-food__meals {
    justify-content: center;
    gap: $meal-items-gap-small;
    &-item {
      width: itemWidth($meal-count-small, $meal-items-gap-small);
    }
  }
}
</style>
