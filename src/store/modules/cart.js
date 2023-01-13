//import { foodApi } from "@/api/index";
import {
  MEALS_IN_CART,
  CART_TOTAL_PRICE,
  ADD_MEAL_TO_CART,
  INCREMENT_MEAL_QUANTITY,
  ADD_TO_CART_ACTION,
  SET_CHECKOUT_STATUS,
} from "@/store/storeConstants";

// initial state
// shape: [{ id, quantity, title, price }]
const state = {
  items: [],
  checkoutStatus: null,
};

// getters
const getters = {
  [MEALS_IN_CART]: (state) => {
    return state.items;
  },

  [CART_TOTAL_PRICE]: (state, getters) => {
    return getters.MEALS_IN_CART.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  },
};

// actions
const actions = {
  [ADD_TO_CART_ACTION]({ state, commit }, meal) {
    commit(SET_CHECKOUT_STATUS, null);

    const itemInCart = state.items.find((item) => item.id === meal.id);
    if (!itemInCart) {
      commit(ADD_MEAL_TO_CART, meal);
    } else {
      commit(INCREMENT_MEAL_QUANTITY, itemInCart.id);
    }
  },
};

// mutations
const mutations = {
  [SET_CHECKOUT_STATUS](state, status) {
    state.checkoutStatus = status;
  },
  [ADD_MEAL_TO_CART](state, meal) {
    state.items.push({
      id: meal.id,
      title: meal.strMeal,
      price: meal.price,
      quantity: 1,
    });
  },

  [INCREMENT_MEAL_QUANTITY](state, id) {
    const cartItem = state.items.find((item) => item.id === id);
    cartItem.quantity++;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
