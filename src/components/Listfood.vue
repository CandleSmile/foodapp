<template>
  <section class="meals-block">
    <h2 class="meals-title main-block__meals-title">{{ titleList }}</h2>
    <ul
      class="list-food main-block__list-food"
      v-if="!loading && meals && meals.length"
    >
      <li class="list-food__item" v-for="(meal, index) in meals" :key="index">
        <router-link
          :to="{ name: 'food', params: { id: meal.idMeal } }"
          class="list-food__link"
        >
          <div class="list-food__img-wrapper">
            <div
              v-if="meal.strTags && meal.strTags != ''"
              class="list-food__tags"
            >
              {{ checkSpaces(meal.strTags) }}
            </div>
            <img
              class="list-food__img"
              :src="meal.strMealThumb"
              :alt="meal.strMeal"
            />
          </div>
          <div class="list-food__info-wrapper">
            <div class="list-food__name">{{ meal.strMeal }}</div>
          </div>
          <div class="list-food__area-cat">
            <div v-if="meal.strCategory && meal.strCategory != ''">
              <span class="list-food__area-cat-title">Category: </span>
              <span> {{ meal.strCategory }}</span>
            </div>
            <div v-if="meal.strArea && meal.strArea != ''">
              <span class="list-food__area-cat-title">Area: </span>
              <span>{{ meal.strArea }}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>

    <div class="no-cat-data" v-else-if="!loading && meals && meals.length == 0">
      <p>Meals were not found</p>
    </div>
    <div class="error-cat-data" v-else-if="!loading && error">
      <p>There war an error {{ error }}</p>
    </div>
    <div class="loading-cat-data" v-else>Loading...</div>
  </section>
</template>

<script>
export default {
  name: "list-food",
  props: { titleList: String, meals: Array, loading: Boolean, error: Error },
  setup() {
    const checkSpaces = (text) => text.replaceAll(/,(\S)/, ", $1");

    return {
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
  justify-content: flex-start;
  gap: $meal-items-gap-large;
  padding: 0;
  &__item {
    display: flex;
    width: itemWidth($meal-count-large, $meal-items-gap-large);
    background-color: $meal-item-background;
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
    position: relative;
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

  &__name {
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
  &__area-cat {
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
  &__area-cat-title {
    font-weight: 700;
  }
  &__tags {
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
@media only screen and (min-width: 1700px) {
  .list-food {
    gap: $meal-items-gap-large;
    &__item {
      width: itemWidth($meal-count-supersize, $meal-items-gap-large);
    }
  }
}

@media only screen and (max-width: 1024px) {
  .list-food {
    gap: $meal-items-gap-large;
    &__item {
      width: itemWidth($meal-count-middle1, $meal-items-gap-large);
    }
  }
}

@media only screen and (min-width: 481px) and (max-width: 767px) {
  .list-food {
    gap: $meal-items-gap-small;
    &__item {
      width: itemWidth($meal-count-middle2, $meal-items-gap-small);
    }
  }
}
@media only screen and (max-width: 480px) {
  .list-food {
    justify-content: center;
    gap: $meal-items-gap-small;
    &__item {
      width: itemWidth($meal-count-small, $meal-items-gap-small);
    }
  }
}
</style>
