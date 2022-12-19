<template>
  <div class="search-form">
    <input
      type="text"
      :placeholder="placeholder"
      class="search-form__input"
      :id="id"
      v-model="query"
    />
    <input
      type="button"
      @click="onSearch"
      value="Search"
      class="search-form__button"
    />
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
.search-form {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  margin-bottom: 20px;
}
.search-form__button {
  flex-basis: 30px;
}
.search-form__input {
  flex-basis: 400px;
  margin-right: 20px;
  padding: 10px;
}
</style>
