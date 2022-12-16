<template>
  <div class="searchForm">
    <input
      type="text"
      :placeholder="placeholder"
      class="searchstring"
      :id="id"
      v-model="query"
    />
    <input type="button" @click="onSearch" value="Search" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
defineProps({ id: String, placeholder: String });
const emit = defineEmits(["entersearch"]);
const query = ref("");

const onSearch = () => {
  emit("entersearch", query.value);
};
</script>

<style scoped>
.searchForm {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  margin-bottom: 20px;
}
.searchForm > input[type="button"] {
  flex-basis: 30px;
}
.searchForm .searchstring {
  flex-basis: 400px;
  margin-right: 20px;
  padding: 10px;
}
</style>
