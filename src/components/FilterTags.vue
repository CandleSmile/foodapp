<template>
  <section class="filter-tags-panel" v-if="tags && tags.length > 0">
    <ul class="filter-tags-panel__list">
      <li
        :class="[tag.className, 'filter-tags-panel__list-item']"
        v-for="tag in tags"
        :key="tag.val.id"
      >
        {{ tag.val.name }}
        <span
          class="filter-tags-panel__list-item-remove-filter"
          @click="$emit('deleteTag', tag)"
        ></span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { defineEmits, defineProps, computed } from "vue";
import { FilterType } from "@/const/filterType";

defineEmits(["deleteTag"]);
const props = defineProps(["filterTags"]);

const tags = computed(() =>
  props.filterTags?.map((tag) => ({
    ...tag,
    className: classByTagType(tag.type),
  }))
);

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
