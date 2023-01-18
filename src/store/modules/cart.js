import { roundNumber } from "@/helpers/mathHelpers";
import { foodApi } from "@/api/index";
import {
  MEALS_IN_CART,
  CART_TOTAL_PRICE,
  ADD_MEAL_TO_CART,
  CHANGE_MEAL_QUANTITY,
  ADD_TO_CART_ACTION,
  SET_CHECKOUT_STATUS,
  CART_COUNT,
  DELETE_MEAL_FROM_CART,
  DELETE_FROM_CART_ACTION,
  BUY_ACTION,
  SET_CART_ITEMS,
  LOADING,
  CHECKOUT_STATUS,
  SET_LOADING,
  CLEAR_CHECKOUT_ACTION,
} from "@/store/storeConstants";

// initial state
// shape: [{ id, quantity, title, price }]
const mealItems =
  localStorage.getItem("mealItems") != null
    ? JSON.parse(localStorage.getItem("mealItems"))
    : [];

const state = {
  items: mealItems,
  checkoutStatus: null,
  loading: false,
};

// getters
const getters = {
  [MEALS_IN_CART]: (state) => {
    return state.items;
  },

  [CART_TOTAL_PRICE]: (state, getters) => {
    return getters[[MEALS_IN_CART]].reduce((total, product) => {
      return roundNumber(total + product.price * product.quantity, 2);
    }, 0);
  },
  [CART_COUNT]: (state, getters) => {
    return getters[[MEALS_IN_CART]].reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  },
  [LOADING]: (state) => {
    return state.loading;
  },
  [CHECKOUT_STATUS]: (state) => state.checkoutStatus,
};

// actions
const actions = {
  [ADD_TO_CART_ACTION]({ commit, getters }, meal) {
    const itemInCart = getters[[MEALS_IN_CART]].find(
      (item) => item.id === meal.idMeal
    );
    if (!itemInCart) {
      if (meal.quantity > 0) commit(ADD_MEAL_TO_CART, meal);
    } else {
      if (meal.quantity > 0)
        commit(CHANGE_MEAL_QUANTITY, { itemInCart, quantity: meal.quantity });
      else {
        commit(DELETE_MEAL_FROM_CART, itemInCart);
      }
    }

    localStorage.setItem("mealItems", JSON.stringify(getters[[MEALS_IN_CART]]));
  },
  [DELETE_FROM_CART_ACTION]({ commit }, item) {
    commit(SET_CHECKOUT_STATUS, null);
    commit(DELETE_MEAL_FROM_CART, item);
  },
  async [BUY_ACTION]({ commit, state }) {
    commit(SET_LOADING, true);
    commit(SET_CHECKOUT_STATUS, null);

    try {
      const res = await foodApi.shop.post.buy(state.items);
      if (res.isDone) {
        commit(SET_CHECKOUT_STATUS, "Congratulations! Your purchase was done");
        commit(SET_CART_ITEMS, []);
      } else {
        console.log("error");
        commit(SET_CHECKOUT_STATUS, "There was an error: " + res.error);
      }
    } catch (err) {
      commit(SET_CHECKOUT_STATUS, "There was an error: " + err.message);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  [CLEAR_CHECKOUT_ACTION]({ commit }) {
    commit(SET_CHECKOUT_STATUS, null);
  },
};

// mutations
const mutations = {
  [SET_CHECKOUT_STATUS](state, status) {
    state.checkoutStatus = status;
  },
  [ADD_MEAL_TO_CART](state, meal) {
    state.items.push({
      id: meal.idMeal,
      title: meal.strMeal,
      price: meal.price,
      quantity: meal.quantity,
    });
  },

  [CHANGE_MEAL_QUANTITY](state, { itemInCart, quantity }) {
    itemInCart.quantity = quantity;
  },
  [DELETE_MEAL_FROM_CART](state, itemCart) {
    state.items = state.items.filter((item) => item.id != itemCart.id);
  },
  [SET_CART_ITEMS](state, items) {
    state.items = items;
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
