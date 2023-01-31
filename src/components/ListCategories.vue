<template>
  <section class="list-categories">
    <h2 class="list-categories__title">Categories</h2>

    <ul
      class="list-categories__categories"
      v-if="categoriesList && categoriesList.length > 0"
    >
      <li
        class="list-categories__categories-item"
        v-for="category in categoriesList"
        :key="category.name"
      >
        <router-link
          class="list-categories__categories-item-link"
          :to="{
            name: 'meal',
            query: { [categoryFilter]: category.id },
          }"
        >
          <div class="list-categories__categories-item-img-wrapper">
            <img
              class="list-categories__categories-item-img"
              :src="category.image"
              :alt="category.name"
            />
          </div>
          <div class="list-categories__categories-item-name">
            {{ category.name }}
          </div>
        </router-link>
      </li>
    </ul>
  </section>
</template>
<script>
import { FilterType } from "../const/filterType";
export default {
  name: "list-categories",
  props: ["categoriesList"],
  setup() {
    const categoryFilter = FilterType.CATEGORY;
    return {
      categoryFilter,
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
    display: grid;
    grid-template-columns: repeat($cat-count-supersize, 1fr);
    gap: $cat-items-gap-large;
    padding: 20px 0;
    gap: $cat-items-gap-large;

    &-item {
      box-shadow: 0px 3px 3px 0px $food-item-border-color;
      border: 1px solid $food-item-border-color;
      border-radius: 5px;
      overflow: hidden;
      background-color: $cat-item-background;

      &-link {
        text-decoration: none;
        display: grid;
        grid-template-columns: 1fr;
      }

      &-img {
        width: 100%;

        &-wrapper {
          overflow: hidden;
          width: 100%;
          max-height: 150px;
          border-bottom: 1px solid $food-item-border-color;
        }
      }

      &-name {
        color: $text-dark-color;
        text-align: left;
        font-size: 0.8em;
        font-weight: 600;
        line-height: 1.3em;
        padding: 10px;
      }
    }
  }
}

@media only screen and (max-width: $mediaExtraLarge) {
  .list-categories__categories {
    grid-template-columns: repeat($cat-count-large, 1fr);
    gap: $cat-items-gap-large;
  }
}

@media only screen and (max-width: $mediaSmallScreen) {
  .list-categories__categories {
    grid-template-columns: repeat($cat-count-middle1, 1fr);
    gap: $cat-items-gap-large;
  }
}

@media only screen and (max-width: $mediaTablets) {
  .list-categories__categories {
    grid-template-columns: repeat($cat-count-middle2, 1fr);
    gap: $cat-items-gap-small;
  }
}

@media only screen and (max-width: $mediaMobile) {
  .list-categories__categories {
    grid-template-columns: repeat($cat-count-small, 1fr);
    gap: $cat-items-gap-small;
  }
}
</style>
