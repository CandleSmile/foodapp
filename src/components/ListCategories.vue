<template>
  <section class="list-categories">
    <h2 class="list-categories__title">Categories</h2>
    <ul class="list-categories__categories" v-if="data && data.length > 0">
      <li
        class="list-categories__categories-item"
        v-for="(cat, index) in data"
        :key="index"
      >
        <router-link
          class="list-categories__categories-item-link"
          :to="{
            name: 'meal',
            query: { [catFilter]: cat.strCategory },
          }"
        >
          <div class="list-categories__categories-item-img-wrapper">
            <img
              class="list-categories__categories-item-img"
              :src="cat.strCategoryThumb"
              :alt="cat.strCategory"
            />
          </div>
          <div class="list-categories__categories-item-info-wrapper">
            <div class="list-categories__categories-item-name">
              {{ cat.strCategory }}
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div
      class="categories-item__input-request-meal-block"
      v-else-if="data == null && error == null"
    >
      <p>Please, input your request</p>
    </div>
    <div
      class="categories-item__no-cat-data"
      v-else-if="data && data.length == 0"
    >
      <p>Categories were not found</p>
    </div>
    <div class="categories-item__error-cat-data" v-else>
      <p>There war an error {{ error }}</p>
    </div>
  </section>
</template>
<script>
import { FilterType } from "../const/filterType";
export default {
  name: "list-categories",
  props: { data: Array, error: Error },
  setup() {
    const catFilter = FilterType.CATEGORY;

    return {
      catFilter,
    };
  },
};
</script>

<style lang="scss">
.list-categories {
  &__title {
    font-size: 1em;
    font-weight: 600;
    text-align: left;
  }

  &__categories {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: $cat-items-gap-large;
    padding: 20px 0;
    &-item {
      display: flex;
      width: itemWidth($cat-count-large, $cat-items-gap-large);
      box-shadow: 0px 3px 3px 0px $food-item-border-color;
      border: 1px solid $food-item-border-color;
      border-radius: 5px;
      overflow: hidden;
      background-color: $cat-item-background;
      flex-direction: row;
      align-content: flex-start;
      flex-wrap: wrap;
      &-link {
        text-decoration: none;
      }
      &-img-wrapper {
        overflow: hidden;
        width: 100%;
        max-height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid $food-item-border-color;
      }
      &-img {
        width: 100%;
      }
      &-info-wrapper {
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        padding: 10px;
      }

      &-name {
        flex-basis: 100%;
        color: $text-dark-color;
        text-align: left;
        font-size: 0.8em;
        font-weight: 600;
        line-height: 1.3em;
      }
    }
  }
}

@media only screen and (min-width: 1700px) {
  .list-categories__categories {
    gap: $cat-items-gap-large;
    &-item {
      width: itemWidth($cat-count-supersize, $cat-items-gap-large);
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 1200px) {
  .list-categories__categories {
    gap: $cat-items-gap-large;
    &-item {
      width: itemWidth($cat-count-middle1, $cat-items-gap-large);
    }
  }
}
@media only screen and (min-width: 481px) and (max-width: 767px) {
  .list-categories__categories {
    gap: $cat-items-gap-small;
    &-item {
      width: itemWidth($cat-count-middle2, $cat-items-gap-small);
    }
  }
}
@media only screen and (max-width: 480px) {
  .list-categories__categories {
    gap: $cat-items-gap-small;
    &-item {
      width: itemWidth($cat-count-small, $cat-items-gap-small);
    }
  }
}
</style>
