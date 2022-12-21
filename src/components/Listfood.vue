<template>
  <div class="list-food" v-if="!loading && data && data.length">
    <div
      class="list-food__item"
      :style="{ backgroundImage: 'url(' + meal.strMealThumb + ')' }"
      v-for="(meal, index) in data"
      :key="index"
    >
      <router-link
        :to="{ name: 'food', params: { id: meal.idMeal } }"
        class="list-food__link"
      >
        <div class="list-food__tags">
          <div
            class="list-food__tags-desc"
            v-if="meal.strTags && meal.strTags != ''"
          >
            {{ checkSpaces(meal.strTags ?? "") }}
          </div>
        </div>

        <div class="list-food__name">{{ meal.strMeal }}</div>
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
          data.value = info.data;
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
}

.list-food__item {
  display: flex;

  flex-basis: 30%;
  min-height: 200px;
  margin-bottom: 30px;

  background-size: cover;
  background-position: center;
  opacity: 0.75;
  &:not(:nth-child(3n)) {
    margin-right: 5%;
  }
}
.list-food__link {
  display: flex;
  flex-basis: 100%;
  height: 100%;
  flex-direction: row;
  align-content: space-between;
  flex-wrap: wrap;
  text-decoration-line: none;
}
.list-food__tags {
  justify-content: flex-end;
  flex-basis: 100%;
  display: flex;
}
.list-food__tags-desc {
  margin: 0;
  padding: 5px 10px;
  font-size: 0.8em;
  color: #fff;
  background-color: rgb(0, 61, 66);
}

.list-food__name {
  flex-basis: 100%;
  min-height: 30px;
  padding: 10px;
  color: #fff;
  background: rgb(0 0 0 / 50%);
}
</style>
