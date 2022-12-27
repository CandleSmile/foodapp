<template>
  <FilterTags></FilterTags>
  <FilterPanel></FilterPanel>
  <Listfood title-list="Products"></Listfood>
</template>
<script>
import Listfood from "../components/Listfood.vue";
import FilterTags from "../components/FilterTags.vue";
import FilterPanel from "../components/FilterPanel.vue";
export default {
  name: "MealsPage",
  components: {
    Listfood,
    FilterTags,
    FilterPanel,
  },
};
</script>

<style></style>
