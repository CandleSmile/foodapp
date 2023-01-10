import { foodApi } from "@/api/index";
import {
  SET_CATEGORIES,
  SET_ERROR,
  SET_LOADING,
  GET_CATEGORIES_ACTION,
} from "@/store/storeConstants";

// initial state
const state = {
  categories: [],
  error: null,
  loading: false,
};

// getters
const getters = {};

// actions
const actions = {
  async [GET_CATEGORIES_ACTION]({ commit }) {
    commit(SET_LOADING, true);
    try {
      const res = await foodApi.categories.get.allCategoriesWithImages();
      commit(SET_CATEGORIES, res.categories);
      commit(SET_ERROR, res.error);
    } catch (err) {
      commit(SET_ERROR, err);
    }
    commit(SET_LOADING, false);
  },
};

// mutations
const mutations = {
  [SET_CATEGORIES](state, categories) {
    state.categories = categories;
  },
  [SET_ERROR](state, error) {
    state.error = error?.message;
  },
  [SET_LOADING](state, isLoading) {
    state.loading = isLoading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
