<template>
  <LoadingContent v-if="loading" />
  <article v-else class="food">
    <div class="food__picture">
      <img
        class="food__picture-image"
        :src="foodData.strMealThumb"
        :alt="foodData.strMeal"
      />
    </div>
    <div class="food__info">
      <h1 class="food__info-name">{{ foodData.strMeal }}</h1>
      <div class="food__info-cat">
        <span>Category: </span>
        <RouterLink
          class="food__info-cat-link"
          :to="{
            name: 'meal',
            query: { [catFilter]: foodData.strCategory },
          }"
          >{{ foodData.strCategory }}</RouterLink
        >
      </div>
      <div class="food__info-instructions">{{ foodData.strInstructions }}</div>
      <div class="food__info-ingredients">
        <p class="food__info-ingredients-title">Ingredients:</p>
        <ul class="food__info-ingredients-list">
          <li v-for="item in ingredientsList" :key="item">
            <RouterLink
              class="food__info-ingredient-link"
              :to="{
                name: 'meal',
                query: { [ingredientFilter]: item },
              }"
            >
              {{ item }}</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { FilterType } from "../const/filterType";
import { GET_FOOD_ACTION } from "@/store/storeConstants";
import LoadingContent from "@/components/general/LoadingContent.vue";
export default {
  name: "FoodPage",
  components: { LoadingContent },
  setup() {
    const route = useRoute();
    const store = useStore();
    const foodData = computed(() => store.state.meals.foodData ?? []);
    const loading = computed(() => store.state.meals.loading);

    const catFilter = FilterType.CATEGORY;
    const ingredientFilter = FilterType.INGREDIENTS;

    const ingredientsList = computed(() => {
      if (!foodData.value) return [];
      const infoMeal = foodData.value;
      let ingredients = [];
      for (let key in infoMeal) {
        if (
          key.startsWith("strIngredient") &&
          infoMeal[key] &&
          infoMeal[key].length > 0
        ) {
          ingredients.push(infoMeal[key]);
        }
      }
      return ingredients;
    });

    onMounted(() => {
      store.dispatch(`meals/${GET_FOOD_ACTION}`, route.params.id);
    });

    return {
      foodData,
      ingredientsList,
      catFilter,
      ingredientFilter,
      loading,
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
    &-cat {
      padding-bottom: 20px;
      & span {
        font-weight: 600;
      }
    }
    &-cat-link {
      color: $link-color;
      text-decoration: none;
    }
    &-insrtuctions {
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
    &-ingredient-link {
      color: $link-color;
      text-decoration: none;
    }
  }
}

@media only screen and (max-width: $mediaMinWidth) {
  .food {
    flex-direction: column;
    &__picture {
      width: 100%;
      margin: auto;
    }
    &__info {
      padding-top: 20px;
      text-align: center;
    }
  }
}
</style>
