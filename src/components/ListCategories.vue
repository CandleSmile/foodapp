<template>
  <section class="categories-block">
    <h2 class="categories-title main-block__categories-title">Categories</h2>
    <ul
      class="list-categories main-block__list-categories"
      v-if="!loading && data && data.length"
    >
      <li
        class="list-categories__item"
        v-for="(cat, index) in data"
        :key="index"
      >
        <router-link
          class="list-categories__link"
          :to="{
            name: 'meal',
            query: { [catFilter]: cat.strCategory },
          }"
        >
          <div class="list-categories__img-wrapper">
            <img
              class="list-categories__img"
              :src="cat.strCategoryThumb"
              :alt="cat.strCategory"
            />
          </div>
          <div class="list-categories__info-wrapper">
            <div class="list-categories__name">{{ cat.strCategory }}</div>

            <div class="list-categories__count">{{ cat.strCategory }}</div>
          </div>
        </router-link>
      </li>
    </ul>
    <div
      class="input-request-meal-block"
      v-else-if="!loading && data == null && error == null"
    >
      <p>Please, input your request</p>
    </div>
    <div class="no-meal-data" v-else-if="!loading && data && data.length == 0">
      <p>Categories were not found</p>
    </div>
    <div class="error-meal-data" v-else-if="!loading && error">
      <p>There war an error {{ error }}</p>
    </div>
    <div class="loading-meal-data" v-else>Loading...</div>
  </section>
</template>
<script>
import { ref, onMounted } from "vue";
import FoodApi from "../api/food.js";
import { FilterType } from "../const/filterType";
export default {
  name: "list-categories",
  props: {},
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const catFilter = FilterType.CATEGORY;
    const fetchData = async () => {
      loading.value = true;
      try {
        let info = await FoodApi.getAllCategoriesWithImages();
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

    onMounted(() => {
      fetchData();
    });

    return {
      data,
      loading,
      error,
      catFilter,
    };
  },
};
</script>

<style lang="scss">
.categories-title {
  font-size: 1em;
  font-weight: 600;
  text-align: left;
}
.main-block__categories-title {
  margin: 0;
}
.main-block__list-categories {
  margin-top: 20px;
}
.list-categories {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 35px 25px;
  padding: 0;
  &__item {
    display: flex;
    width: calc(20% - 20px);

    margin-bottom: 30px;
    box-shadow: 0px 3px 3px 0px $food-item-border-color;
    border: 1px solid $food-item-border-color;
    border-radius: 5px;
    overflow: hidden;
    flex-direction: row;
    align-content: flex-start;
    flex-wrap: wrap;
  }
  &__link {
    text-decoration: none;
  }
  &__img-wrapper {
    overflow: hidden;
    width: 100%;
    max-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid $food-item-border-color;
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
  &__count {
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
}
@media only screen and (min-width: 1024px) and (max-width: 1700px) {
  .list-categories {
    gap: 20px 16px;
    &__item {
      width: calc(25% - 12px);
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .list-categories {
    gap: 20px 12px;
    &__item {
      width: calc(33% - 8px);
    }
  }
}
@media only screen and (min-width: 481px) and (max-width: 767px) {
  .list-categories {
    gap: 20px 10px;
    &__item {
      width: calc(50% - 5px);
    }
  }
}
@media only screen and (max-width: 480px) {
  .list-categories {
    justify-content: center;
    &__item {
      flex-basis: 100%;
    }
  }
}
</style>
