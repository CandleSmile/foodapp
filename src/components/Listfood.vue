<template>
  <section class="list-food">
    <h2 class="list-food__title">{{ titleList }}</h2>
    <ul class="list-food__meals" v-if="mealsList && mealsList.length > 0">
      <li
        class="list-food__meals-item"
        v-for="meal in mealsList"
        :key="meal.idMeal"
      >
        <router-link
          :to="{ name: 'food', params: { id: meal.idMeal } }"
          class="list-food__meals-item-link"
        >
          <div class="list-food__meals-item-img-wrapper">
            <div
              v-if="meal.strTags && meal.strTags != ''"
              class="list-food__meals-item-tags"
            >
              {{ meal.checkSpacesTags }}
            </div>
            <img
              class="list-food__meals-item-img"
              :src="meal.strMealThumb"
              :alt="meal.strMeal"
            />
          </div>
          <div class="list-food__meals-item-info-wrapper">
            <div class="list-food__meals-item-name">{{ meal.strMeal }}</div>
          </div>
          <div class="list-food__meals-item-area-cat">
            <div v-if="meal.strCategory && meal.strCategory != ''">
              <span class="list-food__meals-item-area-cat-title"
                >Category:
              </span>
              <span> {{ meal.strCategory }}</span>
            </div>
            <div v-if="meal.strArea && meal.strArea != ''">
              <span class="list-food__meals-item-area-cat-title">Area: </span>
              <span>{{ meal.strArea }}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>

    <div
      class="list-food__no-meals-data"
      v-else-if="mealsList && mealsList.length == 0"
    >
      <p>Meals were not found</p>
    </div>
    <div class="list-food__error-meal-data" v-else>
      <p>There war an error {{ error }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "ListFood",
  props: {
    titleList: String,
    isLatestMeals: Boolean,
    mealsList: Array,
    error: String,
  },
  setup() {},
};
</script>

<style lang="scss">
.list-food {
  &__title {
    font-size: 1em;
    font-weight: 600;
    text-align: left;
  }

  &__meals {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: $meal-items-gap-large;
    padding: 20px 0;
    &-item {
      display: flex;
      width: itemWidth($meal-count-supersize, $meal-items-gap-large);
      background-color: $meal-item-background;
      min-height: 200px;
      box-shadow: 0px 3px 3px 0px $food-item-border-color;
      border-radius: 5px;
      overflow: hidden;

      &-link {
        display: flex;
        flex-basis: 100%;
        height: 100%;
        flex-direction: row;
        align-content: flex-start;
        flex-wrap: wrap;
        text-decoration-line: none;
        width: 100%;
      }
      &-img-wrapper {
        overflow: hidden;
        max-height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      &-img {
        width: 100%;
      }
      &-info-wrapper {
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        padding: 10px;
        width: 100%;
      }

      &-name {
        flex-basis: 100%;
        color: $text-dark-color;
        text-align: left;
        font-size: 0.8em;
        font-weight: 700;
        line-height: 1.3em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &-area-cat {
        flex-basis: 100%;
        color: $text-light-color;
        font-size: 0.6em;
        text-align: left;
        border-top: 1px dashed $text-light-color;
        padding: 5px 10px;
        line-height: 1.5em;
        min-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &-area-cat-title {
        font-weight: 700;
      }
      &-tags {
        position: absolute;
        top: 0;
        right: 0;
        background: $meal-tags-color-background;
        border-end-start-radius: 5px;
        padding: 0.3em 0.7em;
        color: $meal-tags-color-text;
        font-size: 0.7em;
      }
    }
  }
}
@media only screen and (max-width: $mediaExtraLarge) {
  .list-food__meals {
    gap: $meal-items-gap-large;
    &-item {
      width: itemWidth($meal-count-large, $meal-items-gap-large);
    }
  }
}

@media only screen and (max-width: $mediaSmallScreen) {
  .list-food__meals {
    gap: $meal-items-gap-large;
    &-item {
      width: itemWidth($meal-count-middle1, $meal-items-gap-large);
    }
  }
}

@media only screen and (max-width: $mediaTablets) {
  .list-food__meals {
    gap: $meal-items-gap-small;
    &-item {
      width: itemWidth($meal-count-middle2, $meal-items-gap-small);
    }
  }
}
@media only screen and (max-width: $mediaMobile) {
  .list-food__meals {
    justify-content: center;
    gap: $meal-items-gap-small;
    &-item {
      width: itemWidth($meal-count-small, $meal-items-gap-small);
    }
  }
}
</style>
