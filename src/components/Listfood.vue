<template>
  <SearchInput
    id="searchQuery"
    placeholder="Search products"
    @entersearch="doSearch"
  ></SearchInput>
  <div class="flex-container" v-if="!loading && data && data.length">
    <div
      class="flex-item meal-box"
      :style="{ backgroundImage: 'url(' + meal.strMealThumb + ')' }"
      v-for="(meal, index) in data"
      :key="index"
    >
      <div class="tagsProd">
        <div v-if="meal.strTags && meal.strTags != ''">
          {{ checkSpaces(meal.strTags ?? "") }}
        </div>
      </div>

      <div class="nameProd">{{ meal.strMeal }}</div>
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
import { ref, onMounted } from "vue";
import FoodApi from "../api/food.js";
import SearchInput from "./SearchInput.vue";
export default {
  name: "list-food",
  props: {},
  components: { SearchInput },
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const doSearch = (query) => {
      fetchData(query);
    };
    const fetchData = async (query) => {
      loading.value = true;
      try {
        let info = await FoodApi.getFood(query);

        loading.value = false;

        if (!info.ok) {
          error.value = info.error.json;
        } else {
          data.value = info.data;
        }
      } catch (err) {
        loading.value = false;
        error.value = err;
      }
    };

    onMounted(() => {
      fetchData();
    });

    const checkSpaces = (text) => text.replaceAll(/,(\S)/, ", $1");

    return {
      data,
      loading,
      error,
      doSearch,
      checkSpaces,
    };
  },
};

String.prototype.replaceAll = function (search, replacement) {
  const target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
</script>

<style scoped>
.flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  flex-wrap: wrap;
}

.flex-container > .flex-item {
  flex-basis: 30%;
  margin-bottom: 30px;
}
.flex-container > .flex-item:not(:nth-child(3n)) {
  margin-right: 5%;
}

.meal-box {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  align-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  opacity: 0.75;
  background-size: cover;
  background-position: center;
  min-height: 200px;
}
.meal-box div {
  display: -webkit-flex;
  display: flex;
}
.meal-box > div {
  width: 100%;
}
.meal-box > .tagsProd {
  justify-content: end;
}

.meal-box > .tagsProd > div {
  justify-content: end;
  margin: 0;
  padding: 5px 10px;
  font-size: 0.8em;
  color: #fff;
  background-color: rgb(0, 61, 66);
}

.meal-box > .nameProd {
  flex-basis: 100%;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
  min-height: 30px;
  padding: 10px;
  color: #fff;
  background: rgb(0 0 0 / 50%);
}
</style>
