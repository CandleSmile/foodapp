import { foodApi } from "@/api/index";
import { checkSpaces } from "@/helpers/stringHelper";
import {
  SET_MEALS,
  SET_ERROR,
  SET_LOADING,
  SET_FOOD,
  GET_LATEST_MEAL_ACTION,
  GET_FILTERING_MEAL_ACTION,
  GET_FOOD_ACTION,
  MEALS,
  FOOD,
  SET_QUANTITY_OF_MEAL,
  UPDATE_QUANTITY_OF_MEAL_ACTION,
} from "@/store/storeConstants";

// initial state
const state = {
  meals: [],
  error: null,
  loading: false,
  foodData: null,
};

// getters
const getters = {
  [MEALS]: (state) =>
    state.meals?.map((meal) => {
      return {
        ...meal,
        checkSpacesTags: checkSpaces(meal.strTags ?? ""),
      };
    }),
  [FOOD]: (state) => state.foodData ?? [],
};

// actions
const actions = {
  async [GET_LATEST_MEAL_ACTION]({ commit }) {
    commit(SET_LOADING, true);
    try {
      const res = await foodApi.food.get.latestMeals();
      res.meals = res.meals.map((meal) => {
        return { ...meal, quantity: 0 };
      });
      commit(SET_MEALS, res.meals);
      commit(SET_ERROR, res.error);
    } catch (err) {
      commit(SET_ERROR, err);
    } finally {
      commit(SET_LOADING, false);
    }
  },

  async [GET_FILTERING_MEAL_ACTION]({ commit }, filters) {
    commit(SET_LOADING, true);
    try {
      const res = await foodApi.food.get.foodByFilters(filters);
      res.meals = res.meals.map((meal) => {
        return { ...meal, quantity: 0 };
      });
      commit(SET_MEALS, res.meals);
      commit(SET_ERROR, res.error);
    } catch (err) {
      commit(SET_ERROR, err);
    } finally {
      commit(SET_LOADING, false);
    }
  },

  async [GET_FOOD_ACTION]({ commit }, id) {
    commit(SET_LOADING, true);
    try {
      const res = await foodApi.food.get.foodById(id);
      commit(SET_FOOD, res.data.meals[0]);
      commit(SET_ERROR, res.error);
    } catch (err) {
      commit(SET_ERROR, err);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  async [UPDATE_QUANTITY_OF_MEAL_ACTION]({ commit }, { id, value }) {
    console.log(value);
    commit(SET_QUANTITY_OF_MEAL, { id, value });
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
  [SET_QUANTITY_OF_MEAL](state, { id, value }) {
    let food = state.meals.find((meal) => meal.idMeal == id);
    food.quantity = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
