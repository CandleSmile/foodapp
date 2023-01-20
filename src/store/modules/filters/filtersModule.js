import { foodApi } from "@/api/index";
import { FilterType } from "@/const/filterType";

import {
  UPDATE_SELECTED_FILTERS_ACTION,
  UPDATE_FILTER_TAGS_ACTION,
  GET_INGREDIENTS_OPTIONS_ACTION,
  GET_CATEGORY_OPTIONS_ACTION,
  INGREDIENT_OPTIONS,
  CATEGORY_OPTIONS,
  FILTER_TAGS,
  SELECTED_CATEGORY,
  SELECTED_INGREDIENTS,
  UPDATE_SELECTED_CATEGORY_ACTION,
  UPDATE_SELECTED_INGREDIENTS_ACTION,
  UPDATE_SEARCH_ACTION,
  SEARCH_STRING,
} from "@/store/storeConstants";

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

const mapFilters = (filters) =>
  filters?.map((tag) => ({
    ...tag,
    className: classByTagType(tag.type),
  }));

// initial state
const state = {
  selectedFilters: {
    ingredients: [],
    category: "",
    searchString: "",
  },

  ingredientsOptions: [],
  categoryOptions: [],
  existingFiltersTags: [],
};

// getters
const getters = {
  [INGREDIENT_OPTIONS]: ({ ingredientsOptions }) => ingredientsOptions,
  [CATEGORY_OPTIONS]: ({ categoryOptions }) => categoryOptions,
  [FILTER_TAGS]: ({ existingFiltersTags }) => mapFilters(existingFiltersTags),
  [SELECTED_CATEGORY]: ({ selectedFilters: { category } }) => category,
  [SELECTED_INGREDIENTS]: ({ selectedFilters: { ingredients } }) => ingredients,
  [SEARCH_STRING]: ({ selectedFilters: { searchString } }) => searchString,
};

// actions
const actions = {
  [UPDATE_SELECTED_CATEGORY_ACTION]({ commit }, categoryValue) {
    commit("setSelectedCategory", categoryValue);
  },

  [UPDATE_SELECTED_INGREDIENTS_ACTION]({ commit }, ingredientsValue) {
    commit("setSelectedIngredients", ingredientsValue);
  },

  [UPDATE_SEARCH_ACTION]({ commit }, searchString) {
    commit("setSearchString", searchString);
  },

  [UPDATE_SELECTED_FILTERS_ACTION]({ commit }, filters) {
    commit(
      "setSelectedIngredients",
      filters[[FilterType.INGREDIENTS]] != ""
        ? filters[[FilterType.INGREDIENTS]].split(",")
        : []
    );
    commit("setSelectedCategory", filters[[FilterType.CATEGORY]]);
    commit("setSearchString", filters[[FilterType.SEARCH]]);
  },

  [UPDATE_FILTER_TAGS_ACTION]({ commit }, filters) {
    const selectedFilterTags = [];
    for (let key in filters) {
      if (key === FilterType.INGREDIENTS && filters[key] != "") {
        const ingredientsArr = filters[key].split(",");
        ingredientsArr.forEach((ing) =>
          selectedFilterTags.push({
            type: FilterType.INGREDIENTS,
            val: ing,
          })
        );
      } else if (filters[key] != "") {
        selectedFilterTags.push({
          type: key,
          val: filters[key],
        });
      }
    }

    commit("setFilterTags", selectedFilterTags);
  },

  async [GET_INGREDIENTS_OPTIONS_ACTION]({ commit }) {
    const ingredientsOptions = [];
    const ingredientList = await foodApi.ingredients.get.ingredients();
    try {
      if (ingredientList.ok & (ingredientList.data?.length > 0)) {
        ingredientList.data.forEach((ing) =>
          ingredientsOptions.push(ing.strIngredient)
        );
      } else if (!ingredientList.ok) {
        ingredientsOptions.push("can't load ingredients");
      }
    } catch (err) {
      ingredientsOptions.push("can't load ingredients");
    }
    commit("setIngredientsOptions", ingredientsOptions);
  },

  async [GET_CATEGORY_OPTIONS_ACTION]({ commit }) {
    const catOptions = [];
    try {
      const catList = await foodApi.categories.get.listCategories();
      if (catList.ok && catList.data?.length > 0) {
        catList.data.forEach((cat) => catOptions.push(cat.strCategory));
      } else if (!catList.ok) {
        catOptions.push("can't load categories");
      }
    } catch (err) {
      catOptions.push("can't load categories");
    } finally {
      commit("setCategoryOptions", catOptions);
    }
  },
};

// mutations
const mutations = {
  setSelectedCategory(state, category) {
    state.selectedFilters.category = category;
  },
  setSelectedIngredients(state, ingredients) {
    state.selectedFilters.ingredients = ingredients;
  },
  setSearchString(state, searchString) {
    state.selectedFilters.searchString = searchString;
  },
  setIngredientsOptions(state, ingredientsOptions) {
    state.ingredientsOptions = ingredientsOptions;
  },
  setCategoryOptions(state, categoriesOptions) {
    state.categoryOptions = categoriesOptions;
  },
  setFilterTags(state, filterTags) {
    state.existingFiltersTags = filterTags;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
