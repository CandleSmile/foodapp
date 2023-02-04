<template>
  <button @click="load">Load</button>
</template>
<script setup>
import { foodApi } from "@/api/index";
import { oldApi } from "@/api/oldIndex";
import { FilterType } from "../const/filterType";

const load = async () => {
  const categories = await oldApi.categories.get.allCategoriesWithImages();
  console.log(categories);
  const ingredients = await oldApi.ingredients.get.ingredients();
  const areas = await oldApi.areas.get.areas();
  let filters = {
    [FilterType.CATEGORY]: "",
    [FilterType.SEARCH]: "",
    [FilterType.INGREDIENTS]: "",
  };
  const res = await oldApi.food.get.foodByFilters(filters);
  let meals = res.meals;
  meals = meals.map((meal) => {
    meal.strIngredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`] != "") {
        meal.strIngredients.push(meal[`strIngredient${i}`]);
      }
    }

    meal.strTagsList = meal.strTags
      ? meal.strTags?.split(",").map((x) => x.trim())
      : [];
    return meal;
  });

  console.log({
    categories: categories.categories,
    ingredients: ingredients.data,
    areas: areas.data,
    meals: meals,
  });

  const resload = await foodApi.loadDb.load({
    categories: categories.categories,
    ingredients: ingredients.data,
    areas: areas.data,
    meals: meals,
  });
  console.log(resload);
};
</script>
<style scoped></style>
