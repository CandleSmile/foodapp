import { foodApi } from "@/api/index";
import {
  SET_MEALS,
  SET_ERROR,
  SET_LOADING,
  SET_FOOD,
  GET_LATEST_MEAL_ACTION,
  GET_FILTERING_MEAL_ACTION,
  GET_FOOD_ACTION,
} from "@/store/storeConstants";

// initial state
const state = {
  meals: [],
  error: null,
  loading: false,
  foodData: null,
};

// getters
const getters = {};

// actions
const actions = {
  async [GET_LATEST_MEAL_ACTION]({ commit }) {
    commit(SET_LOADING, true);
    try {
      const res = await foodApi.food.get.latestMeals();
      commit(SET_MEALS, res.meals);
      commit(SET_ERROR, res.error);
    } catch (err) {
      commit(SET_ERROR, err);
    }
    commit(SET_LOADING, false);
  },

  async [GET_FILTERING_MEAL_ACTION]({ commit }, filters) {
    commit(SET_LOADING, true);
    try {
      const res = await foodApi.food.get.foodByFilters(filters);
      commit(SET_MEALS, res.meals);
      commit(SET_ERROR, res.error);
    } catch (err) {
      commit(SET_ERROR, err);
    }
    commit(SET_LOADING, false);
  },

  async [GET_FOOD_ACTION]({ commit }, id) {
    commit(SET_LOADING, true);
    try {
      const res = await foodApi.food.get.foodById(id);
      commit(SET_FOOD, res.data.meals[0]);
      commit(SET_ERROR, res.error);
    } catch (err) {
      commit(SET_ERROR, err);
    }

    commit(SET_LOADING, false);
  },
};

// mutations
const mutations = {
  [SET_MEALS](state, meals) {
    state.meals = meals;
  },
  [SET_ERROR](state, error) {
    state.error = error?.message;
  },
  [SET_LOADING](state, isLoading) {
    state.loading = isLoading;
  },
  [SET_FOOD](state, foodData) {
    state.foodData = foodData;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
