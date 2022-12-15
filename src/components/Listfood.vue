<template>
  <SearchInput
    id="searchQuery"
    placeholder="Search products"
    @entersearch="doSearch"
  ></SearchInput>
  <div class="flex-container" v-if="!loading && data && data.length">
    <div class="flex-item meal-box" v-for="(meal, index) in data" :key="index">
      <p>
        <span>{{ meal.food.brand }}</span>
      </p>
      <p><span>Name: </span>{{ meal.food.label }}</p>
      <p><span>Category: </span>{{ meal.food.category }}</p>
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
        let info = await FoodApi.getFood(query ?? "");

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
      fetchData("salad");
    });

    return {
      data,
      loading,
      error,
      doSearch,
    };
  },
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
  flex-basis: 50%;
}
.meal-box {
  box-sizing: border-box;
  box-shadow: inset 0 0 0 1px #8c8c8c;
  padding: 20px;
}
.meal-box p > span {
  font-weight: bold;
}
</style>
