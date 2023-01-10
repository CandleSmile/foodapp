import { foodApi } from "@/api/index";
import { FilterType } from "@/const/filterType";
import { toRaw } from "vue";
import {
  SET_SELECTED_CATEGORY,
  SET_SELECTED_INGREDIENTS,
  SET_SEARCH_STRING,
  SET_INGREDIENT_OPTIONS,
  SET_CATEGORY_OPTIONS,
  SET_FILTER_TAGS,
  UPDATE_SELECTED_FILTERS_ACTION,
  UPDATE_FILTER_TAGS_ACTION,
  GET_INGREDIENTS_OPTIONS_ACTION,
  GET_CATEGORY_OPTIONS_ACTION,
} from "@/store/storeConstants";

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
const getters = {};

// actions
const actions = {
  [UPDATE_SELECTED_FILTERS_ACTION]({ commit }, filters) {
    commit(
      SET_SELECTED_INGREDIENTS,
      filters[[FilterType.INGREDIENTS]] != ""
        ? toRaw(filters[[FilterType.INGREDIENTS]]).split(",")
        : []
    );
    commit(SET_SELECTED_CATEGORY, filters[[FilterType.CATEGORY]]);
    commit(SET_SEARCH_STRING, filters[[FilterType.SEARCH]]);
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

    commit(SET_FILTER_TAGS, selectedFilterTags);
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
    commit(SET_INGREDIENT_OPTIONS, ingredientsOptions);
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
    }
    commit(SET_CATEGORY_OPTIONS, catOptions);
  },
};

// mutations
const mutations = {
  [SET_SELECTED_CATEGORY](state, category) {
    state.selectedFilters.category = category;
  },
  [SET_SELECTED_INGREDIENTS](state, ingredients) {
    state.selectedFilters.ingredients = ingredients;
  },
  [SET_SEARCH_STRING](state, searchString) {
    state.selectedFilters.searchString = searchString;
  },
  [SET_INGREDIENT_OPTIONS](state, ingredientsOptions) {
    state.ingredientsOptions = ingredientsOptions;
  },
  [SET_CATEGORY_OPTIONS](state, categoriesOptions) {
    state.categoryOptions = categoriesOptions;
  },
  [SET_FILTER_TAGS](state, filterTags) {
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
