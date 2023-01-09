import { foodApi } from "@/api/index";

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
  getCategories({ commit }) {
    commit("setLoading", true);
    foodApi.categories.get.allCategoriesWithImages((res) => {
      commit("setCategories", res);
      commit("setLoading", false);
    });
  },
};

// mutations
const mutations = {
  setCategories(state, payload) {
    state.categories = payload.categories;
    state.error = payload.error?.message;
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
