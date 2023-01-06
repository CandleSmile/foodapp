<template>
  <section class="filter-tags-panel" v-if="filterTags && filterTags.length > 0">
    <ul class="filter-tags-panel__list">
      <li
        :class="[tag.className, 'filter-tags-panel__list-item']"
        v-for="(tag, index) in filterTags"
        :key="index"
      >
        {{ tag.val }}
        <span
          class="filter-tags-panel__list-item-remove-filter"
          @click="deleteFromFilters(tag)"
        ></span>
      </li>
    </ul>
  </section>
</template>
<script setup>
import { FilterType } from "@/const/filterType";
import { useRouter, useRoute } from "vue-router";
import { defineProps, computed } from "vue";
const props = defineProps({
  initialFilterTags: Array,
});

const router = useRouter();
const route = useRoute();

const classByTagType = (tagType) => {
  let className = "";
  switch (tagType) {
    case FilterType.CATEGORY:
      className = "filter-tags-panel__list-item--category-theme";
      break;
    case FilterType.SEARCH:
      className = "filter-tags-panel__list-item--search-theme";
      break;
    default:
      className = "filter-tags-panel__list-item--ingredients-theme";
  }
  return className;
};

const filterTags = computed(() =>
  props.initialFilterTags.map((f) => {
    return { ...f, className: classByTagType(f.type) };
  })
);

const deleteFromFilters = (tag) => {
  let routeQuery = Object.assign({}, route.query);
  if (tag.type === FilterType.INGREDIENTS) {
    let ingredientsArr = routeQuery[[tag.type]]
      ? routeQuery[[tag.type]].split(",")
      : [];
    ingredientsArr = ingredientsArr.filter((ing) => ing != tag.val);
    ingredientsArr.length > 0
      ? (routeQuery[[tag.type]] = ingredientsArr.join(","))
      : delete routeQuery[[tag.type]];
  } else delete routeQuery[[tag.type]];

  router.push({ name: "meal", query: routeQuery });
};
</script>
<style lang="scss">
.filter-tags-panel__list {
  display: flex;
  flex-direction: row;
  gap: 10px;
  list-style: none;
  padding: 0 0 10px 0;

  &-item {
    padding: 2px 5px;
    padding: 0 0.5em;
    border-radius: 5px;
    font-size: 0.8em;
    color: $filter-tag-text;
    display: flex;

    &-remove-filter {
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
        background-color: #fff;
        margin: -0.05rem 0 0 -0.2rem;
        transform: rotate(-45deg);
      }
      &::after {
        transform: rotate(45deg);
      }
    }
    &--category-theme {
      background: $filter-tag-cat-background;
    }
    &--search-theme {
      background: $filter-tag-search-background;
    }
    &--ingredients-theme {
      background: $filter-tag-ingredients-background;
    }
  }
}
</style>
