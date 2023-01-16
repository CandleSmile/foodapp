import { roundNumber } from "@/helpers/mathHelpers";
import {
  MEALS_IN_CART,
  CART_TOTAL_PRICE,
  ADD_MEAL_TO_CART,
  CHANGE_MEAL_QUANTITY,
  ADD_TO_CART_ACTION,
  SET_CHECKOUT_STATUS,
  CART_COUNT,
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
};

// actions
const actions = {
  [ADD_TO_CART_ACTION]({ commit, getters }, meal) {
    commit(SET_CHECKOUT_STATUS, null);

    const itemInCart = getters[[MEALS_IN_CART]].find(
      (item) => item.id === meal.idMeal
    );
    if (!itemInCart) {
      commit(ADD_MEAL_TO_CART, meal);
    } else {
      commit(CHANGE_MEAL_QUANTITY, { itemInCart, quantity: meal.quantity });
    }

    localStorage.setItem("mealItems", JSON.stringify(getters[[MEALS_IN_CART]]));
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
