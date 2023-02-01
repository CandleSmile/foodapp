import { statusCodes } from "@/api/consts/statusCodes";
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

// initial state
const state = {
  selectedFilters: {
    ingredients: [],
    category: "",
    searchString: "",
  },

  ingredients: [],
  categories: [],
  existingFiltersTags: [],
};

// getters
const getters = {
  [INGREDIENT_OPTIONS]: ({ ingredients }) => {
    if (ingredients.length > 0) {
      return ingredients.map((ingredient) => ({
        id: ingredient.id.toString(),
        label: ingredient.name,
      }));
    } else {
      return ["can't load ingredients"];
    }
  },
  [CATEGORY_OPTIONS]: ({ categories }) => {
    if (categories.length > 0)
      return categories.map((category) => ({
        id: category.id.toString(),
        label: category.name,
      }));
    else return ["can't load categories"];
  },
  [FILTER_TAGS]: ({ existingFiltersTags }) => existingFiltersTags,
  [SELECTED_CATEGORY]: ({ selectedFilters: { category } }) => category,
  [SELECTED_INGREDIENTS]: ({ selectedFilters: { ingredients } }) => ingredients,
  [SEARCH_STRING]: ({ selectedFilters: { searchString } }) => searchString,
};

// actions
const actions = {
  [UPDATE_SELECTED_CATEGORY_ACTION]({ commit }, category) {
    commit("setSelectedCategory", category ?? "");
  },

  [UPDATE_SELECTED_INGREDIENTS_ACTION]({ commit }, ingredientsValue) {
    commit("setSelectedIngredients", ingredientsValue ?? []);
  },

  [UPDATE_SEARCH_ACTION]({ commit }, searchString) {
    commit("setSearchString", searchString);
  },

  [UPDATE_SELECTED_FILTERS_ACTION]({ commit }, filters) {
    const checkedIngredients =
      filters[[FilterType.INGREDIENTS]] != ""
        ? filters[[FilterType.INGREDIENTS]].split(",")
        : [];
    let category = filters[[FilterType.CATEGORY]];

    commit("setSelectedIngredients", checkedIngredients);
    commit("setSelectedCategory", category);
    commit("setSearchString", filters[[FilterType.SEARCH]]);
  },

  [UPDATE_FILTER_TAGS_ACTION]({ commit, state }, filters) {
    const selectedFilterTags = [];
    for (let key in filters) {
      if (key === FilterType.INGREDIENTS && filters[key] != "") {
        const ingredientsArr = filters[key].split(",");
        ingredientsArr.forEach((ing) => {
          const ingredientObj = state.ingredients.find(
            (ingredient) => ingredient.id == Number(ing)
          );
          selectedFilterTags.push({
            type: FilterType.INGREDIENTS,
            val: { id: ingredientObj.id, name: ingredientObj.name },
          });
        });
      } else if (key === FilterType.CATEGORY && filters[key] != "") {
        const categoryId = filters[key];
        const categoryObj = state.categories.find(
          (category) => category.id == Number(categoryId)
        );

        selectedFilterTags.push({
          type: FilterType.CATEGORY,
          val: { id: categoryObj.id, name: categoryObj.name },
        });
      } else if (filters[key] != "") {
        selectedFilterTags.push({
          type: key,
          val: { id: filters[key], name: filters[key] },
        });
      }
    }

    commit("setFilterTags", selectedFilterTags);
  },

  async [GET_INGREDIENTS_OPTIONS_ACTION]({ commit }) {
    try {
      const ingredientList = await foodApi.ingredients.get.ingredients();
      if (
        ingredientList.status == statusCodes.OK &&
        ingredientList.data?.length > 0
      ) {
        commit("setIngredients", ingredientList.data);
      } else {
        commit("setIngredients", []);
      }
    } catch (err) {
      commit("setIngredients", []);
    }
  },

  async [GET_CATEGORY_OPTIONS_ACTION]({ commit }) {
    try {
      const catList = await foodApi.categories.get.listCategories();
      if (catList.status == statusCodes.OK && catList.categories?.length > 0) {
        commit("setCategories", catList.categories);
      } else if (!(catList.status == statusCodes.OK)) {
        commit("setCategories", []);
      }
    } catch (err) {
      commit("setCategories", []);
    }
  },
};

// mutations
const mutations = {
  setSelectedCategory(state, category) {
    state.selectedFilters.category = category;
  },
  setSelectedIngredients(state, ingredients) {
    state.selectedFilters.ingredients = ingredients ?? [];
  },
  setSearchString(state, searchString) {
    state.selectedFilters.searchString = searchString;
  },
  setIngredients(state, ingredientsOptions) {
    state.ingredients = ingredientsOptions;
  },
  setCategories(state, categoriesOptions) {
    state.categories = categoriesOptions;
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
