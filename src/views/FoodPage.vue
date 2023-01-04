<template>
  <article class="food main-block__food">
    <div class="food-picture food__food-picture">
      <img
        class="food_picture__image"
        :src="foodData.strMealThumb"
        :alt="foodData.strMeal"
      />
    </div>
    <div class="food-info food__food-info">
      <h1 class="food-info__name">{{ foodData.strMeal }}</h1>
      <div class="food-info__cat">
        <span>Category: </span>
        <RouterLink
          class="food-info__cat-link"
          :to="{
            name: 'meal',
            query: { [catFilter]: foodData.strCategory },
          }"
          >{{ foodData.strCategory }}</RouterLink
        >
      </div>
      <div class="food-info__instructions">{{ foodData.strInstructions }}</div>
      <div class="food-info__ingredients">
        <p class="food-info__ingredients-title">Ingredients:</p>
        <ul class="food-info__ingredients-list">
          <li v-for="(item, index) in getIngredients" :key="index">
            <RouterLink
              class="food-info__ingredient-link"
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
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { foodApi } from "../api/index";
import { FilterType } from "../const/filterType";
export default {
  name: "FoodPage",

  setup() {
    const route = useRoute();
    const router = useRouter();
    const foodData = ref("");
    const catFilter = FilterType.CATEGORY;
    const ingredientFilter = FilterType.INGREDIENTS;
    const getIngredients = computed(() => {
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

    const fetchDataFood = async (id) => {
      try {
        let info = await foodApi.food.get.foodById(id);

        if (info.ok) {
          foodData.value = info.data.meals[0];
        } else {
          router.push({ name: "404", replace: true });
        }
      } catch (err) {
        router.push({ name: "404", replace: true });
      }
    };
    onMounted(() => {
      fetchDataFood(route.params.id);
    });

    return {
      foodData,
      getIngredients,
      catFilter,
      ingredientFilter,
    };
  },
};
</script>
<style scoped lang="scss">
.food {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  &__food-picture {
    flex-basis: 30%;
  }
  &__food-info {
    flex-basis: 70%;
  }
}

.food_picture {
  &__image {
    width: 100%;
  }
}
.food-info {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  text-align: left;
  &__name {
    font-weight: 600;
    font-size: 2rem;
    padding-bottom: 20px;
    margin: 0;
  }
  &__cat {
    padding-bottom: 20px;
    & span {
      font-weight: 600;
    }
  }
  &__cat-link {
    color: $link-color;
    text-decoration: none;
  }
  &__insrtuctions {
    font-size: 0.9 rem;
  }
  &__ingredients {
    border: 1px #000;
    font-size: 0.9em;
  }
  &__ingredients-title {
    font-weight: 600;
  }
  &__ingredients-list {
    list-style: none;
    padding: 0;
  }
  &__ingredient-link {
    color: $link-color;
    text-decoration: none;
  }
}

@media only screen and (max-width: 480px) {
  .food {
    flex-direction: column;
    &__food-picture {
      width: 100%;
      margin: auto;
    }
  }

  .food-info {
    padding-top: 20px;
  }
  .food__food-info {
    text-align: center;
  }
}
</style>
