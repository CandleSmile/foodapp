<template>
  <div class="filter-tags-panel" v-if="filtersToArray.length > 0">
    <ul class="filter-tags-list">
      <li
        :class="[
          {
            'filter-tags-list-item--catecory-theme':
              tag.type == FilterType.CATEGORY,
            'filter-tags-list-item--search-theme':
              tag.type == FilterType.SEARCH,
          },
          'filter-tags-list-item',
        ]"
        v-for="(tag, index) in filtersToArray"
        :key="index"
      >
        {{ tag.val }}
        <span
          class="filter-tags-list-item__remove-filter"
          @click="deleteFromFilters(tag)"
        ></span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { FilterType } from "@/const/filterType";
import { filters } from "@/filters";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();
const deleteFromFilters = (tag) => {
  let routeQuery = Object.assign({}, route.query);
  delete routeQuery[[tag.type]];
  router.push({ name: "meal", query: routeQuery });
};

const filtersToArray = computed(() => {
  let filtersArray = [];
  for (let key in filters) {
    if (key !== FilterType.SEARCH)
      filtersArray = filtersArray.concat(
        filters[key].map((val) => {
          return { type: key, val: val };
        })
      );
    else if (key === FilterType.SEARCH && filters[key] != "") {
      filtersArray.push({ type: FilterType.SEARCH, val: filters[key] });
    }
  }
  return filtersArray;
});
</script>
<style lang="scss">
.filter-tags-list {
  display: flex;
  flex-direction: row;
  gap: 10px;
  list-style: none;
  padding: 0;
}
.filter-tags-list-item {
  padding: 2px 5px;
  padding: 0 0.5em;
  border-radius: 5px;
  font-size: 0.8em;
  color: $filter-tag-text;
  display: flex;

  &__remove-filter {
    display: inline-flex;
    width: 1rem;
    height: 1rem;
    position: relative;
    cursor: pointer;
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0.8rem;
      height: 0.11rem;
      background-color: #e12c21;
      margin: -0.05rem 0 0 -0.2rem;
      transform: rotate(-45deg);
    }
    &::after {
      transform: rotate(45deg);
    }
  }
  &--catecory-theme {
    background: $filter-tag-cat-background;
  }
  &--search-theme {
    background: $filter-tag-search-background;
  }
}
</style>
