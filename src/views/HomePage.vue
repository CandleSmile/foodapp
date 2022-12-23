<template>
  <ListCategories></ListCategories>
  <Listfood is-latest-products="true" title-list="Latest Products"></Listfood>
</template>

<script>
import Listfood from "../components/Listfood.vue";
import ListCategories from "../components/ListCategories.vue";

export default {
  name: "HomePage",
  components: {
    Listfood,
    ListCategories,
  },
};
</script>
