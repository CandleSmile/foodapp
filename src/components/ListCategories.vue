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
import { FilterType } from "../const/filterType";
export default {
  name: "list-categories",
  props: { data: Array, error: Error, loading: Boolean },
  setup() {
    const catFilter = FilterType.CATEGORY;

    return {
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
  justify-content: flex-start;
  gap: catGap("sizeL");
  padding: 0;
  &__item {
    display: flex;
    width: catWidth("sizeL");
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

@media only screen and (min-width: 1700px) {
  .list-categories {
    gap: catGap("sizeSL");
    &__item {
      width: catWidth("sizeSL");
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 1200px) {
  .list-categories {
    gap: catGap("sizeM1");
    &__item {
      width: catWidth("sizeM1");
    }
  }
}
@media only screen and (min-width: 481px) and (max-width: 767px) {
  .list-categories {
    gap: catGap("sizeM2");
    &__item {
      width: catWidth("sizeM2");
    }
  }
}
@media only screen and (max-width: 480px) {
  .list-categories {
    gap: catGap("sizeS");
    &__item {
      width: catWidth("sizeS");
    }
  }
}
</style>
