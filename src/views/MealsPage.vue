<template>
  <FilterTags is-latest-products="false"></FilterTags>
  <Listfood title-list="Products"></Listfood>
</template>
<script>
import Listfood from "../components/Listfood.vue";
import FilterTags from "../components/FilterTags.vue";

export default {
  name: "MealsPage",
  components: {
    Listfood,
    FilterTags,
  },
};
</script>

<style></style>
