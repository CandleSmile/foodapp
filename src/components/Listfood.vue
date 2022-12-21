<template>
  <div class="list-food" v-if="!loading && data && data.length">
    <div class="list-food__item" v-for="(meal, index) in data" :key="index">
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

          <div class="list-food__insrtuctions">{{ meal.strCategory }}</div>
        </div>
        <div class="list-food__tags">
          <span v-if="meal.strTags && meal.strTags != ''">{{
            checkSpaces(meal.strTags)
          }}</span>
        </div>
      </router-link>
    </div>
  </div>
  <div v-else-if="!loading && data == null && error == null">
    <p>Please, input your request</p>
  </div>
  <div v-else-if="!loading && data && data.length == 0">
    <p>No such data</p>
  </div>
  <div v-else-if="!loading && error">
    <p>There war an error {{ error }}</p>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { ref, onMounted, inject, watch } from "vue";
import FoodApi from "../api/food.js";

export default {
  name: "list-food",
  props: {},
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const serchStr = inject("serchStr");
    watch(serchStr, (newVaue) => {
      fetchData(newVaue);
    });
    const fetchData = async (query) => {
      loading.value = true;
      try {
        let info = await FoodApi.getFood(query);
        loading.value = false;
        if (!info.ok) {
          error.value = info.error;
        } else {
          console.log(info.data);
          data.value = info.data ?? [];
        }
      } catch (err) {
        loading.value = false;
        error.value = err;
      }
    };

    onMounted(() => {
      fetchData(serchStr.value);
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
.list-food {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  &__item {
    display: flex;

    flex-basis: 30%;
    min-height: 200px;
    margin-bottom: 30px;
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
  }
  &__insrtuctions {
    text-align: left;
    color: $text-dark-color;
    font-size: 0.6em;
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
  }
}
@media only screen and (min-width: 1824px) {
  .list-food__item {
    flex-basis: 22%;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .list-food__item {
    flex-basis: 45%;
  }
}
@media only screen and (min-width: 481px) and (max-width: 767px) {
  .list-food {
    justify-content: center;
    &__item {
      flex-basis: 52%;
    }
  }
}
@media only screen and (max-width: 480px) {
  .list-food {
    justify-content: center;
    &__item {
      flex-basis: 80%;
    }
  }
}
</style>
