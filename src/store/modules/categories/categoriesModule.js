import { foodApi } from "@/api/index";
import {
  GET_CATEGORIES_ACTION,
  CATEGORIES,
  ERROR,
  LOADING,
} from "@/store/storeConstants";

// initial state
const state = {
  categories: [],
  error: "",
  loading: false,
};

// getters
const getters = {
  [CATEGORIES]: ({ categories }) => categories,
  [ERROR]: ({ error }) => error,
  [LOADING]: ({ loading }) => loading,
};

// actions
const actions = {
  async [GET_CATEGORIES_ACTION]({ commit }) {
    commit("setLoading", true);
    try {
      const res = await foodApi.categories.get.listCategories();
      commit("setCategories", res.categories);
      commit("setError", res.error);
    } catch (err) {
      commit("setError", err);
    } finally {
      commit("setLoading", false);
    }
  },
};

// mutations
const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  },
  setError(state, error) {
    state.error = error?.message;
  },
  setLoading(state, isLoading) {
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
