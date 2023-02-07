<template>
  <section class="list-food">
    <h2 class="list-food__title">{{ titleList }}</h2>
    <ul class="list-food__meals" v-if="meals && meals.length > 0">
      <li class="list-food__meals-item" v-for="meal in meals" :key="meal.id">
        <router-link
          :to="{ name: 'food', params: { id: meal.id } }"
          class="list-food__meals-item-link"
        >
          <div
            v-show="meal.tags && meal.tags.length > 0"
            class="list-food__meals-item-link-tags"
          >
            {{ meal.tagsString }}
          </div>
          <div class="list-food__meals-item-link-img-wrapper">
            <img
              class="list-food__meals-item-link-img"
              :src="meal.image"
              :alt="meal.name"
            />
          </div>
          <div class="list-food__meals-item-link-name">{{ meal.name }}</div>

          <div
            v-show="meal.category && meal.category.name != ''"
            class="list-food__meals-item-link-category"
          >
            <span class="list-food__meals-item-link-category-title"
              >Category:
            </span>
            <span> {{ meal.category.name }}</span>
          </div>
          <div
            v-show="meal.area && meal.area.name != ''"
            class="list-food__meals-item-link-area"
          >
            <span class="list-food__meals-item-link-category-title"
              >Area:
            </span>
            <span>{{ meal.area.name }}</span>
          </div>

          <div class="list-food__meals-item-link-price">${{ meal.price }}</div>
        </router-link>
        <div class="list-food__meals-item-to-cart">
          <AppQuantityBox
            :modelValue="meal.quantity"
            @update:modelValue="(newValue) => updateQuant(meal.id, newValue)"
          />
          <AddToCartButton
            @add-to-cart="$emit('addToCart', meal)"
            class="list-food__meals-item-to-cart-button"
          />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import AppQuantityBox from "@/components/general/AppQuantityBox.vue";
import AddToCartButton from "@/components/AddToCartButton.vue";
import { computed } from "vue";

export default {
  name: "ListFood",
  props: {
    titleList: String,
    mealsList: Array,
  },
  emits: ["changeQuantity", "addToCart"],

  components: {
    AppQuantityBox: AppQuantityBox,
    AddToCartButton: AddToCartButton,
  },
  setup(props, ctx) {
    const updateQuant = (id, value) => {
      ctx.emit("changeQuantity", { id, value });
    };
    const meals = computed(() => mapMeals(props.mealsList));
    return {
      updateQuant,
      meals,
    };
  },
};
const mapMeals = (meals) =>
  meals?.map((meal) => ({
    ...meal,
    tagsString: meal.tags.reduce(
      (tagString, tag) => tagString + (tagString != "" ? ", " : "") + tag.name,
      ""
    ),
  }));
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
        position: relative;

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
        justify-items: start;
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
