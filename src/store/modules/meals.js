import { foodApi } from "@/api/index";
import { checkSpaces } from "@/helpers/stringHelper";
import {
  GET_LATEST_MEAL_ACTION,
  GET_FILTERING_MEAL_ACTION,
  GET_FOOD_ACTION,
  MEALS,
  FOOD,
  UPDATE_QUANTITY_OF_MEAL_ACTION,
  MEALS_IN_CART,
  UPDATE_QUANTITY_OF_FOOD_ACTION,
  ERROR,
  LOADING,
} from "@/store/storeConstants";

const mapMeals = (meals) =>
  meals?.map((meal) => ({
    ...meal,
    checkSpacesTags: checkSpaces(meal.strTags ?? ""),
  }));
const getMealsWithQuantityField = (meals, itemsInCart) =>
  meals.map((meal) => {
    const foundItem = itemsInCart.find((item) => item.id == meal.idMeal);
    return { ...meal, quantity: foundItem ? foundItem.quantity : 0 };
  });
// initial state
const state = {
  meals: [],
  error: null,
  loading: false,
  foodData: null,
};

// getters
const getters = {
  [MEALS]: ({ meals }) => mapMeals(meals),
  [FOOD]: ({ foodData }) => foodData ?? [],
  [ERROR]: ({ error }) => error,
  [LOADING]: ({ loading }) => loading,
};

// actions
const actions = {
  async [GET_LATEST_MEAL_ACTION]({ commit, rootGetters }) {
    commit("setLoading", true);
    try {
      const itemsInCart = rootGetters[`cart/${MEALS_IN_CART}`];
      const res = await foodApi.food.get.latestMeals();
      res.meals = getMealsWithQuantityField(res.meals, itemsInCart);
      commit("setMeals", res.meals);
      commit("setError", res.error);
    } catch (err) {
      commit("setError", err);
    } finally {
      commit("setLoading", false);
    }
  },

  async [GET_FILTERING_MEAL_ACTION]({ commit, rootGetters }, filters) {
    commit("setLoading", true);

    try {
      const itemsInCart = rootGetters[`cart/${MEALS_IN_CART}`];
      const res = await foodApi.food.get.foodByFilters(filters);
      res.meals = getMealsWithQuantityField(res.meals, itemsInCart);
      commit("setMeals", res.meals);
      commit("setError", res.error);
    } catch (err) {
      commit("setError", err);
    } finally {
      commit("setLoading", false);
    }
  },

  async [GET_FOOD_ACTION]({ commit, rootGetters }, id) {
    commit("setLoading", true);
    try {
      const itemsInCart = rootGetters[`cart/${MEALS_IN_CART}`];
      const res = await foodApi.food.get.foodById(id);
      const meal = res.data.meals[0];
      const foundItem = itemsInCart.find((item) => item.id == meal.idMeal);
      foundItem ? (meal.quantity = foundItem.quantity) : (meal.quantity = 0);

      commit("setFood", meal);
      commit("setError", res.error);
    } catch (err) {
      commit("setError", err);
    } finally {
      commit("setLoading", false);
    }
  },
  [UPDATE_QUANTITY_OF_MEAL_ACTION]({ commit }, { id, value }) {
    commit("setQuantityOfMeal", { id, value });
  },
  [UPDATE_QUANTITY_OF_FOOD_ACTION]({ commit }, value) {
    commit("setQuantityOfFood", value);
  },
};

// mutations
const mutations = {
  setMeals(state, meals) {
    state.meals = meals;
  },
  setError(state, error) {
    state.error = error?.message;
  },
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
  setFood(state, foodData) {
    state.foodData = foodData;
  },
  setQuantityOfMeal(state, { id, value }) {
    let food = state.meals.find((meal) => meal.idMeal == id);
    food.quantity = value;
  },
  setQuantityOfFood(state, value) {
    state.foodData.quantity = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
