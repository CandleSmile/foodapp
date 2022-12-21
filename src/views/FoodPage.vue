<template>
  <div class="food">
    <div class="food-picture food__food-picture">
      <img
        class="food_picture__image"
        :src="foodData.strMealThumb"
        :alt="foodData.strMeal"
      />
    </div>
    <div class="food-info food__food-info">
      <div class="food-info__name">{{ foodData.strMeal }}</div>
      <div class="food-info__cat">
        <span>Category: </span>{{ foodData.strCategory }}
      </div>
      <div class="food-info__instructions">{{ foodData.strInstructions }}</div>
      <div class="food-info__ingridients">
        <p class="food-info__ingridients-title">Ingredients:</p>
        <ul class="food-info__ingridients-list">
          <li v-for="(item, index) in getIngrdedients" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import FoodApi from "../api/food";
export default {
  name: "FoodPage",

  setup() {
    const route = useRoute();
    const router = useRouter();
    const foodData = ref("");
    //const error = ref("");
    const getIngrdedients = computed(() => {
      if (!foodData.value) return [];
      const infoMeal = foodData.value;
      let ingridients = [];
      for (let key in infoMeal) {
        if (
          key.startsWith("strIngredient") &&
          infoMeal[key] &&
          infoMeal[key].length > 0
        ) {
          ingridients.push(infoMeal[key]);
        }
      }
      return ingridients;
    });

    const fetchDataFood = async (id) => {
      try {
        let info = await FoodApi.getFoodById(id);

        if (info.ok) {
          foodData.value = info.data.meals[0];
        } else {
          router.push({ name: "404", replace: true });
          //error.value = "The item wasn't found + " + info.error; //should be rewrite with 404
        }
      } catch (err) {
        router.push({ name: "404", replace: true });

        //error.value = err; //should be rewrite with 404
      }
    };
    onMounted(() => {
      fetchDataFood(route.params.id);
    });

    return {
      foodData,
      getIngrdedients,
    };
  },
};
</script>
<style scoped lang="scss">
.food {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 50px;
  &__food-picture {
    flex-basis: 30%;
  }
  &__food-info {
    flex-basis: 70%;
    flex-direction: column;
    display: flex;
  }
}

.food_picture {
  &__image {
    width: 100%;
  }
}
.food-info {
  padding: 0 20px;
  &__name {
    font-weight: 900;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  &__cat {
    margin-bottom: 20px;
    & span {
      font-weight: 900;
    }
  }
  &__insrtuctions {
    font-size: 0.9 rem;
  }
  &__ingridients {
    border: 1px #000;
  }
  &__ingridients-title {
    font-weight: 900;
  }
  &__ingridients-list {
    list-style: none;
    padding: 0;
  }
}
</style>
