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
          <div
            v-show="meal.strTags && meal.strTags != ''"
            class="list-food__meals-item-link-tags"
          >
            {{ meal.checkSpacesTags }}
          </div>
          <div class="list-food__meals-item-link-img-wrapper">
            <img
              class="list-food__meals-item-link-img"
              :src="meal.strMealThumb"
              :alt="meal.strMeal"
            />
          </div>
          <div class="list-food__meals-item-link-name">{{ meal.strMeal }}</div>

          <div
            v-show="meal.strCategory && meal.strCategory != ''"
            class="list-food__meals-item-link-category"
          >
            <span class="list-food__meals-item-link-category-title"
              >Category:
            </span>
            <span> {{ meal.strCategory }}</span>
          </div>
          <div
            v-show="meal.strArea && meal.strArea != ''"
            class="list-food__meals-item-link-area"
          >
            <span class="list-food__meals-item-link-category-title"
              >Area:
            </span>
            <span>{{ meal.strArea }}</span>
          </div>

          <div class="list-food__meals-item-link-price">${{ meal.price }}</div>
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
            class="list-food__meals-item-to-cart-button"
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

        text-decoration-line: none;
        color: $text-dark-color;
        grid-template-columns: 1fr 80px;
        grid-template-areas:
          "tags tags"
          "image image"
          "name name"
          "category price"
          "area price";
        &-img-wrapper {
          overflow: hidden;
          max-height: 150px;
          position: relative;
        }
        &-img {
          width: 100%;
          &-wrapper {
            overflow: hidden;
            max-height: 150px;
            grid-area: image;
            display: flex;
            align-items: center;
          }
        }
        &-name {
          color: $text-dark-color;
          text-align: left;
          font-size: 0.8em;
          font-weight: 700;
          line-height: 1.3em;
          padding: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          grid-area: name;
          border-bottom: 1px dashed $secondary-dark-color;
        }
        &-category,
        &-area {
          color: $text-light-color;
          font-size: 0.6em;
          text-align: left;

          line-height: 1.5em;
          min-height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &-title {
            font-weight: 700;
          }
        }
        &-category {
          grid-area: category;
          padding: 5px 10px 0;
        }
        &-area {
          grid-area: area;
          padding: 0px 10px 5px;
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
          grid-area: tags;
        }
        &-price {
          grid-area: price;
          text-align: right;
          padding: 5px 10px 5px 0;
          align-self: end;
          color: $text-light-color;
          font-size: 13px;
        }
      }

      &-to-cart {
        display: grid;
        grid-template-columns: 2fr 1fr;
        align-items: center;
        padding: 10px 10px;
        &-button {
          justify-self: end;
        }
      }
    }
  }
}
@media only screen and (max-width: $mediaExtraLarge) {
  .list-food__meals {
    grid-template-columns: repeat($meal-count-large, 1fr);
    gap: $meal-items-gap-large;
  }
}

@media only screen and (max-width: $mediaSmallScreen) {
  .list-food__meals {
    grid-template-columns: repeat($meal-count-middle1, 1fr);
    gap: $meal-items-gap-large;
  }
}

@media only screen and (max-width: $mediaTablets) {
  .list-food__meals {
    grid-template-columns: repeat($meal-count-middle2, 1fr);
    gap: $meal-items-gap-small;
  }
}
@media only screen and (max-width: $mediaMobile) {
  .list-food__meals {
    grid-template-columns: repeat($meal-count-small, 1fr);
    gap: $meal-items-gap-small;
  }
}
</style>
