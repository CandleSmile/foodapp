<template>
  <section class="meals-block"></section>
  <h2 class="meals-title main-block__meals-title">{{ titleList }}</h2>

  <ul
    class="list-food main-block__list-food"
    v-if="!loading && data && data.length"
  >
    <li class="list-food__item" v-for="(meal, index) in data" :key="index">
      <router-link
        :to="{ name: 'food', params: { id: meal.idMeal } }"
        class="list-food__link"
      >
        <div class="list-food__img-wrapper">
          <img
            class="list-food__img"
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
          />
        </div>
        <div class="list-food__info-wrapper">
          <div class="list-food__name">{{ meal.strMeal }}</div>

          <div class="list-food__insrtuctions">
            <span>{{ meal.strInstructions }}</span>
          </div>
        </div>
        <div class="list-food__tags">
          <span v-if="meal.strCategory && meal.strCategory != ''">{{
            checkSpaces(meal.strCategory)
          }}</span>
        </div>
      </router-link>
    </li>
  </ul>

  <div class="no-cat-data" v-else-if="!loading && data && data.length == 0">
    <p>No categories</p>
  </div>
  <div class="error-cat-data" v-else-if="!loading && error">
    <p>There war an error {{ error }}</p>
  </div>
  <div class="loading-cat-data" v-else>Loading...</div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import FoodApi from "../api/food.js";
import { filters } from "../filters";

export default {
  name: "list-food",
  props: { titleList: String, isLatestProducts: Boolean },
  setup(props) {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const fetchData = async (filtersFromQuery) => {
      loading.value = true;
      try {
        let info = props.isLatestProducts
          ? await FoodApi.getInitialFood("")
          : await FoodApi.getFoodByFilters(filtersFromQuery);

        loading.value = false;
        if (!info.ok) {
          error.value = info.error;
        } else {
          data.value = info.data ?? [];
        }
      } catch (err) {
        loading.value = false;
        error.value = err;
      }
    };
    watch(filters, async (newFilters) => {
      fetchData(newFilters);
    });

    onMounted(() => {
      fetchData(filters);
    });

    const checkSpaces = (text) => text.replaceAll(/,(\S)/, ", $1");

    return {
      data,
      loading,
      error,
      checkSpaces,
    };
  },
};

String.prototype.replaceAll = function (search, replacement) {
  const target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
</script>

<style lang="scss">
.meals-title {
  font-size: 1em;
  font-weight: 600;
  text-align: left;
}
.main-block__meals-title {
  margin: 0;
}
.main-block__list-food {
  margin-top: 20px;
}
.list-food {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px 16px;
  padding: 0;
  &__item {
    display: flex;
    width: calc(25% - 12px);
    min-height: 200px;
    box-shadow: 0px 3px 3px 0px $food-item-border-color;
    border-radius: 5px;
    overflow: hidden;
  }
  &__link {
    display: flex;
    flex-basis: 100%;
    height: 100%;
    flex-direction: row;
    align-content: flex-start;
    flex-wrap: wrap;
    text-decoration-line: none;
    width: 100%;
  }
  &__img-wrapper {
    overflow: hidden;
    max-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__img {
    width: 100%;
  }
  &__info-wrapper {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    padding: 10px;
    width: 100%;
  }
  &__insrtuctions {
    text-align: left;
    color: $text-dark-color;
    font-size: 0.6em;
    min-height: 1.2em;
    padding-top: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__name {
    flex-basis: 100%;
    color: $text-dark-color;
    text-align: left;
    font-size: 0.8em;
    font-weight: 700;
    line-height: 1.3em;
  }
  &__tags {
    flex-basis: 100%;
    color: $text-light-color;
    font-size: 0.6em;
    text-align: left;
    border-top: 1px dashed $text-light-color;
    padding: 0 10px;
    line-height: 2em;
    min-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
@media only screen and (min-width: 1700px) {
  .list-food {
    gap: 35px 25px;
    &__item {
      width: calc(20% - 20px);
    }
  }
}
@media only screen and (max-width: 1024px) {
  .list-food {
    gap: 20px 12px;
    &__item {
      width: calc(33% - 8px);
    }
  }
}

@media only screen and (min-width: 481px) and (max-width: 767px) {
  .list-food {
    gap: 20px 10px;
    &__item {
      width: calc(50% - 5px);
    }
  }
}
@media only screen and (max-width: 480px) {
  .list-food {
    justify-content: center;
    &__item {
      flex-basis: 100%;
    }
  }
}
</style>
